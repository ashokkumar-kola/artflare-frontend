import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

import { api } from '../../api/apiClient';

const AddEditArtworkScreen = ({ navigation, route }: any) => {
  const { artistId, token, artwork } = route.params || {};

  // Set initial states
  const [title, setTitle] = useState(artwork?.art_name || '');
  const [description, setDescription] = useState(artwork?.description || '');
  const [pricing, setPricing] = useState(String(artwork?.pricing || ''));
  const [quantity, setQuantity] = useState(String(artwork?.quantity || ''));
  const [categoryId, setCategoryId] = useState(String(artwork?.category_id || ''));

const handleSave = async () => {
    if (!title || !description || !pricing || !quantity || !categoryId) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }
    console.log('handleSave called with:', {
      title,
      description,
      pricing,
      quantity,
      categoryId,
      artistId,
    });

    // const payload = {
    //   art_name: title,
    //   description,
    //   pricing: parseFloat(pricing),
    //   quantity: parseInt(quantity),
    //   category_id: parseInt(categoryId),
    //   artist_id: artistId,
    // };

    try {
      const apiUrl = `http://192.168.29.20:3000/api/artwork`;
      console.log('artwork', artwork);

      // if (artwork) {
      //   await api.put(`//${artwork._id}`, payload, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      // } else {
      //   await axios.post(apiUrl, payload, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      // }

      // navigation.goBack();
    } catch (error) {
      console.error('Error saving artwork:', error);
      Alert.alert('Error', 'Could not save artwork. Check console for details.');
    }
};

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} multiline />
      <TextInput placeholder="Pricing" value={pricing} onChangeText={setPricing} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Category ID" value={categoryId} onChangeText={setCategoryId} keyboardType="numeric" style={styles.input} />

      <Button title={artwork ? "Update Artwork" : "Add Artwork"} onPress={handleSave} />
    </View>
  );
};

export default AddEditArtworkScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
});
