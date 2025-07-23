// components/ArtworkCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

interface ArtworkProps {
  id: string | number;          // make sure every artwork has an id
  art_name: string;
  art_image: string | null;
  artist_id: string;
  pricing: number;
  description: string;
  rating: number;
  created_at: string;
  quantity: number;
}

const ArtworkCard: React.FC<{artwork: ArtworkProps}> = ({artwork}) => {
  const navigation = useNavigation<any>();

  const {
    art_name,
    art_image,
    artist_id,
    pricing,
    description,
    rating,
    created_at,
    quantity,
  } = artwork;

  const formattedDate = new Date(created_at).toLocaleDateString('en-US');

  /** navigate to details */
  const handlePress = () => {
    navigation.navigate('ArtworkDetails', {artwork});
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      {/* single card – no extra background wrapper */}
      <View style={styles.card}>
        {/* Picture */}
        <Image
          source={
            art_image
              ? {uri: art_image}
              : require('../assets/painting/Painting4.jpeg')
          }
          style={styles.image}
          resizeMode="cover"
        />

        {/* Name row with heart */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{art_name}</Text>
          <Icon name="heart-o" size={18} color="#A45EE3" />
        </View>

        {/* Description */}
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>

        {/* Meta rows */}
        <View style={styles.row}>
          <Text style={styles.label}>Artist:</Text>
          <Text style={styles.value}>{artist_id}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.price}>₹{pricing}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>
            <Icon name="star" color="#FFD700" /> {rating}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{quantity}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Added:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtworkCard;

/* ---------- styles (card background colour removed) ---------- */
const styles = StyleSheet.create({
    card: {
    width: width * 0.9,
    backgroundColor: '#E5D9F2',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#A45EE3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 16,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#E5D9F2',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    flexShrink: 1,
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  label: {
    fontWeight: 'bold',
    width: 80,
    color: '#555',
  },

  value: {
    color: '#333',
    flexShrink: 1,
  },

  price: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});
