
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Platform, Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList, CartItem } from '../../types';
import { COLORS, SPACING } from '../../constants';
import { useCart } from '../../context/CartContext';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Cart'>;
};

export default function CartScreen({ navigation }: Props) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const deliveryFee = 29;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + tax;

  const handlePlaceOrder = () => {
    Alert.alert(
      '🎉 Order Placed!',
      `Your order of ₹${grandTotal} has been placed successfully. Estimated delivery: 30-40 min.`,
      [
        {
          text: 'Track Order',
          onPress: () => {
            clearCart();
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
          },
        },
      ]
    );
  };

  if (items.length === 0 && !placed) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add items from restaurants to get started</Text>
        <TouchableOpacity style={styles.exploreBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.exploreBtnText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemEmoji}>
        <Text style={styles.itemEmojiText}>{item.image}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemRestaurant}>{item.restaurantName}</Text>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>
      <View style={styles.qtyControl}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.qtyBtnText}>{item.quantity === 1 ? '🗑' : '−'}</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity
          style={[styles.qtyBtn, styles.qtyBtnPlus]}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={[styles.qtyBtnText, { color: COLORS.white }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            {[
              { label: `Subtotal (${totalItems} items)`, value: `₹${totalPrice}` },
              { label: 'Delivery Fee', value: `₹${deliveryFee}` },
              { label: 'Taxes & Fees', value: `₹${tax}` },
            ].map((row, i) => (
              <View key={i} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{row.label}</Text>
                <Text style={styles.summaryValue}>{row.value}</Text>
              </View>
            ))}
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{grandTotal}</Text>
            </View>

            {/* Address */}
            <View style={styles.addressCard}>
              <Ionicons name="location" size={18} color={COLORS.primary} />
              <View style={styles.addressInfo}>
                <Text style={styles.addressTitle}>Delivering to</Text>
                <Text style={styles.addressText}>Assi Ghat, Varanasi, UP 221005</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Coupon */}
            <TouchableOpacity style={styles.couponCard}>
              <Ionicons name="pricetag-outline" size={18} color={COLORS.primary} />
              <Text style={styles.couponText}>Apply Coupon</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Checkout button */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutInfo}>
          <Text style={styles.checkoutTotal}>₹{grandTotal}</Text>
          <Text style={styles.checkoutSub}>Total payable</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handlePlaceOrder} activeOpacity={0.85}>
          <Text style={styles.checkoutBtnText}>Place Order</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: SPACING.lg },
  emptyEmoji: { fontSize: 72 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  emptySubtitle: { fontSize: 15, color: COLORS.textMuted, textAlign: 'center' },
  exploreBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14, marginTop: SPACING.md,
  },
  exploreBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 56 : 28,
    paddingBottom: SPACING.md, paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  backBtn: { marginRight: SPACING.md },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '800', color: COLORS.text },
  clearText: { color: COLORS.error, fontSize: 14, fontWeight: '600' },
  list: { paddingBottom: 120 },
  cartItem: {
    flexDirection: 'row', alignItems: 'center', padding: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.surface,
  },
  itemEmoji: {
    width: 56, height: 56, borderRadius: 12, backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md,
  },
  itemEmojiText: { fontSize: 26 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  itemRestaurant: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: COLORS.primary, marginTop: 4 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnPlus: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  qtyBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  qtyText: { fontSize: 15, fontWeight: '700', color: COLORS.text, minWidth: 20, textAlign: 'center' },
  summary: { padding: SPACING.lg, gap: SPACING.sm },
  summaryTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  summaryLabel: { fontSize: 14, color: COLORS.textMuted },
  summaryValue: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  summaryDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.sm },
  totalLabel: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  totalValue: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
  addressCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1.5, borderColor: COLORS.border, marginTop: SPACING.sm,
  },
  addressInfo: { flex: 1 },
  addressTitle: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  addressText: { fontSize: 14, color: COLORS.text, fontWeight: '600', marginTop: 2 },
  changeText: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  couponCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: COLORS.primary, marginTop: SPACING.sm,
  },
  couponText: { flex: 1, fontSize: 14, color: COLORS.primary, fontWeight: '600' },
  checkoutBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.surface, padding: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : SPACING.md,
    borderTopWidth: 1, borderTopColor: COLORS.border,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  checkoutInfo: { gap: 2 },
  checkoutTotal: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  checkoutSub: { fontSize: 12, color: COLORS.textMuted },
  checkoutBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14,
    paddingHorizontal: 24, paddingVertical: 14,
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
  },
  checkoutBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});