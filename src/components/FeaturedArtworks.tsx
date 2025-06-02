import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';


import Abstract1 from '../assets/abstract/Abstract1.jpeg';
import Classic1 from '../assets/classic/Classic1.jpeg';
import DigitalArt1 from '../assets/digital/Digitalart1.jpeg';
import Fantasy1 from '../assets/fantasy/Fantasy1.jpeg';
import llustration1 from '../assets/llustration/llustration1.jpeg';

const images = [Abstract1, Classic1, DigitalArt1, Fantasy1, llustration1];


interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
}

interface FeaturedArtworksProps {
  artworks: Artwork[];
  onSeeAll?: () => void;
}

const FeaturedArtworks: React.FC<FeaturedArtworksProps> = ({ artworks, onSeeAll }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={artworks}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.featuredItem}>
          <Image
          source={images[index]}
          style={styles.artworkImage}
          resizeMode="cover"
          />
            <Text style={styles.artworkTitle}>{item.title}</Text>
            <View style={styles.artworkFooter}>
              <Text style={styles.artistName}>by {item.artist}</Text>
              <Text style={styles.artworkPrice}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#000000',
  },
  featuredItem: {
    width: 200,
    marginRight: 15,
  },
  artworkImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  artworkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  artworkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
  artworkPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FeaturedArtworks;
