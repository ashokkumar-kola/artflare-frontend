import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [secureText, setSecureText] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password || form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.93:3000/api/auth/login', form);

      const { token, user, message } = response.data;

      Alert.alert('Success', message || 'Logged in successfully');
      console.log('Token:', token, user.role);

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      if ( user.role.includes('artist') ) {
        navigation.navigate('ArtistDashboard', { artistId: user.id, token });
      } else {
        navigation.navigate('UserDashboard', { userId: user.id, token });
      }
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.error || 'Login failed');
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        {/* Card */}
        <View style={styles.cardContainer}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          {/* Password */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry={secureText}
              value={form.password}
              onChangeText={(text) => handleChange('password', text)}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialIcon
                name={secureText ? 'visibility-off' : 'visibility'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* OR Separator */}
          <Text style={styles.orText}>────────  OR  ────────</Text>

          {/* Sign in with Google */}
          <TouchableOpacity style={styles.googleButton}>
            <Icon name="google" size={20} color="#FFFFFF" />
            <Text style={styles.googleText}>Sign in with Gmail</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <Text style={styles.footerText}>
            <Text style={{ fontWeight: 'bold' }}>Don't have an account? </Text>
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5EFFF',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  logo: {
    width: 245,
    height: 245,
    marginBottom: 5,
    marginTop: -30,
    resizeMode: 'contain',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#A45EE3',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#CDC1FF',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 10,
    width: '100%',
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    color: '#A45EE3',
    fontWeight: 'bold',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#A45EE3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34A853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
    alignSelf: 'center',
  },
  googleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  registerLink: {
    color: '#A45EE3',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 6,
  },
});
