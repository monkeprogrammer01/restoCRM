import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { Dish } from '@/types/menu.types';
import { useMenu } from '@/hooks/useMenu';
export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const {fetchDishes, dishes, loading} = useMenu();
  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = activeCategory === 'Все' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    fetchDishes();
}, [fetchDishes]);
  const categories = [
    { id: '1', name: 'Все', icon: 'apps', iconLib: 'Ionicons' },
    { id: '2', name: 'Горячее', icon: 'food-drumstick', iconLib: 'MaterialCommunityIcons' },
    { id: '3', name: 'Салаты', icon: 'leaf', iconLib: 'Ionicons' },
    { id: '4', name: 'Десерты', icon: 'ice-cream', iconLib: 'Ionicons' },
    { id: '5', name: 'Напитки', icon: 'cup', iconLib: 'MaterialCommunityIcons' },
  ];

  const popularDishes = dishes.filter(dish => dish.popular);

  const renderIcon = (iconLib: string, iconName: string, size: number, color: string) => {
    switch(iconLib) {
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBEB" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Меню</Text>
            <Text style={styles.headerSubtitle}>{filteredDishes.length} блюд</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color="#EA580C" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск блюд..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setActiveCategory(category.name)}
              style={[
                styles.categoryButton,
                activeCategory === category.name && styles.categoryButtonActive
              ]}
            >
              <View style={[
                styles.categoryIconContainer,
                activeCategory === category.name && styles.categoryIconContainerActive
              ]}>
                {renderIcon(
                  category.iconLib,
                  category.icon,
                  20,
                  activeCategory === category.name ? '#EA580C' : '#6B7280'
                )}
              </View>
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category.name && styles.categoryTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Dishes */}
        {activeCategory === 'Все' && searchQuery === '' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Популярные блюда</Text>
              <Ionicons name="flame" size={24} color="#EA580C" />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularContent}
            >
              {popularDishes.map((dish) => (
                <TouchableOpacity
                  key={dish.id}
                  style={styles.popularCard}
                  activeOpacity={0.8}
                >
                  <View style={styles.popularImageContainer}>
                    {renderIcon(dish.iconLib, dish.icon, 40, '#EA580C')}
                  </View>
                  <View style={styles.popularInfo}>
                    <Text style={styles.popularName} numberOfLines={1}>
                      {dish.name}
                    </Text>
                    <View style={styles.popularRating}>
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text style={styles.popularRatingText}>{dish.rating}</Text>
                    </View>
                    <Text style={styles.popularPrice}>{dish.price}₸</Text>
                  </View>
                  <TouchableOpacity style={styles.popularAddButton}>
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Dishes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'Все' ? 'Все блюда' : activeCategory}
          </Text>
          <View style={styles.dishesGrid}>
            {filteredDishes.map((dish) => (
              <TouchableOpacity
                key={dish.id}
                style={styles.dishCard}
                activeOpacity={0.8}
              >
            <Image 
              source={{ uri: dish.image }} 
              style={styles.dishImageContainer} 
              resizeMode="cover"
            />

                <View style={styles.dishInfo}>
                  <Text style={styles.dishName} numberOfLines={1}>
                    {dish.name}
                  </Text>
                  <Text style={styles.dishDescription} numberOfLines={2}>
                    {dish.description}
                  </Text>

                  <View style={styles.dishMeta}>
                    <View style={styles.dishMetaItem}>
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text style={styles.dishMetaText}>{dish.prepTime}</Text>
                    </View>
                    <View style={styles.dishMetaItem}>
                      <Ionicons name="flame-outline" size={14} color="#6B7280" />
                      <Text style={styles.dishMetaText}>{dish.calories} ккал</Text>
                    </View>
                  </View>

                  <View style={styles.dishFooter}>
                    <View style={styles.dishRating}>
                      <Ionicons name="star" size={16} color="#F59E0B" />
                      <Text style={styles.dishRatingText}>{dish.rating}</Text>
                    </View>
                    <Text style={styles.dishPrice}>{dish.price}₸</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.dishAddButton}>
                  <Ionicons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FED7AA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryButton: {
    alignItems: 'center',
    gap: 8,
  },
  categoryButtonActive: {},
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconContainerActive: {
    backgroundColor: '#FED7AA',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#EA580C',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  popularContent: {
    gap: 16,
  },
  popularCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  popularImageContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#FED7AA',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  popularInfo: {
    gap: 4,
  },
  popularName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  popularRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  popularPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
    marginTop: 4,
  },
  popularAddButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: '#EA580C',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishesGrid: {
    gap: 16,
  },
  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dishImageContainer: {
    width: 90,
    height: 90,
    backgroundColor: '#FED7AA',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: '#EA580C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  dishDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  dishMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  dishMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dishMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  dishFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dishRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dishRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  dishAddButton: {
    width: 40,
    height: 40,
    backgroundColor: '#EA580C',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  bottomSpace: {
    height: 100,
  },
});