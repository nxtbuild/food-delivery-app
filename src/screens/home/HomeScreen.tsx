
import React, { useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  ScrollView, Animated, StatusBar, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../../types';
import { COLORS, SPACING, MOCK_RESTAURANTS } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
};

const CATEGORIES = ['All', '🍕 Pizza', '🍔 Burgers', '🍛 Indian', '🍱 Japanese', '🌮 Mexican'];

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderRestaurant = ({ item }: { item: typeof MOCK_RESTAURANTS[0] }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      activeOpacity={0.88}
      onPress={() =>
        navigation.navigate('RestaurantDetail', {
          restaurantId: item.id,
          restaurantName: item.name,
          coverColor: item.coverColor,
        })
      }
    >
      {/* Cover */}
      <View style={[styles.cardCover, { backgroundColor: item.coverColor }]}>
        <Text style={styles.cardEmoji}>{item.image}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
        </View>
        <Text style={styles.cuisine}>{item.cuisine}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.deliveryFee}>🛵 {item.deliveryFee} delivery</Text>
          <Text style={styles.minPrice}>Min ₹{item.minPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Sticky header shadow overlay */}
      <Animated.View style={[styles.headerShadow, { opacity: headerOpacity }]} />

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero header */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={16} color={COLORS.primary} />
                <Text style={styles.locationText}>Varanasi, UP</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.textMuted} />
              </View>
              <Text style={styles.greeting}>
                Hello, {user?.name?.split(' ')[0] ?? 'there'} 👋
              </Text>
            </View>
            <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="bag-outline" size={22} color={COLORS.text} />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.heroTitle}>
            What would you{'\n'}like to <Text style={styles.heroAccent}>eat today?</Text>
          </Text>

          <TouchableOpacity style={styles.searchBar} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search-outline" size={18} color={COLORS.textMuted} />
            <Text style={styles.searchPlaceholder}>Search restaurants, dishes...</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {CATEGORIES.map((cat, i) => (
              <TouchableOpacity key={i} style={[styles.categoryChip, i === 0 && styles.categoryChipActive]}>
                <Text style={[styles.categoryChipText, i === 0 && styles.categoryChipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
            {MOCK_RESTAURANTS.slice(0, 3).map(r => (
              <TouchableOpacity
                key={r.id}
                style={styles.featuredCard}
                onPress={() => navigation.navigate('RestaurantDetail', {
                  restaurantId: r.id,
                  restaurantName: r.name,
                  coverColor: r.coverColor,
                })}
              >
                <View style={[styles.featuredCover, { backgroundColor: r.coverColor }]}>
                  <Text style={styles.featuredEmoji}>{r.image}</Text>
                </View>
                <Text style={styles.featuredName} numberOfLines={1}>{r.name}</Text>
                <Text style={styles.featuredTime}>{r.deliveryTime}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Restaurants</Text>
          {MOCK_RESTAURANTS.map(item => (
            <View key={item.id}>{renderRestaurant({ item })}</View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerShadow: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
    backgroundColor: COLORS.border, zIndex: 10,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  hero: {
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'ios' ? 56 : 24,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.md },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  locationText: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  greeting: { fontSize: 13, color: COLORS.textMuted },
  cartBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surface,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cartBadge: {
    position: 'absolute', top: -2, right: -2, width: 18, height: 18,
    borderRadius: 9, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: COLORS.background,
  },
  cartBadgeText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  heroTitle: { fontSize: 28, fontWeight: '800', color: COLORS.text, lineHeight: 36, letterSpacing: -0.5, marginBottom: SPACING.md },
  heroAccent: { color: COLORS.primary },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  searchPlaceholder: { fontSize: 15, color: COLORS.textLight, flex: 1 },
  section: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg },

  restaurantSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg ,flexDirection: 'row',
  justifyContent: 'space-between',},

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.md },
  seeAll: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  categoryRow: { gap: SPACING.sm, paddingRight: SPACING.lg },
  categoryChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border,
  },
  categoryChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryChipText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  categoryChipTextActive: { color: COLORS.white },
  featuredRow: { gap: SPACING.md, paddingRight: SPACING.lg },
  featuredCard: { width: 120 },
  featuredCover: {
    width: 120, height: 90, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm,
  },
  featuredEmoji: { fontSize: 40 },
  featuredName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  featuredTime: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  restaurantCard: {
    backgroundColor: COLORS.surface, borderRadius: 16, marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardCover: {
    height: 150, alignItems: 'center', justifyContent: 'center',
  },
  cardEmoji: { fontSize: 150 },
  ratingBadge: {
    position: 'absolute', top: SPACING.sm, right: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4,
  },
  ratingText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  cardBody: { padding: SPACING.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  restaurantName: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  deliveryTime: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  cuisine: { fontSize: 13, color: COLORS.textMuted, marginBottom: SPACING.sm },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  deliveryFee: { fontSize: 12, color: COLORS.textMuted },
  minPrice: { fontSize: 12, color: COLORS.textMuted },
});