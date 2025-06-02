import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  image: any;
}

interface NewArrivalsProps {
  artworks: Artwork[];
  onSeeAll?: () => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ artworks, onSeeAll }) => {
  const displayArtworks = artworks.slice(0, 2);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newArrivalsContainer}>
        {displayArtworks.map((item) => (
          <View key={item.id} style={styles.newArrivalItem}>
            <Image
              source={item.image}
              style={styles.artworkImage}
              resizeMode="cover"
            />
            <Text style={styles.artworkTitle}>{item.title}</Text>
            <View style={styles.artworkFooter}>
              <Text style={styles.artistName}>by {item.artist}</Text>
              <Text style={styles.artworkPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
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
  newArrivalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  newArrivalItem: {
    width: '48%',
    marginBottom: 15,
  },
  artworkImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
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

export default NewArrivals;
