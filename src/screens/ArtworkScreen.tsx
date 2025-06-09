import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import ArtworkCard from '../components/Artwork';
import TopNavBar from '../components/TopNavBar';

interface Artwork {
  art_name: string;
  art_image: string | null;
  artist_id: string;
  pricing: number;
  description: string;
  rating: number;
  created_at: string;
  quantity: number;
}

const API_URL = 'http://192.168.1.93:3000/api/artwork';

const ArtworksScreen: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(API_URL);
      setArtworks(response.data || []);
      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to fetch artworks'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#A020F0" />
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
      <TopNavBar />
      <FlatList
        data={artworks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ArtworkCard artwork={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default ArtworksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});
