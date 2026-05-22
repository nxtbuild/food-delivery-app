// src/navigation/RootNavigator.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {  LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { COLORS } from '../constants';


const prefix = Linking.createURL('/');

const linking: LinkingOptions<any> = {
  prefixes: [prefix, 'foodapp://'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          HomeTab: {
            screens: {
              HomeScreen: 'home',
              RestaurantDetail: 'restaurant/:restaurantId',
              Cart: 'cart',
            },
          },
          Search: 'search',
          Orders: 'orders',
          Profile: 'profile',
        },
      },
      MyOrders: 'my-orders',
      Settings: 'settings',
      Help: 'help',
    },
  },
};

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
});