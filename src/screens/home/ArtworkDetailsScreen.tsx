// screens/ArtworkDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ArtworkDetails: { id: number };
};

// ------------- MODEL -------------
interface Artwork {
  id: number;
  artist_id: string;
  art_name: string;
  art_image: string | null;
  pricing: number;
  description: string;
  rating: number;
  created_at: string;
  updated_date: string;
  quantity: number;
  category_id: number;
  payment_id: string | null;
}

// ------------- CONSTANTS -------------
const API_BASE = 'http://192.168.29.20:3000/api/artwork'; // expose env if you wish
const { width } = Dimensions.get('window');

const ArtworkDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParamList, 'ArtworkDetails'>>();

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- API ---------- */
  const fetchArtwork = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      setArtwork(res.data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load artwork');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  /* ---------- RENDERS ---------- */
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#B620E0" />
      </SafeAreaView>
    );
  }
  if (error || !artwork) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Artwork not found'}</Text>
      </SafeAreaView>
    );
  }

  const {
    art_name,
    art_image,
    artist_id,
    pricing,
    description,
    rating,
    quantity,
    created_at,
    category_id,
  } = artwork;

  return (
    <SafeAreaView style={styles.container}>
      {/* ---------- Hero image ---------- */}
      <View style={styles.imageWrapper}>
        <Image
          source={
            art_image ? { uri: art_image } : require('../../assets/digital/Digitalart2.jpeg')
          }
          style={styles.heroImage}
        />

        {/* back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* floating heart */}
        <TouchableOpacity style={styles.heartBtn}>
          <Ionicons name="heart-outline" size={26} color="#FF4060" />
        </TouchableOpacity>
      </View>

      {/* ---------- Details card ---------- */}
      <ScrollView
        style={styles.detailsCard}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.artName}>{art_name}</Text>
        <View style={styles.row}>
          <Ionicons name="person-circle" size={18} color="#8F6FFF" />
          <Text style={styles.metaText}>Artist&nbsp;</Text>
          <Text style={styles.metaValue}>{artist_id}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="pricetag" size={18} color="#8F6FFF" />
          <Text style={styles.metaText}>Price&nbsp;</Text>
          <Text style={styles.price}>₹{pricing.toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="star" size={18} color="#FFD055" />
          <Text style={styles.metaText}>Rating&nbsp;</Text>
          <Text style={styles.metaValue}>{rating.toFixed(1)} / 5</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="layers" size={18} color="#8F6FFF" />
          <Text style={styles.metaText}>Category&nbsp;</Text>
          <Text style={styles.metaValue}>{category_id}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cube" size={18} color="#8F6FFF" />
          <Text style={styles.metaText}>Quantity&nbsp;</Text>
          <Text style={styles.metaValue}>{quantity}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time" size={18} color="#8F6FFF" />
          <Text style={styles.metaText}>Created&nbsp;</Text>
          <Text style={styles.metaValue}>
            {new Date(created_at).toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>

      {/* ---------- Add to Cart button ---------- */}
      <TouchableOpacity style={styles.cartBtn}>
        <Ionicons name="cart" size={22} color="#fff" />
        <Text style={styles.cartBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ArtworkDetailsScreen;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECE8FF' },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECE8FF',
  },
  errorText: { color: '#FF4060', fontSize: 15, fontWeight: '600', padding: 22 },

  /* -‑‑ Hero image -‑‑ */
  imageWrapper: { width: '100%', height: width * 0.9 },
  heroImage: { width: '100%', height: '100%' },

  backBtn: {
    position: 'absolute',
    top: 46,
    left: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 8,
    borderRadius: 24,
  },
  heartBtn: {
    position: 'absolute',
    top: 46,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF89A2',
    shadowColor: '#FF4060',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    elevation: 10,
  },

  /* -‑‑ Details card -‑‑ */
  detailsCard: {
    flex: 1,
    marginTop: -32,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 26,
    paddingTop: 40,
  },
  artName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: { fontSize: 14, color: '#555' },
  metaValue: { fontSize: 14, color: '#222', fontWeight: '600' },
  price: { fontSize: 16, color: '#B620E0', fontWeight: '700' },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 6,
    color: '#222',
  },
  description: { fontSize: 14, lineHeight: 20, color: '#444' },

  /* -‑‑ Cart button -‑‑ */
  cartBtn: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 28,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#B620E0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B620E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 14,
  },
  cartBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },
});
