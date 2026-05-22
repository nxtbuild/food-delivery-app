// src/screens/profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList } from '../../types';
import { COLORS, SPACING } from '../../constants';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Edit Profile', subtitle: 'Update your info', color: '#6366f1' },
  { icon: 'location-outline', label: 'Saved Addresses', subtitle: 'Home, work and more', color: '#0ea5e9' },
  { icon: 'card-outline', label: 'Payment Methods', subtitle: 'Cards, wallets', color: '#10b981' },
  { icon: 'notifications-outline', label: 'Notifications', subtitle: 'Order alerts, promotions', color: '#f59e0b' },
  { icon: 'shield-outline', label: 'Privacy & Security', subtitle: 'Password, permissions', color: '#8b5cf6' },
  { icon: 'help-circle-outline', label: 'Help & Support', subtitle: 'FAQs, contact us', color: '#ef4444' },
];

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

     
      <View style={styles.avatarCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.slice(0, 2).toUpperCase() ?? 'U'}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="pencil-outline" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Orders', value: '12' },
          { label: 'Reviews', value: '5' },
          { label: 'Points', value: '340' },
        ].map((stat, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Drawer quick links */}
      <TouchableOpacity style={styles.drawerBtn} onPress={() => navigation.openDrawer()}>
        <Ionicons name="grid-outline" size={20} color={COLORS.primary} />
        <Text style={styles.drawerBtnText}>Open Side Menu</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.85}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>FoodApp v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 100 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 56 : 28, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  menuBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  avatarCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    padding: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: COLORS.white, fontSize: 22, fontWeight: '800' },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  userEmail: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  editBtn: {
    width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  statCard: {
    flex: 1, backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    alignItems: 'center', borderWidth: 1, borderColor: COLORS.border,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600', marginTop: 2 },
  menuSection: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  menuIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  menuSubtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 1 },
  drawerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    margin: SPACING.lg, padding: SPACING.md, borderRadius: 14,
    borderWidth: 1.5, borderColor: COLORS.primary + '40', backgroundColor: COLORS.primary + '08',
  },
  drawerBtnText: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.primary },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    marginHorizontal: SPACING.lg, padding: SPACING.md, borderRadius: 14,
    borderWidth: 1.5, borderColor: COLORS.error + '40', backgroundColor: COLORS.error + '08',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: COLORS.error },
  version: { textAlign: 'center', color: COLORS.textLight, fontSize: 12, marginTop: SPACING.md },
});