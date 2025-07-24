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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../utils/colors';
import { loginUser } from '../../services/AuthServices';

// ✅ Move child components OUTSIDE to keep them stable
type LoginInputProps = {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  toggleSecure?: () => void;
};

export const LoginInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secure = false,
  toggleSecure,
}: LoginInputProps) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={20} color="#5D3FD3" style={styles.icon} />
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      autoCapitalize="none"
    />
    {toggleSecure && (
      <TouchableOpacity onPress={toggleSecure}>
        <MaterialIcon
          name={secure ? 'visibility-off' : 'visibility'}
          size={20}
          color="#5D3FD3"
        />
      </TouchableOpacity>
    )}
  </View>
);

type LoginButtonProps = {
  onPress: () => void;
  label: string;
  loading: boolean;
};

export const LoginButton = ({ onPress, label, loading }: LoginButtonProps) => (
  <TouchableOpacity onPress={onPress} disabled={loading}>
    <LinearGradient
      colors={['#5D3FD3', '#8E2DE2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.loginButton}
    >
      <Text style={styles.loginText}>{loading ? 'Logging in...' : label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const LoginScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [secureText, setSecureText] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const { token, user, message } = await loginUser(form);

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      Alert.alert('Success', message || 'Logged in successfully');

      if (user.role.includes('artist')) {
        navigation.navigate('ArtistDashboard', { artistId: user.id, token });
      } else {
        navigation.navigate('AppDrawer', { userId: user.id, token });
      }
    } catch (err: any) {
      const serverError = err.response?.data?.error || 'Something went wrong!';
      Alert.alert('Error', serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <View style={styles.cardContainer}>
          <LoginInput
            icon="envelope"
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <LoginInput
            icon="lock"
            placeholder="Password"
            value={form.password}
            secure={secureText}
            onChangeText={(text) => handleChange('password', text)}
            toggleSecure={() => setSecureText(!secureText)}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <LoginButton onPress={handleLogin} label="Login" loading={loading} />

          <Text style={styles.orText}>────────  OR  ────────</Text>

          <TouchableOpacity style={styles.googleButton}>
            <Icon name="google" size={20} color="#FFFFFF" />
            <Text style={styles.googleText}>Sign in with Gmail</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Text>
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('AppDrawer')}>
          <LinearGradient
            colors={['#5D3FD3', '#8E2DE2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.homeButton}
          >
            <Text style={styles.homeText}>Skip & Explore Arts</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F1FF',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#5D3FD3',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginTop: -20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9E7FD',
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
    color: '#333',
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    marginRight: 5,
    color: '#5D3FD3',
    fontWeight: 'bold',
    fontSize: 13,
  },
  loginButton: {
    borderRadius: 30,
    marginBottom: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  orText: {
    fontSize: 14,
    color: '#555',
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
    color: '#5D3FD3',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 6,
  },
  homeButton: {
    marginTop: 30,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
  },
  homeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
