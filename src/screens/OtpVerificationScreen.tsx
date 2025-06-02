import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import axios from 'axios';

const OtpVerificationScreen = ({ navigation, route }: any) => {
  const { email } = route.params;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const validateOtp = () => {
    if (!otp.trim()) {
      setError('OTP is required');
      return false;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be 6 digits');
      return false;
    }
    setError('');
    return true;
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;

    try {
      const res = await axios.post('http://192.168.1.93:3000/api/auth/verify-otp', {
        email,
        otp,
      });

      Alert.alert('Success', res.data.message);
      navigation.navigate('CreatePassword'); // or Home if needed
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.title}>Enter OTP</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    elevation: 4,
    shadowColor: '#A45EE3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#EDE7F6',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A45EE3',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
