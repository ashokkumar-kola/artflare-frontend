import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Favorites Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    justifyContent: 'center', // Vertical centering
    alignItems: 'center', // Horizontal centering
    backgroundColor: '#fff', // Optional
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});

export default FavoritesScreen;

