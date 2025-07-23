import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ArtistDashboardScreen from '../screens/artist/ArtistDashboardScreen';
import AddEditArtworkScreen from '../screens/artist/AddEditArtworkScreen';
import ArtworkScreen from '../screens/artist/ArtworkScreen';
import OrdersFromCustomersScreen from '../screens/artist/OrdersFromCustomersScreen';

import { ArtistStackParamList } from './types';

const Stack = createNativeStackNavigator<ArtistStackParamList>();

const ArtistStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ArtistDashboard" component={ArtistDashboardScreen} />
      <Stack.Screen name="AddEditArtwork" component={AddEditArtworkScreen} />
      <Stack.Screen name="MyArtworks" component={ArtworkScreen} />
      <Stack.Screen name="OrdersFromCustomers" component={OrdersFromCustomersScreen} />
    </Stack.Navigator>
  );
};

export default ArtistStackNavigator;
