// /screens/AddEditArtworkScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddEditArtworkScreen = ({ route, navigation }) => {
  const { artistId, token, artwork } = route.params || {};
  const [title, setTitle] = useState(artwork?.title || '');
  const [description, setDescription] = useState(artwork?.description || '');

  const handleSave = async () => {
    const payload = { title, description, artist: artistId };

    try {
      if (artwork) {
        await axios.put(`http://localhost:5000/api/artwork/${artwork._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`http://localhost:5000/api/artwork`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        multiline
      />
      <Button title={artwork ? "Update Artwork" : "Add Artwork"} onPress={handleSave} />
    </View>
  );
};

export default AddEditArtworkScreen;
