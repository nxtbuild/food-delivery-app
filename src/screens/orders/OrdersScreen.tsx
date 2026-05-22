
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants';

const PAST_ORDERS = [
  {
    id: 'ord_1',
    restaurant: 'Spice Garden',
    emoji: '🍛',
    items: ['Chicken Biryani', 'Garlic Naan'],
    total: 348,
    status: 'Delivered',
    date: '2 days ago',
    coverColor: '#FF6B35',
  },
  {
    id: 'ord_2',
    restaurant: 'Burger Republic',
    emoji: '🍔',
    items: ['Classic Smash Burger', 'Oreo Shake'],
    total: 528,
    status: 'Delivered',
    date: '1 week ago',
    coverColor: '#E63946',
  },
  {
    id: 'ord_3',
    restaurant: 'Pizza Paradiso',
    emoji: '🍕',
    items: ['Margherita', 'Pasta Arrabbiata'],
    total: 698,
    status: 'Delivered',
    date: '2 weeks ago',
    coverColor: '#2D6A4F',
  },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
      </View>

      <FlatList
        data={PAST_ORDERS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.activeOrderCard}>
            <View style={styles.activeOrderHeader}>
              <View style={styles.liveDot} />
              <Text style={styles.activeOrderTitle}>Active Order</Text>
            </View>
            <View style={styles.activeOrderBody}>
              <Text style={styles.activeOrderEmoji}>🛵</Text>
              <View>
                <Text style={styles.activeOrderStatus}>On the way</Text>
                <Text style={styles.activeOrderETA}>Estimated: 12 min</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <View style={styles.progressLabels}>
              {['Confirmed', 'Preparing', 'On the way', 'Delivered'].map((step, i) => (
                <Text key={i} style={[styles.progressLabel, i <= 2 && styles.progressLabelActive]}>{step}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles.trackBtn}>
              <Text style={styles.trackBtnText}>Track Order</Text>
              <Ionicons name="map-outline" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={[styles.orderCover, { backgroundColor: item.coverColor }]}>
              <Text style={styles.orderEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.orderInfo}>
              <View style={styles.orderInfoTop}>
                <Text style={styles.orderRestaurant}>{item.restaurant}</Text>
                <Text style={styles.orderStatus}>✓ {item.status}</Text>
              </View>
              <Text style={styles.orderItems}>{item.items.join(', ')}</Text>
              <View style={styles.orderBottom}>
                <Text style={styles.orderTotal}>₹{item.total}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <Text style={styles.footer}>That's all your orders</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 28, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.background,
  },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  list: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: 100 },
  activeOrderCard: {
    backgroundColor: COLORS.surface, borderRadius: 16, padding: SPACING.md,
    borderWidth: 1.5, borderColor: COLORS.primary + '40', marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  activeOrderHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  activeOrderTitle: { fontSize: 13, fontWeight: '700', color: COLORS.success, textTransform: 'uppercase', letterSpacing: 0.5 },
  activeOrderBody: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  activeOrderEmoji: { fontSize: 36 },
  activeOrderStatus: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  activeOrderETA: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  progressBar: { height: 6, backgroundColor: COLORS.surfaceAlt, borderRadius: 3 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 10, color: COLORS.textLight, fontWeight: '600' },
  progressLabelActive: { color: COLORS.primary },
  trackBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: 12, padding: 10,
  },
  trackBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
  orderCard: {
    flexDirection: 'row', gap: SPACING.md,
    backgroundColor: COLORS.surface, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  orderCover: { width: 80, alignItems: 'center', justifyContent: 'center' },
  orderEmoji: { fontSize: 32 },
  orderInfo: { flex: 1, padding: SPACING.md, gap: 4 },
  orderInfoTop: { flexDirection: 'row', justifyContent: 'space-between' },
  orderRestaurant: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  orderStatus: { fontSize: 12, color: COLORS.success, fontWeight: '600' },
  orderItems: { fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  orderTotal: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  orderDate: { fontSize: 12, color: COLORS.textMuted },
  footer: { textAlign: 'center', color: COLORS.textLight, fontSize: 13, paddingVertical: SPACING.md },
});