import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import images from '../../assets';

import { RootStackParamList } from '../../navigation/types';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Onboarding'>>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Navigate to next screen after a delay
      setTimeout(() => {
        navigation.replace('Onboarding');
      }, 1000);
    });
  },);

  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={styles.grayLogo}
        resizeMode="contain"
      />
      <Animated.Image
        source={images.logo}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 245,
    height: 245,
    position: 'absolute',
  },
  grayLogo: {
    width: 245,
    height: 245,
    tintColor: '#CCCCCC',
  },
});
