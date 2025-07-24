import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import images from '../../assets';
import { RootStackParamList } from '../../navigation/types';

const SPLASH_DURATION = 2000;
const SPLASH_DELAY = 1000;

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Onboarding'>>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const navigateToOnboarding = useCallback(() => {
    navigation.replace('Onboarding');
  }, [navigation]);

  // Prevent Android back button during splash
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: SPLASH_DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    animation.start(() => {
      timeoutRef.current = setTimeout(navigateToOnboarding, SPLASH_DELAY);
    });

    return () => {
      animation.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fadeAnim, navigateToOnboarding]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={images.logo}
          style={styles.grayLogo}
          resizeMode="contain"
          accessibilityRole="image"
        />
        <Animated.Image
          source={images.logo}
          style={[styles.logo, { opacity: fadeAnim }]}
          resizeMode="contain"
          accessibilityRole="image"
        />
      </View>
    </SafeAreaView>
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
