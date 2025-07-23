import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigation from '../navigation/HomeStackNavigation';
import ExploreStackNavigation from '../navigation/ExploreStackNavigation';
import WishlistScreen from '../screens/wishlish/WishlistScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileStackNavigation from './ProfileStackNavigation';

import type { MainTabsParamList } from './types';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStackNavigation} />
      <Tab.Screen name="ExploreStack" component={ExploreStackNavigation} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
}
