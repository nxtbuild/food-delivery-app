
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { COLORS, SPACING } from '../../constants';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) return;
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join millions of food lovers</Text>
        </View>

        <View style={styles.form}>
          {[
            { label: 'Full Name', value: name, setter: setName, placeholder: 'Arjun Sharma', keyboard: 'default' as const },
            { label: 'Email', value: email, setter: setEmail, placeholder: 'you@example.com', keyboard: 'email-address' as const },
            { label: 'Password', value: password, setter: setPassword, placeholder: 'Min. 8 characters', keyboard: 'default' as const, secure: true },
          ].map((field, i) => (
            <View key={i} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor={COLORS.textLight}
                value={field.value}
                onChangeText={field.setter}
                keyboardType={field.keyboard}
                secureTextEntry={field.secure}
                autoCapitalize={field.keyboard === 'email-address' ? 'none' : 'words'}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[styles.registerBtn, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color={COLORS.white} />
              : <Text style={styles.registerBtnText}>Create Account</Text>
            }
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl },
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, marginBottom: SPACING.xl },
  backBtn: { marginBottom: SPACING.lg },
  backArrow: { fontSize: 24, color: COLORS.text },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: COLORS.textMuted, marginTop: 4 },
  form: { gap: SPACING.md },
  inputGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 12, padding: SPACING.md, fontSize: 16, color: COLORS.text,
  },
  registerBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: SPACING.sm,
  },
  registerBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.xl, paddingBottom: SPACING.md },
  footerText: { color: COLORS.textMuted, fontSize: 14 },
  footerLink: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
});