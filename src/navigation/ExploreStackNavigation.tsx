import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExploreScreen from '../screens/explore/ExploreScreen';
import ArtworksScreen from '../screens/categories/ArtworksScreen'; // filtered by category

import { ExploreStackParamList } from './types';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

const ExploreStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="CategoryFilter" component={ArtworksScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStackNavigation;
