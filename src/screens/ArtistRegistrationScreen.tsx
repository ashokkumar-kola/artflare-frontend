// // /screens/ArtistRegistrationScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import axios from 'axios';

// const ArtistRegistrationScreen = ({ navigation }) => {
//   const [form, setForm] = useState({
//     name: '',
//     phone_number: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = 'Name is required';
//     if (!/^[0-9]{10}$/.test(form.phone_number)) newErrors.phone_number = 'Phone number must be 10 digits';
//     if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
//     if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     return newErrors;
//   };

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//     setErrors({ ...errors, [field]: '' });
//   };

//   const handleRegister = async () => {
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axios.post('http://192.168.1.93:3000/api/auth/register', {
//         ...form,
//         role: 'artist',
//       });
//       Alert.alert('Success', response.data.message);
//       navigation.navigate('Login');
//     } catch (err) {
//       Alert.alert('Error', err.response?.data?.error || 'Registration failed');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.wrapper}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.card}>
//           {/* Name */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="Enter your name"
//               style={styles.input}
//               value={form.name}
//               onChangeText={(text) => handleChange('name', text)}
//             />
//           </View>
//           {errors.name && <Text style={styles.error}>{errors.name}</Text>}

//           {/* Phone Number */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="Enter your phone number"
//               style={styles.input}
//               keyboardType="numeric"
//               value={form.phone_number}
//               onChangeText={(text) => handleChange('phone_number', text)}
//             />
//           </View>
//           {errors.phone_number && <Text style={styles.error}>{errors.phone_number}</Text>}

//           {/* Email */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="Enter your email"
//               style={styles.input}
//               keyboardType="email-address"
//               value={form.email}
//               onChangeText={(text) => handleChange('email', text)}
//             />
//           </View>
//           {errors.email && <Text style={styles.error}>{errors.email}</Text>}

//           {/* Password */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="Enter your password"
//               style={styles.input}
//               secureTextEntry={true}
//               value={form.password}
//               onChangeText={(text) => handleChange('password', text)}
//             />
//           </View>
//           {errors.password && <Text style={styles.error}>{errors.password}</Text>}

//           {/* Register Button */}
//           <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
//             <Text style={styles.registerText}>Register as Artist</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default ArtistRegistrationScreen;

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#F5EFFF',
//   },
//   container: {
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     paddingTop: 10,
//     paddingBottom: 30,
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     padding: 20,
//     borderRadius: 20,
//     elevation: 4,
//     shadowColor: '#A45EE3',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     marginTop: 20,
//   },
//   inputContainer: {
//     backgroundColor: '#CDC1FF',
//     borderRadius: 25,
//     marginBottom: 10,
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     paddingHorizontal: 15,
//   },
//   input: {
//     fontSize: 16,
//   },
//   registerButton: {
//     backgroundColor: '#A45EE3',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
//   registerText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   error: {
//     color: 'red',
//     fontSize: 13,
//     alignSelf: 'flex-start',
//     marginBottom: 6,
//     marginLeft: 10,
//   },
// });
