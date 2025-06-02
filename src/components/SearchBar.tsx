// components/SearchBar.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
  placeholder: string;
}

const mockSuggestions = [
  'Golden Sunset',
  'Ocean Waves',
  'Hidden Forest',
  'Cosmic Harmony',
  'Modern Dreams',
  'Fantasy Lights',
];

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChangeText = (text: string) => {
    setValue(text);

    // Filter suggestions based on input
    const filtered = mockSuggestions.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(text.length > 0 ? filtered : []);
  };

  const handleSearch = () => {
    if (value.trim()) {
      console.log('Search submitted:', value);
      setSuggestions([]);
      // Navigate or filter content based on `value`
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
    console.log('Suggestion selected:', suggestion);
    // Trigger a search action here if needed
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: '#d2a0ff' }]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          value={value}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={18} color="#555" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSuggestionPress(item)}
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 10,
    fontWeight: '500',
  },
  icon: {
    marginLeft: 10,
  },
  suggestionBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SearchBar;
