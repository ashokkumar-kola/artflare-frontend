import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Orders = ({ route }) => {
  const navigation = useNavigation();

  // Optional: If you're receiving artistId and token from previous screen
  const artistId = route?.params?.artistId || 'sampleArtistId';
  const token = route?.params?.token || 'sampleToken';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧾 Orders</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ArtistDashboard', { artistId, token })}
      >
        <Text style={styles.buttonText}>Go to Artist Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
