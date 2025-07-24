import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InteractionManager } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

import SearchBar from '../../components/SearchBar';
import Categories from '../../components/Categories';
import FeaturedArtworks from '../../components/FeaturedArtworks';
import PopularArtists from '../../components/PopularArtists';
import NewArrivals from '../../components/NewArrivals';

import images from '../../assets';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AppDrawer'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userName, setUserName] = useState<string|null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    'All','Painting','Sketch','Digital Art','Sculpture','Photography',
    'Illustration','Abstract','Modern','Classic','Fantasy',
  ];

  const featuredArtworks = [
    {id:'1', title:'Cosmic Harmony', artist:'Elena Petrova', price:'$249.99'},
    {id:'2', title:'Golden Sunset', artist:'M.Kim',       price:'$129.99'},
    {id:'3', title:'Ocean Waves',   artist:'ALopez',     price:'$159.99'},
  ];

  const popularArtists = [
    {id:'1', initials:'JP', name:'J.Parker'},
    {id:'2', initials:'MK', name:'M.Kim'},
    {id:'3', initials:'AL', name:'A.Lopez'},
    {id:'4', initials:'RD', name:'R.Díaz'},
    {id:'5', initials:'SJ', name:'S.Jc'},
  ];

  const artworkData = [
    {id:'1', title:'Golden Sunset', artist:'M.Kim',   price:'$129.99',
     image:require('../../assets/fantasy/Fantasy10.jpeg')},
    {id:'2', title:'Ocean Waves',   artist:'A.Lopez', price:'$159.99',
     image:require('../../assets/fantasy/Fantasy2.jpeg')},
    {id:'3', title:'Hidden Forest', artist:'Z.Cheng', price:'$99.99',
     image:require('../../assets/fantasy/Fantasy3.jpeg')},
  ];

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        navigation.navigate('AuthStack' as never);
        return;
      }
      const raw = await AsyncStorage.getItem('userData');
      if (!raw) {
        navigation.navigate('AuthStack' as never);
        return;
      }
      try {
        const user = JSON.parse(raw);
        setUserName(user?.name ?? null);
      } catch { /* ignore parse error */ }
    })();
  }, [navigation]);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const handleUserPress = () => {
    if (userName) {
      setMenuOpen(prev => !prev);
    } else {
      navigation.navigate('AuthStack' as never);
    }
  };

  const handleProfile = () => {
    setMenuOpen(false);
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('ProfileStack' as never);
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'userData']);
    setMenuOpen(false);
    setUserName(null);
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('AuthStack' as never);
    });
  };

  const handleSeeAll = (section: string) => {
    if (section === 'categories') {
      navigation.navigate('AppDrawer', {
        screen: 'MainTabs',
        params: {
          screen: 'ExploreStack',
          params: {
            screen: 'CategoryFilter',
            params: { categoryId: 'abc123' },
          },
        },
      });
    }
    else {console.log(`See all ${section}`);}
  };

  const headerContent = (
    <>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.leftIcon} onPress={handleMenuPress}>
          <Icon name="bars" size={22} color="#d2a0ff" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.rightIcon} onPress={handleUserPress}>
          <View style={styles.userSection}>
            <View style={styles.userIconCircle}>
              <Icon name="user" size={16} color="#000" />
            </View>
            {userName && <Text style={styles.userName}>{userName}</Text>}
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.userMenu, !menuOpen || !userName ? { display: 'none' } : {}]}>
        <TouchableOpacity onPress={handleProfile} style={styles.menuItem}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
          <Text style={styles.menuText}>Logout</Text>
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
      <TouchableOpacity onPress={() => navigation.navigate('ExploreStack' as never)}>
        <ImageBackground
          source={require('../../assets/artwork/img1.jpeg')}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.buttonText}>Explore More Artworks</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={() => Math.random().toString()}
        renderItem={() => <View />}
        ListHeaderComponent={headerContent}
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
  tagline: {
    fontSize: 14,
    color: '#000000',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  imageBackground: {
    width: '100%',
    height: 150,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(252, 246, 246, 0.4)',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userSection: {
    alignItems: 'center',
  },
  userIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d2a0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 12,
    marginTop: 2,
    color: '#333',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  menuDivider:{
    height: 1,
    backgroundColor: '#eee',
  },
  userMenu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    zIndex: 999,
    paddingVertical: 10,
    width: 120,
  },
  hiddenMenu: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
  },
});

export default HomeScreen;
