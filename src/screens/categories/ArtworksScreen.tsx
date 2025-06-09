import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';

type ParamList = {
  Artworks: {
    category: string;
  };
};

interface Artwork {
  _id: string;
  art_name: string;
  art_image: string;
  artist_name: string;
}

const API_BASE_URL = 'http://192.168.1.93:3000/api/artworks/category';

const ArtworksScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'Artworks'>>();
  const { category } = route.params;

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${category}`);
      setArtworks(response.data.artworks || []);
      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to fetch artworks'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [category]);

  const renderItem = ({ item }: { item: Artwork }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.art_image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.artName} numberOfLines={1}>{item.art_name}</Text>
        <Text style={styles.artistName}>by {item.artist_name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#7B2CBF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Artworks in: {category}</Text>
      <FlatList
        data={artworks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No artworks found in this category.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ArtworksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5E239D',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#A45EE3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#eee',
  },
  infoContainer: {
    padding: 10,
  },
  artName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
