
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { COLORS, SPACING } from '../../constants';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

const { width, height } = Dimensions.get('window');

const DISHES = ['🍕', '🍔', '🌮', '🍱', '🍛', '🍜', '🥗', '🍣'];

export default function OnboardingScreen({ navigation }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleGetStarted = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Login');
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      {/* Floating food grid */}
      <View style={styles.emojiGrid}>
        {DISHES.map((emoji, i) => (
          <View key={i} style={[styles.emojiCard, { opacity: 0.15 + (i % 3) * 0.1 }]}>
            <Text style={styles.emojiText}>{emoji}</Text>
          </View>
        ))}
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>
        </View>

        <Text style={styles.headline}>
          Food at your{'\n'}
          <Text style={styles.headlineAccent}>doorstep</Text>
        </Text>

        <Text style={styles.subtitle}>
          Order from the best restaurants in your city. Fast delivery, real flavours.
        </Text>

        <View style={styles.featureRow}>
          {[
            { icon: '⚡', label: 'Fast Delivery' },
            { icon: '🌟', label: 'Top Rated' },
            { icon: '💳', label: 'Easy Pay' },
          ].map((f, i) => (
            <View key={i} style={styles.featurePill}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={styles.bottomSection}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted} activeOpacity={0.85}>
            <Text style={styles.ctaText}>Get Started</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: COLORS.primary,
    opacity: 0.15,
    top: -width * 0.3,
    right: -width * 0.2,
  },
  blob2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: COLORS.accent,
    opacity: 0.08,
    bottom: -width * 0.1,
    left: -width * 0.1,
  },
  emojiGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    padding: 20,
    gap: 20,
  },
  emojiCard: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  emojiText: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 36,
  },
  headline: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 56,
    letterSpacing: -1,
    marginBottom: SPACING.md,
  },
  headlineAccent: {
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  featureRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  featureIcon: {
    fontSize: 14,
  },
  featureLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 44 : SPACING.xl,
    paddingTop: SPACING.md,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ctaArrow: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  termsText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: SPACING.md,
  },
  termsLink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});