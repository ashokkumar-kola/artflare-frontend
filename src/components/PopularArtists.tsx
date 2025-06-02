// components/PopularArtists.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Artist {
  id: string;
  initials: string;
  name: string;
}

interface PopularArtistsProps {
  artists: Artist[];
  onSeeAll?: () => void;
}

const PopularArtists: React.FC<PopularArtistsProps> = ({ artists, onSeeAll }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Artists</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistsContainer}>
        {artists.map((artist) => (
          <TouchableOpacity key={artist.id} style={styles.artistItem}>
            <View style={styles.artistInitials}>
              <Text style={styles.artistInitialsText}>{artist.initials}</Text>
            </View>
            <Text style={styles.artistNameText}>{artist.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  artistsContainer: {
    marginTop: 10,
  },
  artistItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  artistInitials: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d2a0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  artistInitialsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  artistNameText: {
    fontSize: 14,
    color: '#333',
  },
});

export default PopularArtists;