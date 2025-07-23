import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

















// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { SafeAreaProvider } from 'react-native-safe-area-context';
// // import { StatusBar } from 'react-native';
// import AppNavigator from './src/navigation/AppNavigator';

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       {/* <SafeAreaProvider> */}
//         <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//         <AppNavigator />
//       {/* </SafeAreaProvider>  */}
//     </GestureHandlerRootView>
//   );
// }





















// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DrawerNavigator from './src/screens/DrawerNavigator';


// import ExploreScreen from './src/screens/ExploreScreen';
// import FavoritesScreen from './src/screens/WishlistScreen';
// import CartScreen from './src/screens/CartScreen';
// import SplashScreen from './src/screens/SplashScreen';
// import OnBoardingScreen from './src/screens/OnBoardingScreen';
// import LoginScreen from './src/screens/LoginScreen';
// import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
// import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
// import RegistrationScreen from './src/screens/RegisterScreen';
// import CreatePasswordScreen from './src/screens/CreatePassword';
// import HomeScreen from './src/screens/HomeScreen';
// import CategoriesScreen from './src/screens/CategoriesScreen';
// import ArtworksScreen from './src/screens/categories/ArtworksScreen';
// import ArtistDashboardScreen from './src/screens/ArtistDashboardScreen';
// import AddEditArtworkScreen from './src/screens/AddEditArtworkScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import ArtworkDetailsScreen from './src/screens/ArtworkDetailsScreen';
// import Orders from './src/screens/Orders';
// import Nortifications from './src/screens/Notifications';


// // import UserDashboardScreen from './src/screens/UserDashboardScreen';
// import ArtworkScreen from './src/screens/ArtworkScreen';


// const RootStack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//         <RootStack.Screen name="Splash" component={SplashScreen} />
//         <RootStack.Screen name="OnBoarding" component={OnBoardingScreen} />
//         <RootStack.Screen name="Profile" component={ProfileScreen} />
//         <RootStack.Screen name="Home" component={HomeScreen} />
//         <RootStack.Screen name="Login" component={LoginScreen} />
//         <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <RootStack.Screen name="OtpVerification" component={OtpVerificationScreen} />
//         <RootStack.Screen name="CreatePassword" component={CreatePasswordScreen} />
//         <RootStack.Screen name="Register" component={RegistrationScreen} />
//         <RootStack.Screen name="Categories" component={CategoriesScreen} />
//         <RootStack.Screen name="Artworks" component={ArtworksScreen} />
//         <RootStack.Screen name="Artwork" component={ArtworkScreen} />
//         <RootStack.Screen name="Explore" component={ExploreScreen} />
//         <RootStack.Screen name="Favorites" component={FavoritesScreen} />
//         <RootStack.Screen name="Cart" component={CartScreen} />
//         <RootStack.Screen name="ArtistDashboard" component={ArtistDashboardScreen} />
//         <RootStack.Screen name="AddEditArtwork" component={AddEditArtworkScreen} />
//         <RootStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
//         <RootStack.Screen name="ArtworkDetails" component={ArtworkDetailsScreen} />
//         <RootStack.Screen name="Orders" component={Orders} />
//         <RootStack.Screen name="Notifications" component={Nortifications} />
//         {/* Uncomment if you have a UserDashboardScreen */}
//         {/* <RootStack.Screen name="UserDashboard" component={UserDashboardScreen} /> */}
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
