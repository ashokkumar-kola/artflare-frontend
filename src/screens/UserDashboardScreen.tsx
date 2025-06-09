import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
const UserDashboardScreen = () => {
  return (
    <View style= {styles.container}>
      <Text style={styles.text}>UserDashboardScreen</Text>
    </View>
  );
};

export default UserDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Image
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import ArtworkCard from '../components/Artwork'; // Adjusted path based on your structure

// const UserDashboardScreen = ({ navigation }) => {
//   const [searchText, setSearchText] = useState('');

//   const handleWishlist = () => navigation.navigate('WishlistScreen');
//   const handleCart = () => navigation.navigate('CartScreen');
//   const handleUser = () => navigation.navigate('UserProfileScreen');

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search artworks..."
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         <TouchableOpacity onPress={handleWishlist}>
//           <Icon name="heart" size={24} color="red" style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleCart}>
//           <MaterialIcon name="shopping-cart" size={24} color="black" style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleUser}>
//           <Image
//             source={require('../assets/abstract/Abstract4.jpeg')} // Update to your actual user image path
//             style={styles.userIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Categories */}
//       <Text style={styles.sectionTitle}>Categories</Text>
//       <ScrollView horizontal style={styles.categoryScroll} showsHorizontalScrollIndicator={false}>
//         {['Classic', 'Digital', 'Abstract', 'Fantasy'].map((cat, index) => (
//           <TouchableOpacity key={index} style={styles.categoryChip}>
//             <Text>{cat}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Featured Artworks */}
//       <Text style={styles.sectionTitle}>Featured Artworks</Text>
//       <ArtworkCard section="featured" />

//       {/* Popular Artists */}
//       <Text style={styles.sectionTitle}>Popular Artists</Text>
//       <ArtworkCard section="popular" />

//       {/* New Arrivals */}
//       <Text style={styles.sectionTitle}>New Arrivals</Text>
//       <ArtworkCard section="new" />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 10,
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: '#eee',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     height: 40,
//     marginRight: 10,
//   },
//   icon: {
//     marginHorizontal: 5,
//   },
//   userIcon: {
//     width: 35,
//     height: 35,
//     borderRadius: 17.5,
//     backgroundColor: '#ccc',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   categoryScroll: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   categoryChip: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginRight: 10,
//   },
// });

// export default UserDashboardScreen;
