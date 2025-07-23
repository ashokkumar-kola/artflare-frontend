import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SupportScreen from '../screens/support/SupportScreen';
import FAQScreen from '../screens/support/FAQScreen';
import TermsAndConditionsScreen from '../screens/support/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/support/PrivacyPolicyScreen';

import { SupportStackParamList } from './types';

const Stack = createNativeStackNavigator<SupportStackParamList>();

const SupportStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
};

export default SupportStackNavigator;
