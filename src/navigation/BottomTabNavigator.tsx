
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types';
import { COLORS } from '../constants';
import { useCart } from '../context/CartContext';

import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/search/SearchScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabBarIcon({ name, focused, color }: { name: IconName; focused: boolean; color: string }) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

function OrdersBadge({ children, cartCount }: { children: React.ReactNode; cartCount: number }) {
  return (
    <View>
      {children}
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function BottomTabNavigator() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => {
          // Hide tab bar on RestaurantDetail and Cart screens
          const routeName = getFocusedRouteName(route);
          const hideTabBar = routeName === 'RestaurantDetail' || routeName === 'Cart';

          return {
            title: 'Home',
            tabBarStyle: hideTabBar ? { display: 'none' } : styles.tabBar,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                focused={focused}
                color={color}
              />
            ),
          };
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'search' : 'search-outline'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused, color }) => (
            <OrdersBadge cartCount={totalItems}>
              <TabBarIcon
                name={focused ? 'receipt' : 'receipt-outline'}
                focused={focused}
                color={color}
              />
            </OrdersBadge>
          ),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: styles.nativeBadge,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function getFocusedRouteName(route: any): string {
  const state = route.state;
  if (!state || state.index === undefined) return 'HomeScreen';
  const activeRoute = state.routes[state.index];
  return activeRoute?.name ?? 'HomeScreen';
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabItem: {
    paddingTop: 4,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  iconWrapperActive: {
    backgroundColor: COLORS.primary + '15',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.surface,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  nativeBadge: {
    backgroundColor: COLORS.primary,
    fontSize: 10,
  },
});