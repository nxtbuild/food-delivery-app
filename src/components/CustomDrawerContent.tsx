// src/components/CustomDrawerContent.tsx
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants';
import { useAuth } from '../context/AuthContext';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* User header */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.slice(0, 2).toUpperCase() ?? 'U'}</Text>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <View style={styles.memberBadge}>
          <Text style={styles.memberBadgeText}>⭐ Gold Member</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Drawer items */}
      <View style={styles.itemsSection}>
        <DrawerItemList {...props} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom items */}
      <View style={styles.bottomSection}>
        {[
          { icon: 'share-outline', label: 'Share App' },
          { icon: 'star-outline', label: 'Rate Us' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.bottomItem}>
            <Ionicons name={item.icon as any} size={20} color={COLORS.textMuted} />
            <Text style={styles.bottomItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutItem} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>FoodApp v1.0.0</Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  userSection: {
    padding: SPACING.lg,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: COLORS.primary,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: SPACING.sm,
  },
  avatarText: { color: COLORS.white, fontSize: 22, fontWeight: '800' },
  userName: { fontSize: 18, fontWeight: '800', color: COLORS.white, letterSpacing: -0.3 },
  userEmail: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2, marginBottom: SPACING.sm },
  memberBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  memberBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.border },
  itemsSection: { paddingVertical: SPACING.sm },
  bottomSection: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.sm },
  bottomItem: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.md, paddingVertical: 12, borderRadius: 10,
  },
  bottomItemText: { fontSize: 15, fontWeight: '500', color: COLORS.textMuted },
  logoutItem: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.md, paddingVertical: 12, borderRadius: 10,
    marginTop: 4, backgroundColor: COLORS.error + '10',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: COLORS.error },
  version: {
    textAlign: 'center', color: COLORS.textLight, fontSize: 11,
    paddingVertical: SPACING.md,
  },
});