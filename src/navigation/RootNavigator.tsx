import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnBoardingScreen';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';
import ArtistStackNavigator from '../navigation/ArtistStackNavigator';
// import HomeScreen from '../screens/home/HomeScreen';

import type { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen name="AppDrawer" component={AppDrawerNavigator} />
      <RootStack.Screen name="ArtistStack" component={ArtistStackNavigator} />
      {/* <RootStack.Screen name="Home" component={HomeScreen} /> */}
    </RootStack.Navigator>
  );
}
