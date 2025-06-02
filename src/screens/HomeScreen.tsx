// screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import FeaturedArtworks from '../components/FeaturedArtworks';
import PopularArtists from '../components/PopularArtists';
import NewArrivals from '../components/NewArrivals';
import BottomNavigation from '../components/BottomNavigation';

const HomeScreen = () => {
  const navigation = useNavigation();

  const categories = [
    'All',
    'Painting',
    'Sketch',
    'Digital Art',
    'Sculpture',
    'Photography',
    'Illustration',
    'Abstract',
    'Modern',
    'Classic',
    'Fantasy',
  ];

  const featuredArtworks = [
    {
      id: '1',
      title: 'Cosmic Harmony',
      artist: 'Elena Petrova',
      price: '$249.99',
    },
    {
      id: '2',
      title: 'Golden Sunset',
      artist: 'M. Kim',
      price: '$129.99',
    },
    {
      id: '3',
      title: 'Ocean Waves',
      artist: 'A. Lopez',
      price: '$159.99',
    },
    {
      id: '4',
      title: 'Ocean Waves',
      artist: 'A. Lopez',
      price: '$159.99',
    },
    {
      id: '5',
      title: 'Ocean Waves',
      artist: 'A. Lopez',
      price: '$159.99',
    },
  ];

  const popularArtists = [
    { id: '1', initials: 'JP', name: 'J. Parker' },
    { id: '2', initials: 'MK', name: 'M. Kim' },
    { id: '3', initials: 'AL', name: 'A. Lopez' },
    { id: '4', initials: 'RD', name: 'R. Díaz' },
    { id: '5', initials: 'SJ', name: 'S. Jc' },
  ];

  const artworkData = [
    {
      id: '1',
      title: 'Golden Sunset',
      artist: 'M. Kim',
      price: '$129.99',
      image: require('../assets/fantasy/Fantasy1.jpeg'),
    },
    {
      id: '2',
      title: 'Ocean Waves',
      artist: 'A. Lopez',
      price: '$159.99',
      image: require('../assets/fantasy/Fantasy2.jpeg'),
    },
    {
      id: '3',
      title: 'Hidden Forest',
      artist: 'Z. Cheng',
      price: '$99.99',
      image: require('../assets/fantasy/Fantasy3.jpeg'),
    },
  ];

  const handleSeeAll = (section: string) => {
    if (section === 'categories') {
      navigation.navigate('Categories' as never);
    } else {
      console.log(`See all ${section} clicked`);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const renderHeader = () => (
    <>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.leftIcon}>
          <Icon name="bars" size={22} color="#d2a0ff" />
        </TouchableOpacity>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.rightIcon} onPress={goToLogin}>
          <View style={styles.userIconCircle}>
            <Icon name="user" size={16} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.tagline}>Discover unique artworks</Text>

      <SearchBar placeholder="Search artworks, artists..." />

      <Categories
        categories={categories}
        onSeeAll={() => handleSeeAll('categories')}
      />

      <FeaturedArtworks
        artworks={featuredArtworks}
        onSeeAll={() => handleSeeAll('featured')}
      />

      <PopularArtists
        artists={popularArtists}
        onSeeAll={() => handleSeeAll('artists')}
      />

      <NewArrivals
        artworks={artworkData}
        onSeeAll={() => handleSeeAll('new arrivals')}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]} // No main list data; header contains all components
        keyExtractor={() => Math.random().toString()}
        renderItem={null}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<BottomNavigation />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    position: 'relative',
  },
  leftIcon: {
    zIndex: 2,
  },
  rightIcon: {
    zIndex: 2,
  },
  logo: {
    width: 185,
    height: 95,
    position: 'absolute',
    left: '50%',
    top: -5,
    transform: [{ translateX: -77.5 }],
  },
  userIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d2a0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#000000',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomeScreen;
