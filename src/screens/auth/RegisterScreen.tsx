import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
import {api} from '../../api/apiClient';


const RegistrationScreen = ({ navigation }: any) => {
  const [secureText, setSecureText] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'artist' | 'user' | null>(null);

  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) {newErrors.name = 'Name is required';}
    if (!/^[0-9]{10}$/.test(form.phone_number)) {newErrors.phone_number = 'Phone number must be 10 digits';}
    if (!/\S+@\S+\.\S+/.test(form.email)) {newErrors.email = 'Email is invalid';}
    if (form.password.length < 6) {newErrors.password = 'Password must be at least 6 characters';}
    if (!selectedRole) {newErrors.role = 'Please select a role';}
    return newErrors;
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleRegister = async () => {
    console.log('Form data:', form, 'Selected role:', selectedRole);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Form data:', form, 'Selected role:', selectedRole);
      const response = await api.post('/auth/register', {
        ...form,
        role: selectedRole,
      });
      console.log('Registration response:', response.data);
      Alert.alert('Success', response.data.message);
      navigation.navigate('Login');
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.error || 'Registration failed');
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

        <View style={styles.card}>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          </View>
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}


          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter your phone number"
              style={styles.input}
              keyboardType="numeric"
              value={form.phone_number}
              onChangeText={(text) => handleChange('phone_number', text)}
            />
          </View>
          {errors.phone_number && <Text style={styles.error}>{errors.phone_number}</Text>}


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


          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, selectedRole === 'artist' && styles.roleSelected]}
              onPress={() => setSelectedRole('artist')}
            >
              <Text style={styles.roleText}>Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, selectedRole === 'user' && styles.roleSelected]}
              onPress={() => setSelectedRole('user')}
            >
              <Text style={styles.roleText}>User</Text>
            </TouchableOpacity>
          </View>
          {errors.role && <Text style={styles.error}>{errors.role}</Text>}


          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>


          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>
              login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;


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
    marginTop: 0,
    resizeMode: 'contain',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#A45EE3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: -40,
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
  registerButton: {
    backgroundColor: '#A45EE3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  registerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#CDC1FF',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  roleSelected: {
    backgroundColor: '#A45EE3',
  },
  roleText: {
    color: '#000',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#000000',
    fontWeight: 'bold',
  },
  orText: {
    marginHorizontal: 10,
    color: '#000000',
    fontWeight: 'bold',
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
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  signInLink: {
    color: '#A594F9',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginLeft: 10,
  },
});
