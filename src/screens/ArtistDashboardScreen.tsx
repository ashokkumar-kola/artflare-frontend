import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ArtistDashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const artistId = route?.params?.artistId;
  const token = route?.params?.token;


const fetchArtworks = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      `http://192.168.1.93:3000/api/artwork`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setArtworks(res.data);
  } catch (error) {
    console.error('Error fetching artworks:', error);
  } finally {
    setLoading(false);
  }
};
  const deleteArtwork = async (artworkId : string) => {
    try {
      await axios.delete(`http://192.168.1.93:3000/api/artwork/${artworkId}`);
      // , {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
      fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="elevated">
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      )}
      <Card.Content>
        <Title style={styles.title}>{item.title}</Title>
        <Paragraph numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddEditArtwork', { artistId, token, artwork: item })
          }
        >
          <Icon name="pencil" size={24} color="#1976d2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Confirm Delete', 'Are you sure?', [
              { text: 'Cancel' },
              { text: 'Yes', onPress: () => deleteArtwork(item._id) },
            ])
          }
        >
          <Icon name="delete" size={24} color="red" style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Artworks</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={artworks}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Text>No artworks found.</Text>}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('AddEditArtwork', { artistId, token })}
      />
    </View>
  );
};

export default ArtistDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  cardActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
  },
});
