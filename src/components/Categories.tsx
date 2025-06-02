import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Categories: undefined;
  Artworks: { category: string };
};

interface CategoriesProps {
  categories: string[];
  onSeeAll?: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, onSeeAll }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSeeAllPress = () => {
    if (onSeeAll) {
      onSeeAll();
    } else {
      navigation.navigate('Categories');
    }
  };

  const handleCategoryPress = (category: string) => {
    navigation.navigate('Artworks', { category });
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={`${category}-${index}`} // Better key generation
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#6a0dad', // More visible color
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingVertical: 5, // Better spacing
  },
  categoryItem: {
    backgroundColor: '#e6d4ff', // Lighter purple
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  categoryText: {
    fontSize: 14,
    color: '#5d00a3', // Darker purple for contrast
    fontWeight: '500',
  },
});

export default Categories;
