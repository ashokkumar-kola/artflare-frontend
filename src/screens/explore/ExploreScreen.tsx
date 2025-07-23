import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements';

import { api } from '../api/apiClient'; 

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  imageUrl: string;
  likes: number;
  isLiked: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Popular' },
    { id: '3', name: 'New' },
    { id: '4', name: 'Abstract' },
    { id: '5', name: 'Modern' },
  ];

  useEffect(() => {
    fetchArtworks();
  }, [activeFilter]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await api.get('/artwork', {
        params: {
          filter: activeFilter,
          search: searchQuery,
        },
      });
      setArtworks(response.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Add debounce here if needed
    fetchArtworks();
  };

  const handleFilterPress = (filterName: string) => {
    setActiveFilter(filterName);
  };

  const toggleLike = (id: string) => {
    setArtworks(prevArtworks =>
      prevArtworks.map(artwork =>
        artwork.id === id
          ? {
              ...artwork,
              isLiked: !artwork.isLiked,
              likes: artwork.isLiked ? artwork.likes - 1 : artwork.likes + 1,
            }
          : artwork
      )
    );
  };

  const renderArtworkCard = ({ item }: { item: Artwork }) => (
    <View style={styles.artworkCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.artworkImage} />
      <View style={styles.artworkInfo}>
        <Text style={styles.artworkTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.artworkArtist}>{item.artist}</Text>
        <View style={styles.priceLikeContainer}>
          <Text style={styles.artworkPrice}>{item.price}</Text>
          <TouchableOpacity
            onPress={() => toggleLike(item.id)}
            style={styles.likeButton}>
            <Icon
              name={item.isLiked ? 'favorite' : 'favorite-border'}
              size={20}
              color={item.isLiked ? '#FF5C5C' : '#999'}
            />
            <Text style={styles.likeCount}>{item.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFilterChip = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        activeFilter === item.name && styles.activeFilterChip,
      ]}
      onPress={() => handleFilterPress(item.name)}>
      <Text
        style={[
          styles.filterText,
          activeFilter === item.name && styles.activeFilterText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a5acd" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Art</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder="Search artworks, artists..."
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        searchIcon={{ size: 24 }}
        clearIcon={{ size: 24 }}
      />

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.name && styles.activeFilterChip,
              ]}
              onPress={() => handleFilterPress(filter.name)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.name && styles.activeFilterText,
                ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={artworks}
        renderItem={renderArtworkCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.artworkList}
        contentContainerStyle={styles.artworkListContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchArtworks();
            }}
            colors={['#6a5acd']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No artworks found</Text>
            <Text style={styles.emptySubText}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationIcon: {
    padding: 5,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 45,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 15,
  },
  filterScrollContent: {
    paddingRight: 15,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: '#6a5acd',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  artworkListContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  artworkList: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  artworkCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  artworkImage: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    resizeMode: 'cover',
  },
  artworkInfo: {
    padding: 12,
  },
  artworkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  artworkArtist: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  priceLikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artworkPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6a5acd',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});

export default ExploreScreen;
