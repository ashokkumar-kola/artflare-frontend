import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Animate opacity from 0 to 1 (showing colorful logo)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Navigate to next screen after a delay
      setTimeout(() => {
        navigation.navigate('OnBoarding'); // Change if needed
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Base logo in gray tint */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.grayLogo}
        resizeMode="contain"
      />
      {/* Animated colorful logo on top */}
      <Animated.Image
        source={require('../assets/logo.png')}
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
