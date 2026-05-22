# FoodApp 

## Quick Start

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

---

## 🗺️ Navigation Structure

```
App.tsx
└── RootNavigator (NavigationContainer + deep linking)
    │
    ├── [Unauthenticated] AuthNavigator (NativeStackNavigator)
    │   ├── Onboarding          ← Full-screen dark landing
    │   ├── Login               ← Email/password form, shake animation
    │   └── Register            ← Sign up form
    │
    └── [Authenticated] DrawerNavigator (DrawerNavigator)
        │   
        ├── MainTabs (BottomTabNavigator)          ← "Home" in drawer
        │   │   (4 tabs, vector icons, cart badge, hide-on-detail)
        │   ├── HomeTab ─── HomeStackNavigator (NativeStackNavigator)
        │   │               ├── HomeScreen          ← Restaurant list + categories
        │   │               ├── RestaurantDetail    ← Params: id, name, color
        │   │               └── Cart                ← Order summary + checkout
        │   │
        │   ├── Search          ← Live restaurant/dish filter
        │   ├── Orders          ← Active order tracker + history
        │   └── Profile         ← User info + drawer trigger button
        │
        ├── MyOrders            ← Drawer-only screen
        ├── Settings            ← Toggle settings
        └── Help                ← FAQ + contact support
```

---

## 🧭 Navigation Patterns

### 1. Stack Navigator
- `AuthNavigator`: Onboarding → Login → Register
- `HomeStackNavigator`: HomeScreen → RestaurantDetail → Cart
- Custom header title, back label, header background color (via `screenOptions`)
- `animation: 'slide_from_right'` for forward, `'fade_from_bottom'` for modals

### 2. Bottom Tab Navigator
- 4 tabs with `@expo/vector-icons` (Ionicons)
- Active icon uses filled variant; inactive uses outline
- Icon wrapper highlights with `COLORS.primary + '15'` tint when focused
- **Cart badge** on Orders tab via `tabBarBadge` prop (reads from `CartContext`)
- **Hide tab bar** on RestaurantDetail and Cart: `getFocusedRouteName()` reads nested route state and conditionally sets `tabBarStyle: { display: 'none' }`

### 3. Drawer Navigator
- `drawerType: 'slide'` for a push-style animation
- **Custom drawer content**: `CustomDrawerContent` renders user avatar, name, email, gold member badge at the top, then `<DrawerItemList>`, then logout button
- Swipe-to-open gesture enabled
- Profile screen contains a button that calls `navigation.openDrawer()`

### 4. Conditional Auth Flow
```
isLoading  → <ActivityIndicator />          (prevents flash)
isAuth     → <DrawerNavigator />            (full app)
!isAuth    → <AuthNavigator />              (login flow)
```
Auth state is persisted to `expo-secure-store`. On reload, `AuthContext` restores the session before rendering, so authenticated users go directly to the main app.



## 🔀 Programmatic Navigation

| Method | Used where |
|--------|-----------|
| `navigate('Screen', params)` | HomeScreen → RestaurantDetail |
| `goBack()` | All back buttons |
| `replace('Login')` | Onboarding → Login (no back) |
| `reset({ index: 0, routes: [{ name: 'HomeScreen' }] })` | After placing order |
| `openDrawer()` | Profile screen menu button |

---

## 🔗 Deep Linking

**Scheme:** `food-delivery-app://`

| URL | Destination |
|-----|-------------|
| `food-delivery-app://home` | HomeScreen |
| `food-delivery-app://restaurant/1` | RestaurantDetail (id=1) |
| `food-delivery-app://cart` | Cart screen |
| `food-delivery-app://search` | Search tab |
| `food-delivery-app://orders` | Orders tab |
| `food-delivery-app://settings` | Settings drawer screen |

**Test on device/simulator:**
```bash
# iOS Simulator
xcrun simctl openurl booted "foodapp://restaurant/1"

# Android Emulator
adb shell am start -W -a android.intent.action.VIEW -d "foodapp://restaurant/1"
```



---

## 🎨 Screen Transition Animations

| Transition | Animation |
|-----------|-----------|
| Auth screens | `fade_from_bottom` |
| Stack forward | `slide_from_right` |
| Auth → Main | Automatic (navigator swap) |
| Drawer open | `slide` (pushes content) |
| Tab switch | Default fade |

---

## 📁 Project Structure

```
src/
├── app/
│   └── _layout.tsx          # Expo Router entry (providers)
├── components/
│   └── CustomDrawerContent.tsx
├── constants/
│   └── index.ts             # Colors, spacing, mock data
├── context/
│   ├── AuthContext.tsx       # Auth state + SecureStore persistence
│   └── CartContext.tsx       # Cart state management
├── navigation/
│   ├── RootNavigator.tsx     # NavigationContainer + linking
│   ├── AuthNavigator.tsx     # Auth stack
│   ├── DrawerNavigator.tsx   # Drawer with custom content
│   ├── BottomTabNavigator.tsx # 4-tab nav with badge logic
│   └── HomeStackNavigator.tsx # Home → Detail → Cart stack
├── screens/
│   ├── auth/                 # Onboarding, Login, Register
│   ├── home/                 # HomeScreen
│   ├── restaurant/           # RestaurantDetailScreen
│   ├── cart/                 # CartScreen
│   ├── search/               # SearchScreen
│   ├── orders/               # OrdersScreen
│   ├── profile/              # ProfileScreen
│   └── drawer/               # MyOrders, Settings, Help
└── types/
    └── index.ts              # All TypeScript types + param lists
```



## 📝 Notes

- **Mock auth**: any non-empty email + password logs you in  
- **TypeScript**: all navigators, screens and params are fully typed