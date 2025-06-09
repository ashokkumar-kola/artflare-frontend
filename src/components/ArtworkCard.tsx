// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// interface ArtworkCardProps {
//   artName: string;
//   artistName: string;
//   price: number;
//   image: any; // Usually require(...) or { uri: '' }
//   isInWishlist: boolean;
//   onToggleWishlist: () => void;
//   onAddToCart: () => void;
// }

// const ArtworkCard: React.FC<ArtworkCardProps> = ({
//   artName,
//   artistName,
//   price,
//   image,
//   isInWishlist,
//   onToggleWishlist,
//   onAddToCart
// }) => {
//   return (
//     <View style={styles.card}>
//       <Image source={image} style={styles.image} />

//       <View style={styles.info}>
//         <Text style={styles.name}>{artName}</Text>
//         <Text style={styles.artist}>{artistName}</Text>
//         <Text style={styles.price}>₹{price}</Text>
//       </View>

//       <View style={styles.actions}>
//         <TouchableOpacity onPress={onToggleWishlist}>
//           <Icon
//             name={isInWishlist ? 'heart' : 'heart-o'}
//             size={22}
//             color={isInWishlist ? 'red' : 'gray'}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={onAddToCart}>
//           <MaterialIcon name="add-shopping-cart" size={22} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     padding: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 4,
//   },
//   image: {
//     width: '100%',
//     height: 160,
//     borderRadius: 10,
//   },
//   info: {
//     marginTop: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   artist: {
//     fontSize: 14,
//     color: '#777',
//     marginVertical: 4,
//   },
//   price: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '500',
//   },
//   actions: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default ArtworkCard;
