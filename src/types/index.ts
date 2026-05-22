

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  minPrice: number;
  image: string;
  coverColor: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Navigation Param Lists
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  RestaurantDetail: {
    restaurantId: string;
    restaurantName: string;
    coverColor: string;
  };
  Cart: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  Search: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};