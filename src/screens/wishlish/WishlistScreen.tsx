// screens/WishlistScreen.tsx
import React, {useEffect, useState, useCallback} from 'react';
import {
View,
Text,
StyleSheet,
SafeAreaView,
FlatList,
TouchableOpacity,
Image,
Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

type Artwork = {
id: string;
title: string;
artist: string;
price: string;
image: string; // local uri or remote url
};

const ACCENT = '#6d3aff';
const RADIUS = 16;

const WishlistScreen = () => {
const navigation = useNavigation();
const [wishlist, setWishlist] = useState<Artwork[]>([]);
const [loading, setLoading] = useState(true);

/* ---------- helper to read & write AsyncStorage ---------- */
const loadWishlist = async () => {
setLoading(true);
const raw = await AsyncStorage.getItem('wishlist');
if (raw) {
try {
setWishlist(JSON.parse(raw));
} catch { setWishlist([]); }
} else setWishlist([]);
setLoading(false);
};

const saveWishlist = async (data: Artwork[]) => {
setWishlist(data);
await AsyncStorage.setItem('wishlist', JSON.stringify(data));
};

/* ---------- auto‑refresh when screen gains focus ---------- */
useFocusEffect(
useCallback(() => {
loadWishlist();
}, []),
);

/* ---------- handlers ---------- */
const removeFromWishlist = (id: string) => {
const newList = wishlist.filter(item => item.id !== id);
saveWishlist(newList);
};

const addToCart = async (item: Artwork) => {
const raw = await AsyncStorage.getItem('cart');
const cart = raw ? JSON.parse(raw) : [];
await AsyncStorage.setItem('cart', JSON.stringify([...cart, item]));
Alert.alert('Added to cart', `${item.title} is now in your cart.`);
};

/* ---------- renderers ---------- */
const renderItem = ({item}: {item: Artwork}) => (
<View style={styles.card}>
<TouchableOpacity
onPress={() => navigation.navigate('Artwork' as never, {id: item.id})}
style={{flexDirection: 'row', alignItems: 'center'}}>
<Image
source={item.image.startsWith('http')
? {uri: item.image}
: {uri: item.image}}
style={styles.thumb}
/>
<View style={{flex: 1, marginLeft: 10}}>
<Text style={styles.title}>{item.title}</Text>
<Text style={styles.artist}>{item.artist}</Text>
<Text style={styles.price}>{item.price}</Text>
</View>
</TouchableOpacity>
  <View style={styles.iconCol}>
    <TouchableOpacity onPress={() => addToCart(item)}>
      <Icon name="shopping-cart" size={20} color="#555" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => removeFromWishlist(item.id)}
      style={{marginTop: 12}}>
      <Icon name="trash" size={20} color="#e55" />
    </TouchableOpacity>
  </View>
</View>
);

/* ---------- empty state ---------- */
if (!loading && wishlist.length === 0) {
return (
<SafeAreaView style={styles.container}>
<View style={styles.emptyWrap}>
<Icon name="heart-o" size={60} color="#bbb" />
<Text style={styles.emptyTitle}>Your wishlist is empty</Text>
<Text style={styles.emptySub}>
Tap the heart icon on any artwork to save it here.
</Text>
<TouchableOpacity
style={styles.exploreBtn}
onPress={() => navigation.navigate('Home' as never)}>
<Text style={styles.exploreText}>Explore Artworks</Text>
<Icon
name="arrow-right"
size={16}
color="#fff"
style={{marginLeft: 6}}
/>
</TouchableOpacity>
</View>
</SafeAreaView>
);
}

/* ---------- main render ---------- */
return (
<SafeAreaView style={styles.container}>
<FlatList
data={wishlist}
keyExtractor={item => item.id}
renderItem={renderItem}
contentContainerStyle={{paddingVertical: 10}}
/>
</SafeAreaView>
);
};

/* ---------- styles ---------- */
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f5efff',
},
card: {
flexDirection: 'row',
backgroundColor: '#fff',
marginHorizontal: 16,
marginVertical: 8,
borderRadius: RADIUS,
elevation: 2,
shadowColor: '#000',
shadowOpacity: 0.05,
shadowOffset: {width: 0, height: 1},
shadowRadius: 2,
},
thumb: {
width: 90,
height: 90,
borderTopLeftRadius: RADIUS,
borderBottomLeftRadius: RADIUS,
},
title: {
fontSize: 16,
fontWeight: '600',
color: '#333',
},
artist: {
fontSize: 13,
color: '#777',
marginTop: 2,
},
price: {
fontSize: 14,
color: ACCENT,
marginTop: 6,
fontWeight: '600',
},
iconCol: {
justifyContent: 'center',
alignItems: 'center',
paddingHorizontal: 12,
},

/* empty state */
emptyWrap: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
paddingHorizontal: 40,
},
emptyTitle: {
fontSize: 20,
fontWeight: '600',
color: '#666',
marginTop: 20,
},
emptySub: {
fontSize: 14,
color: '#999',
textAlign: 'center',
marginTop: 8,
lineHeight: 20,
},
exploreBtn: {
marginTop: 20,
flexDirection: 'row',
backgroundColor: ACCENT,
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: RADIUS / 2,
alignItems: 'center',
},
exploreText: {
color: '#fff',
fontSize: 15,
fontWeight: '600',
},
});

export default WishlistScreen;