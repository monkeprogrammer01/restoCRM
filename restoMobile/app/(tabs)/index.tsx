import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

function RestaurantHome() {
  const [activeCategory, setActiveCategory] = useState('Все');

  const categories = ['Все', 'Горячие блюда', 'Салаты', 'Десерты', 'Напитки'];

  const dishes = [
    {
      id: 1,
      name: 'Стейк Рибай',
      price: '4500₸',
      icon: 'food-steak',
      iconLib: 'MaterialCommunityIcons',
      category: 'Горячие блюда',
      rating: 4.9,
      description: 'Сочный стейк из мраморной говядины'
    },
    {
      id: 2,
      name: 'Паста Карбонара',
      price: '2800₸',
      icon: 'pasta',
      iconLib: 'MaterialCommunityIcons',
      category: 'Горячие блюда',
      rating: 4.7,
      description: 'Классическая итальянская паста'
    },
    {
      id: 3,
      name: 'Цезарь с курицей',
      price: '2200₸',
      icon: 'salad',
      iconLib: 'FontAwesome5',
      category: 'Салаты',
      rating: 4.6,
      description: 'Свежий салат с пармезаном'
    },
    {
      id: 4,
      name: 'Тирамису',
      price: '1500₸',
      icon: 'cake-variant',
      iconLib: 'MaterialCommunityIcons',
      category: 'Десерты',
      rating: 4.8,
      description: 'Нежный итальянский десерт'
    },
    {
      id: 5,
      name: 'Лосось гриль',
      price: '3900₸',
      icon: 'fish',
      iconLib: 'FontAwesome5',
      category: 'Горячие блюда',
      rating: 4.9,
      description: 'Филе лосося на гриле'
    },
    {
      id: 6,
      name: 'Капучино',
      price: '800₸',
      icon: 'coffee',
      iconLib: 'FontAwesome5',
      category: 'Напитки',
      rating: 4.5,
      description: 'Ароматный итальянский кофе'
    },
  ];

  const filteredDishes = activeCategory === 'Все'
    ? dishes
    : dishes.filter(dish => dish.category === activeCategory);

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
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Добро пожаловать в</Text>
              <Text style={styles.logoText}>Nvision</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <FontAwesome5 name="user-chef" size={20} color="#EA580C" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Поиск блюд...</Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Скидка 20%</Text>
              <Text style={styles.bannerSubtitle}>На все блюда из рыбы</Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Заказать</Text>
              </TouchableOpacity>
            </View>
            <MaterialCommunityIcons name="silverware-fork-knife" size={80} color="#FFFFFF" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="star" size={32} color="#F59E0B" />
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Рейтинг</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="food-fork-drink" size={32} color="#EA580C" />
            <Text style={styles.statValue}>50+</Text>
            <Text style={styles.statLabel}>Блюд</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color="#10B981" />
            <Text style={styles.statValue}>15-20</Text>
            <Text style={styles.statLabel}>мин</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryButton,
                  activeCategory === category && styles.categoryButtonActive
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Популярные блюда</Text>
          {filteredDishes.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              style={styles.dishCard}
              activeOpacity={0.8}
            >
              <View style={styles.dishImageContainer}>
                {renderIcon(dish.iconLib, dish.icon, 48, '#EA580C')}
              </View>
              
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishDescription}>{dish.description}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>{dish.rating}</Text>
                </View>
              </View>
              
              <View style={styles.dishActions}>
                <Text style={styles.dishPrice}>{dish.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerTitle}>Контакты</Text>
          <View style={styles.contactItem}>
            <Ionicons name="location" size={24} color="#EA580C" style={styles.contactIconStyle} />
            <Text style={styles.contactText}>г. Алматы, ул. Достык 123</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={24} color="#EA580C" style={styles.contactIconStyle} />
            <Text style={styles.contactText}>+7 (777) 123-45-67</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="time" size={24} color="#EA580C" style={styles.contactIconStyle} />
            <Text style={styles.contactText}>Пн-Вс: 10:00 - 23:00</Text>
          </View>
        </View>

        {/* Reserve Button */}
        <View style={styles.reserveSection}>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Забронировать стол</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FED7AA',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#9CA3AF',
  },
  heroBanner: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#EA580C',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#EA580C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoriesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  categoryButtonActive: {
    backgroundColor: '#EA580C',
  },
  categoryText: {
    fontWeight: '600',
    color: '#374151',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dishImageContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#FED7AA',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dishEmoji: {
    fontSize: 48,
  },
  dishInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  dishActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#EA580C',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerInfo: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIconStyle: {
    marginRight: 12,
    width: 32,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  reserveSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  reserveButton: {
    backgroundColor: '#EA580C',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RestaurantHome;