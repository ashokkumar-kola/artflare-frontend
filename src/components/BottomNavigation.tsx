// components/BottomNavigation.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
        <Icon name="home" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Explore' as never)}>
        <Icon name="explore" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites' as never)}>
        <Icon name="favorite" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)}>
        <Icon name="shopping-cart" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default BottomNavigation;
