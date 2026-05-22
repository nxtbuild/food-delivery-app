
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants';
import { DrawerParamList } from '../../types';

type DrawerProps = { navigation: DrawerNavigationProp<DrawerParamList> };

function DrawerHeader({ title, navigation }: { title: string; navigation: DrawerProps['navigation'] }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export function MyOrdersDrawerScreen({ navigation }: DrawerProps) {
  return (
    <View style={styles.container}>
      <DrawerHeader title="My Orders" navigation={navigation} />
      <View style={styles.placeholder}>
        <Text style={styles.placeholderEmoji}>📦</Text>
        <Text style={styles.placeholderTitle}>All Your Orders</Text>
        <Text style={styles.placeholderText}>Full order history accessible from the drawer</Text>
      </View>
    </View>
  );
}

export function SettingsDrawerScreen({ navigation }: DrawerProps) {
  const SETTINGS = [
    { icon: 'notifications-outline', label: 'Push Notifications', value: true },
    { icon: 'location-outline', label: 'Location Access', value: true },
    { icon: 'moon-outline', label: 'Dark Mode', value: false },
    { icon: 'language-outline', label: 'Language', extra: 'English' },
    { icon: 'logo-usd', label: 'Currency', extra: '₹ INR' },
  ];

  return (
    <View style={styles.container}>
      <DrawerHeader title="Settings" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.settingsList}>
        {SETTINGS.map((s, i) => (
          <View key={i} style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons name={s.icon as any} size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.settingLabel}>{s.label}</Text>
            {s.extra
              ? <Text style={styles.settingExtra}>{s.extra}</Text>
              : <View style={[styles.toggle, s.value && styles.toggleOn]}>
                  <View style={[styles.toggleThumb, s.value && styles.toggleThumbOn]} />
                </View>
            }
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function HelpDrawerScreen({ navigation }: DrawerProps) {
  const FAQS = [
    { q: 'How do I track my order?', a: 'Go to Orders tab and tap Track Order on your active order.' },
    { q: 'Can I cancel my order?', a: 'You can cancel within 2 minutes of placing the order.' },
    { q: 'What payment methods are accepted?', a: 'We accept UPI, credit/debit cards, net banking and cash on delivery.' },
    { q: 'How do I apply a coupon?', a: 'In the cart, tap "Apply Coupon" and enter your code.' },
  ];

  return (
    <View style={styles.container}>
      <DrawerHeader title="Help & Support" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.helpContent}>
        <TouchableOpacity style={styles.contactCard}>
          <Ionicons name="chatbubble-outline" size={24} color={COLORS.primary} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Chat with us</Text>
            <Text style={styles.contactSub}>Average reply time: 2 min</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactCard}>
          <Ionicons name="call-outline" size={24} color={COLORS.success} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Call Support</Text>
            <Text style={styles.contactSub}>1800-XXX-XXXX (Free)</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
        <Text style={styles.faqTitle}>FAQs</Text>
        {FAQS.map((faq, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQ}>{faq.q}</Text>
            <Text style={styles.faqA}>{faq.a}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? 56 : 28, paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  placeholderEmoji: { fontSize: 64 },
  placeholderTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  placeholderText: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', paddingHorizontal: SPACING.xl },
  settingsList: { padding: SPACING.lg, gap: SPACING.sm },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  settingIcon: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.text },
  settingExtra: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  toggle: {
    width: 44, height: 24, borderRadius: 12, backgroundColor: COLORS.border, justifyContent: 'center', padding: 2,
  },
  toggleOn: { backgroundColor: COLORS.primary },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.white },
  toggleThumbOn: { alignSelf: 'flex-end' },
  helpContent: { padding: SPACING.lg, gap: SPACING.md },
  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  contactSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  faqTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm },
  faqItem: {
    backgroundColor: COLORS.surface, borderRadius: 14, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border, gap: 6,
  },
  faqQ: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  faqA: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },
});