import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import images from '../../assets';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';

const OnBoardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleLogin = () => {
    navigation.replace('AuthStack');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={ images.logo } style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to ArtFlare</Text>
        <Image source={ images.onboardingimg } style={styles.artimg} />
        <Text style={styles.tagline}>A spark of art, a flare of expression</Text>
        <Text style={styles.description}>
          ArtFlare is a vibrant online platform where artists showcase their creativity
          and connect with art enthusiasts
        </Text>
        <Text style={styles.ctaText}>Let's get started!</Text>

        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logo: {
    width: 245,
    height: 245,
    marginBottom: 10,
    marginTop: -50,
  },
  welcomeText: {
    color: colors.quaternary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -50,
  },
  artimg: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: -20,
  },
  tagline: {
    color: colors.quaternary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: -30,
  },
  description: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  ctaText: {
    color: colors.quaternary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#A45EE3',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
