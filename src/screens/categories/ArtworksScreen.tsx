import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type ParamList = {
  Artworks: {
    category: string;
  };
};

const ArtworksScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'Artworks'>>();
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Showing Artworks in: {category}</Text>
      {/* You can fetch artworks here based on category */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ArtworksScreen;
