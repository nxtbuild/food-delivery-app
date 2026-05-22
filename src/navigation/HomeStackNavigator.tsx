
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import { COLORS } from '../constants';

import HomeScreen from '../screens/home/HomeScreen';
import RestaurantDetailScreen from '../screens/restaurant/RestaurantDetailScreen';
import CartScreen from '../screens/cart/CartScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: route.params.restaurantName,
          headerShown: false, 
         
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}