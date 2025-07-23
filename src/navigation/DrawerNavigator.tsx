// // screens/DrawerNavigator.tsx
// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import LinearGradient from 'react-native-linear-gradient';

// // ─── screens ──────────────────────────────────────────
// import HomeScreen      from '../screens/home/HomeScreen';
// import ArtworksScreen  from '../screens/artist/ArtworkScreen';
// import FavoritesScreen from '../screens/wishlish/WishlistScreen';
// import CartScreen      from '../screens/cart/CartScreen';
// import ProfileScreen   from '../screens/profile/ProfileScreen';
// import LoginScreen     from '../screens/auth/LoginScreen';

// const Drawer = createDrawerNavigator();

// /* ---------------- Custom Drawer Content ---------------- */
// const CustomDrawerContent = (props: any) => {
//   const username = 'John Doe';            // TODO: replace with real user data

//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
//       {/* Gradient header */}
//       <LinearGradient
//         colors={['#7D5DE6', '#4726A6']}
//         style={styles.headerBox}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Image
//           source={require('../assets/logo.png')}
//           style={styles.logo}
//         />
//         <Text style={styles.username}>{username}</Text>
//       </LinearGradient>

//       {/* Navigation items */}
//       <View style={styles.itemBox}>
//         <DrawerItem
//           label="Home"
//           icon={({ color, size }) => (
//             <MaterialIcons name="home-filled" size={size} color={color} />
//           )}
//           onPress={() => props.navigation.navigate('Home')}
//         />
//         <DrawerItem
//           label="Artworks"
//           icon={({ color, size }) => (
//             <FontAwesome5 name="palette" size={size} color={color} />
//           )}
//           onPress={() => props.navigation.navigate('Artworks')}
//         />
//         <DrawerItem
//           label="Favorites"
//           icon={({ color, size }) => (
//             <MaterialIcons name="favorite" size={size} color={color} />
//           )}
//           onPress={() => props.navigation.navigate('Favorites')}
//         />
//         <DrawerItem
//           label="Cart"
//           icon={({ color, size }) => (
//             <MaterialIcons name="shopping-cart" size={size} color={color} />
//           )}
//           onPress={() => props.navigation.navigate('Cart')}
//         />
//         <DrawerItem
//           label="Profile"
//           icon={({ color, size }) => (
//             <MaterialIcons name="person" size={size} color={color} />
//           )}
//           onPress={() => props.navigation.navigate('Profile')}
//         />
//       </View>

//       {/* Logout at bottom */}
//       <View style={styles.footerBox}>
//         <DrawerItem
//           label="Logout"
//           labelStyle={{ fontWeight: '700' }}
//           icon={({ color, size }) => (
//             <MaterialIcons name="logout" size={size} color={color} />
//           )}
//           onPress={() =>
//             props.navigation.reset({
//               index: 0,
//               routes: [{ name: 'Login' }],
//             })
//           }
//         />
//       </View>
//     </DrawerContentScrollView>
//   );
// };

// /* ---------------- Main Drawer Navigator ---------------- */
// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: '#fff',
//         drawerInactiveTintColor: '#C5B8F8',
//         drawerLabelStyle: {
//           marginLeft: -16,
//           fontSize: 15,
//           fontWeight: '600',
//         },
//         drawerStyle: {
//           backgroundColor: '#4B2D9B',
//           width: 260,
//         },
//       }}
//     >
//       <Drawer.Screen name="Home"      component={HomeScreen} />
//       <Drawer.Screen name="Artworks"  component={ArtworksScreen} />
//       <Drawer.Screen name="Favorites" component={FavoritesScreen} />
//       <Drawer.Screen name="Cart"      component={CartScreen} />
//       <Drawer.Screen name="Profile"   component={ProfileScreen} />
//       {/* Login kept but hidden from list */}
//       <Drawer.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ drawerItemStyle: { display: 'none' } }}
//       />
//     </Drawer.Navigator>
//   );
// }

// /* ---------------- Styles ---------------- */
// const styles = StyleSheet.create({
//   headerBox: {
//     paddingVertical: 36,
//     paddingHorizontal: 20,
//     alignItems: 'flex-start',
//   },
//   logo: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   username: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   itemBox: {
//     flex: 1,
//     paddingTop: 10,
//   },
//   footerBox: {
//     paddingBottom: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#5D49AC',
//   },
// });
