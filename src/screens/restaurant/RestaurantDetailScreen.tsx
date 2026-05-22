
import React, { useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Platform, StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList, MenuItem } from '../../types';
import { COLORS, SPACING, MOCK_RESTAURANTS } from '../../constants';
import { useCart } from '../../context/CartContext';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'RestaurantDetail'>;
  route: RouteProp<HomeStackParamList, 'RestaurantDetail'>;
};

const COVER_HEIGHT = 220;

export default function RestaurantDetailScreen({ navigation, route }: Props) {
  const { restaurantId, restaurantName, coverColor } = route.params;
  const { addItem, items, totalItems, totalPrice } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;

  const restaurant = MOCK_RESTAURANTS.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Restaurant not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnAlt}>
          <Text style={styles.backBtnAltText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

 
  const categories = [...new Set(restaurant.menuItems.map(m => m.category))];
  const sections = categories.map(cat => ({
    title: cat,
    data: restaurant.menuItems.filter(m => m.category === cat),
  }));

  const coverTranslate = scrollY.interpolate({
    inputRange: [0, COVER_HEIGHT],
    outputRange: [0, -COVER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [COVER_HEIGHT - 60, COVER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const getItemQty = (itemId: string) =>
    items.find(i => i.id === itemId)?.quantity ?? 0;

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const qty = getItemQty(item.id);
    return (
      <View style={styles.menuItem}>
        <View style={styles.menuEmoji}>
          <Text style={styles.menuEmojiText}>{item.image}</Text>
        </View>
        <View style={styles.menuInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>₹{item.price}</Text>
        </View>
        <View style={styles.qtyControl}>
          {qty > 0 ? (
            <>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => {
                  const cartItem = items.find(i => i.id === item.id);
                  if (cartItem) {
                    const { updateQuantity } = useCart();
                  }
                }}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
            </>
          ) : null}
          <TouchableOpacity
            style={[styles.qtyBtn, styles.qtyBtnPrimary]}
            onPress={() => addItem(item, restaurant.id, restaurant.name)}
          >
            <Text style={[styles.qtyBtnText, { color: COLORS.white }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.stickyTitle} numberOfLines={1}>{restaurantName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.headerCartBtn}>
          <Ionicons name="bag-outline" size={20} color={COLORS.text} />
          {totalItems > 0 && (
            <View style={styles.smallBadge}>
              <Text style={styles.smallBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.floatingBack}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.floatingBackBtn}>
          <Ionicons name="arrow-back" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.floatingBackBtn}>
          <Ionicons name="bag-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <Animated.SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderMenuItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* Cover image */}
            <Animated.View
              style={[styles.cover, { backgroundColor: coverColor }, { transform: [{ translateY: coverTranslate }] }]}
            >
              <Text style={styles.coverEmoji}>{restaurant.image}</Text>
            </Animated.View>

            {/* Restaurant info */}
            <View style={styles.infoCard}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaChip}>
                  <Text style={styles.metaChipText}>⭐ {restaurant.rating}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Text style={styles.metaChipText}>🕐 {restaurant.deliveryTime}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Text style={styles.metaChipText}>🛵 {restaurant.deliveryFee}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <Text style={styles.menuLabel}>Menu</Text>
            </View>
          </>
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />

      {/* Cart bar */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <View style={styles.cartBarLeft}>
            <View style={styles.cartBarBadge}>
              <Text style={styles.cartBarBadgeText}>{totalItems}</Text>
            </View>
            <Text style={styles.cartBarItems}>{totalItems} item{totalItems > 1 ? 's' : ''}</Text>
          </View>
          <TouchableOpacity
            style={styles.cartBarBtn}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.85}
          >
            <Text style={styles.cartBarBtnText}>View Cart · ₹{totalPrice}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { fontSize: 17, color: COLORS.textMuted },
  backBtnAlt: { backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 },
  backBtnAltText: { color: COLORS.white, fontWeight: '700' },
  stickyHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
    paddingTop: Platform.OS === 'ios' ? 52 : 24,
    paddingBottom: 12,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  headerBackBtn: { padding: 4, marginRight: SPACING.sm },
  stickyTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: COLORS.text },
  headerCartBtn: { padding: 4, position: 'relative' },
  smallBadge: {
    position: 'absolute', top: 0, right: 0, width: 14, height: 14,
    borderRadius: 7, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  smallBadgeText: { color: COLORS.white, fontSize: 9, fontWeight: '700' },
  floatingBack: {
    position: 'absolute', top: Platform.OS === 'ios' ? 56 : 28, left: SPACING.md, right: SPACING.md,
    zIndex: 10, flexDirection: 'row', justifyContent: 'space-between',
  },
  floatingBackBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  cover: {
    height: COVER_HEIGHT, alignItems: 'center', justifyContent: 'center',
  },
  coverEmoji: { fontSize: 80 },
  infoCard: {
    backgroundColor: COLORS.background, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg,
  },
  restaurantName: { fontSize: 24, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5, marginBottom: 4 },
  cuisine: { fontSize: 14, color: COLORS.textMuted, marginBottom: SPACING.md },
  metaRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md },
  metaChip: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6,
  },
  metaChipText: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: SPACING.md },
  menuLabel: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.sm },
  sectionHeader: {
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surfaceAlt,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  menuEmoji: {
    width: 60, height: 60, borderRadius: 12, backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md,
  },
  menuEmojiText: { fontSize: 28 },
  menuInfo: { flex: 1 },
  menuItemName: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  menuItemDesc: { fontSize: 12, color: COLORS.textMuted, lineHeight: 17, marginBottom: 4 },
  menuItemPrice: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: SPACING.sm },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnPrimary: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  qtyBtnText: { fontSize: 18, fontWeight: '700', color: COLORS.text, lineHeight: 22 },
  qtyText: { fontSize: 14, fontWeight: '700', color: COLORS.text, minWidth: 16, textAlign: 'center' },
  listContent: { paddingBottom: 120 },
  cartBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.text, padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 32 : SPACING.md,
  },
  cartBarLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  cartBarBadge: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  cartBarBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  cartBarItems: { color: COLORS.white, fontSize: 14, fontWeight: '600' },
  cartBarBtn: {
    backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10,
  },
  cartBarBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
});