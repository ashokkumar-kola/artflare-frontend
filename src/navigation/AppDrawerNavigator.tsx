import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabsNavigator from './MainTabsNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SupportStackNavigator from './SupportStackNavigator';

import type { AppDrawerParamList } from './types';

const Drawer = createDrawerNavigator<AppDrawerParamList>();

export default function AppDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="MainTabs" component={MainTabsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="SupportStack" component={SupportStackNavigator} />
    </Drawer.Navigator>
  );
}





