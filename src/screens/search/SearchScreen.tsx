
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, MOCK_RESTAURANTS } from '../../constants';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filtered = query.length > 0
    ? MOCK_RESTAURANTS.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Restaurants, cuisines, dishes..."
            placeholderTextColor={COLORS.textLight}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {query.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Find your favourites</Text>
          <Text style={styles.emptySubtitle}>Search for restaurants, cuisine type, or dishes</Text>
          <View style={styles.trendingSection}>
            <Text style={styles.trendingLabel}>Trending</Text>
            {['Biryani', 'Pizza', 'Burger', 'Sushi'].map(tag => (
              <TouchableOpacity key={tag} style={styles.trendingTag} onPress={() => setQuery(tag)}>
                <Ionicons name="trending-up" size={14} color={COLORS.primary} />
                <Text style={styles.trendingTagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>😕</Text>
          <Text style={styles.emptyTitle}>No results for "{query}"</Text>
          <Text style={styles.emptySubtitle}>Try a different restaurant or dish name</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.results}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultCard}>
              <View style={[styles.resultEmoji, { backgroundColor: item.coverColor }]}>
                <Text style={styles.resultEmojiText}>{item.image}</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultCuisine}>{item.cuisine}</Text>
                <Text style={styles.resultMeta}>⭐ {item.rating} · {item.deliveryTime}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 28,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background, gap: SPACING.md,
  },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  input: { flex: 1, fontSize: 15, color: COLORS.text },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.lg, gap: 8 },
  emptyEmoji: { fontSize: 64, marginBottom: SPACING.sm },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  emptySubtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
  trendingSection: { marginTop: SPACING.lg, width: '100%', gap: SPACING.sm },
  trendingLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  trendingTag: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.surface, borderRadius: 12, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  trendingTagText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  results: { padding: SPACING.lg, gap: SPACING.sm },
  resultCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  resultEmoji: {
    width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  resultEmojiText: { fontSize: 26 },
  resultInfo: { flex: 1 },
  resultName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  resultCuisine: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  resultMeta: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
});