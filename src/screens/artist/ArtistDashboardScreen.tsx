// screens/ArtistDashboardScreen.tsx
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
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ArtistDashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const artistId = route?.params?.artistId;
  const token = route?.params?.token;

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://192.168.29.20:3000/api/artwork`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtworks(res.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArtwork = async (artworkId: string) => {
    try {
      await axios.delete(`http://192.168.29.20:3000/api/artwork/${artworkId}`);
      fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

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

  const handleNavigation = (tabName: string, screen: string) => {
    setActiveTab(tabName);
    navigation.navigate(screen as never, { artistId, token });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎨 Your Artworks</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={artworks}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListEmptyComponent={<Text style={styles.noArtwork}>No artworks found.</Text>}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('AddEditArtwork', { artistId, token })}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        {renderTab('home', 'Home')}
        {renderTab('view-dashboard', 'Dashboard')}
        {renderTab('plus-circle', 'AddArtwork', true)}
        {renderTab('bell-outline', 'Notifications')}
        {renderTab('account-circle-outline', 'Profile')}
      </View>
    </View>
  );

  function renderTab(iconName: string, screen: string, isCenter?: boolean) {
    const isActive = activeTab === screen;
    return (
      <TouchableOpacity
        onPress={() => handleNavigation(screen, screen)}
        style={[styles.tabItem, isCenter && styles.centerTab]}
      >
        <Icon
          name={iconName}
          size={isActive ? 30 : 24}
          color={isActive ? '#fff' : '#333'}
          style={{
            backgroundColor: isActive ? '#6200ee' : 'transparent',
            padding: isActive ? 10 : 5,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
    );
  }
};

export default ArtistDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  noArtwork: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#999',
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
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
    right: 25,
    bottom: 80,
    backgroundColor: '#6200ee',
    zIndex: 10,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d1a3ff',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingVertical: 10,
    zIndex: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centerTab: {
    marginTop: -10,
  },
});
