
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, MOCK_USER } from '../constants';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'foodapp_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore auth state on app start
    restoreAuthState();
  }, []);

  const restoreAuthState = async () => {
    try {
      const stored = await SecureStore.getItemAsync(AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (e) {
      console.log('Failed to restore auth state', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock auth — accept any non-empty creds
    if (!email.trim() || !password.trim()) return false;

    try {
      const mockUser = { ...MOCK_USER, email };
      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (e) {
      console.log('Login failed', e);
      return false;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_KEY);
    } catch (e) {
      console.log('Logout error', e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}