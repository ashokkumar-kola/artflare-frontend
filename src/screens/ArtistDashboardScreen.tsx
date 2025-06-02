// /screens/ArtistDashboardScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ArtistDashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(route)
  const artistId = route?.params?.artistId;
  const token = route?.params?.token;

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/artwork/artist/${artistId}`,
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

  const deleteArtwork = async (artworkId) => {
    try {
      await axios.delete(`http://192.168.1.93:3000/api/artwork/${artworkId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.artworkCard}>
      <Text style={styles.artworkTitle}>{item.title}</Text>
      <Text style={styles.artworkDesc}>{item.description}</Text>
      <View style={styles.actionRow}>
        <Button
          title="Edit"
          onPress={() =>
            navigation.navigate('AddEditArtwork', {
              artistId,
              token,
              artwork: item,
            })
          }
        />
        <View style={{ width: 10 }} />
        <Button
          title="Delete"
          color="red"
          onPress={() =>
            Alert.alert('Confirm Delete', 'Are you sure?', [
              { text: 'Cancel' },
              { text: 'Yes', onPress: () => deleteArtwork(item._id) },
            ])
          }
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Add New Artwork"
        onPress={() => navigation.navigate('AddEditArtwork', { artistId, token })}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={artworks}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No artworks found.</Text>}
        />
      )}
    </View>
  );
};

export default ArtistDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  artworkCard: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  artworkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artworkDesc: {
    fontSize: 14,
    marginTop: 5,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
