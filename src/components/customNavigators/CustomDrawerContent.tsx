// navigation/CustomDrawerContent.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../utils/colors';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const username = 'John Doe'; // TODO: Replace with real user data

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Header */}
      <LinearGradient
        colors={[colors.tertiary, colors.quaternary]}
        style={styles.headerBox}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.username}>{username}</Text>
      </LinearGradient>

      {/* Items */}
      <View style={styles.itemBox}>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Artworks"
          icon={({ color, size }) => (
            <FontAwesome5 name="palette" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Artworks')}
        />
        <DrawerItem
          label="Favorites"
          icon={({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Favorites')}
        />
        <DrawerItem
          label="Cart"
          icon={({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Cart')}
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Profile')}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerBox}>
        <DrawerItem
          label="Logout"
          labelStyle={{ fontWeight: '700' }}
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          )}
          onPress={() =>
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          }
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  itemBox: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.primary,
  },
  footerBox: {
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#5D49AC',
  },
});
