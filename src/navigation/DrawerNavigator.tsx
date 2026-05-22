
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList } from '../types';
import { COLORS } from '../constants';

import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { MyOrdersDrawerScreen, SettingsDrawerScreen, HelpDrawerScreen } from '../screens/drawer/DrawerScreens';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: '80%',
          backgroundColor: COLORS.background,
        },
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textMuted,
        drawerActiveBackgroundColor: COLORS.primary + '15',
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 8,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        swipeEnabled: true,
      }}
    >
     
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersDrawerScreen}
        options={{
          drawerLabel: 'My Orders',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsDrawerScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Help"
        component={HelpDrawerScreen}
        options={{
          drawerLabel: 'Help & Support',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}