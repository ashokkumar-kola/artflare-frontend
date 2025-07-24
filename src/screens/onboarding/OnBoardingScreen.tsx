import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import images from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { moderateScale, verticalScale } from '../../utils/scaling';

const OnBoardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.replace('AppDrawer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
            accessibilityLabel="ArtFlare Logo"
          />

          <Text style={styles.welcomeText} accessibilityRole="header">
            Welcome to ArtFlare
          </Text>

          <Image
            source={images.onboardingimg}
            style={styles.artimg}
            accessibilityLabel="Art showcase illustration"
          />

          <Text style={styles.tagline}>
            A spark of art, a flare of expression
          </Text>

          <Text style={styles.description}>
            ArtFlare is a vibrant online platform where artists showcase their creativity
            and connect with art enthusiasts
          </Text>

          <Text style={styles.ctaText}>
            Let's get started!
          </Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleLogin}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Get started with ArtFlare"
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: moderateScale(24),
    alignItems: 'center',
    paddingBottom: verticalScale(20),
  },
  logo: {
    width: moderateScale(245),
    height: moderateScale(245),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(-50),
  },
  welcomeText: {
    color: colors.quaternary,
    fontSize: moderateScale(24),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(-50),
    includeFontPadding: false,
  },
  artimg: {
    width: '100%',
    height: verticalScale(250),
    resizeMode: 'contain',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(-20),
  },
  tagline: {
    color: colors.quaternary,
    fontSize: moderateScale(18),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(-30),
  },
  description: {
    color: colors.black,
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginBottom: verticalScale(30),
    paddingHorizontal: moderateScale(20),
    lineHeight: verticalScale(24),
  },
  ctaText: {
    color: colors.quaternary,
    fontSize: moderateScale(20),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  nextButton: {
    backgroundColor: '#A45EE3',
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(50),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '600',
    includeFontPadding: false,
  },
});
