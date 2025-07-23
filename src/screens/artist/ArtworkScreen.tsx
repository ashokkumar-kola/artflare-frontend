// screens/ArtworksScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import ArtworkCard from '../../components/ArtworkCard';
import TopNavBar from '../../components/TopNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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

const API_URL = 'http://192.168.29.20:3000/api/artwork';

const ArtworksScreen: React.FC = () => {
  const navigation = useNavigation();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 👉 optional: pull this from context / store later
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(API_URL);
      setArtworks(response.data || []);
      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch artworks',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  /* ---------- HANDLERS ---------- */
  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  /* ---------- RENDERS ---------- */
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#B620E0" />
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
      {/* Re‑use your own TopNavBar component */}
      <TopNavBar title="Artworks" />

      <FlatList
        data={artworks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ArtworkCard artwork={item} />

            {/* Existing floating heart button */}
            <TouchableOpacity style={styles.heartWrapper}>
              <Ionicons name="heart-outline" size={24} color="#FF4060" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      />

      {/* 🌟 New floating Cart FAB */}
      <TouchableOpacity style={styles.cartFAB} onPress={handleCartPress}>
        <Ionicons name="cart-outline" size={30} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ArtworksScreen;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  /* ---------- existing styles (unchanged) ---------- */
  container: {
    flex: 1,
    backgroundColor: '#ECE8FF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF4060',
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 22,
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    marginHorizontal: 20,
    marginVertical: 14,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 0.8,
    borderColor: '#E6DEFF',
  },
  heartWrapper: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: '#FF89A2',
    shadowColor: '#FF4060',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 8,
  },

  /* ---------- NEW styles for Cart FAB ---------- */
  cartFAB: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#B620E0',          // vibrant accent
    justifyContent: 'center',
    alignItems: 'center',

    /* subtle glow */
    shadowColor: '#B620E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 14,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#FF4060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
