import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://192.168.29.20:3000/api/auth/forgot-password', {
        email: email.trim().toLowerCase(),
      });

      if (response.data.success) {
        Alert.alert('Success', 'OTP has been sent to your email');
        navigation.navigate('OtpVerification', { email: email.trim().toLowerCase() });
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        Alert.alert('Error', 'User not found');
      } else {
        Alert.alert('Error', 'Server error, please try again later');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>

          {/* Logo */}
          <Image source={require('../../assets/logo.png')} style={styles.logo} />

          {/* Card Content */}
          <View style={styles.card}>
            <Text style={styles.title}>Forgot Password</Text>

            <Text style={styles.subtitle}>
              Please enter your email address to receive a new OTP
            </Text>

            <View style={styles.inputContainer}>
              <Icon name="envelope" size={20} color="#000000" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#000000"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
    paddingHorizontal: 25,
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 245,
    height: 245,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#A45EE3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A594F9',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDC1FF',
    borderRadius: 30,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
  },
  button: {
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
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
