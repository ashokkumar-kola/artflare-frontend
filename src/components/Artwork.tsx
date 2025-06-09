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

const { width } = Dimensions.get('window');

interface ArtworkProps {
  art_name: string;
  art_image: string | null;
  artist_id: string;
  pricing: number;
  description: string;
  rating: number;
  created_at: string;
  quantity: number;
}

const ArtworkCard: React.FC<{ artwork: ArtworkProps }> = ({ artwork }) => {
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

  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <View style={styles.card}>
      {/* Image */}
      <Image
        source={
          art_image
            ? require('../assets/fantasy/Fantasy1.jpeg') // { uri: art_image }
            : require('../assets/painting/Painting4.jpeg') // Add a placeholder in your assets
        }
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.info}>
        <Text style={styles.name}>{art_name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>

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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArtworkCard;

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
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5D9F2',
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#000000',
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
  button: {
    marginTop: 12,
    backgroundColor: '#A45EE3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
