// navigation/AppDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabsNavigator from './MainTabsNavigator';
import HomeScreen from '../screens/home/HomeScreen';
import ArtworksScreen from '../screens/artist/ArtworkScreen';
import FavoritesScreen from '../screens/wishlist/WishlistScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';

// Import your custom drawer
import CustomDrawerContent from '../components/customNavigators/CustomDrawerContent';

import { colors } from '../utils/colors';

const Drawer = createDrawerNavigator();

export default function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#C5B8F8',
        drawerLabelStyle: {
          marginLeft: -16,
          fontSize: 15,
          fontWeight: '600',
        },
        drawerStyle: {
          backgroundColor: colors.primary,
          width: 260,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabsNavigator} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Artworks" component={ArtworksScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}



// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import MainTabsNavigator from './MainTabsNavigator';
// import SettingsScreen from '../screens/settings/SettingsScreen';
// import SupportStackNavigator from './SupportStackNavigator';

// import type { AppDrawerParamList } from './types';

// const Drawer = createDrawerNavigator<AppDrawerParamList>();

// export default function AppDrawerNavigator() {
//   return (
//     <Drawer.Navigator screenOptions={{ headerShown: false }}>
//       <Drawer.Screen name="MainTabs" component={MainTabsNavigator} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//       <Drawer.Screen name="SupportStack" component={SupportStackNavigator} />
//     </Drawer.Navigator>
//   );
// }





