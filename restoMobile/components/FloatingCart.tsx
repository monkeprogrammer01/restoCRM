import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCartContext } from '@/contexts/CartContext';

export default function FloatingCart() {
  const { cartItems, getTotal } = useCartContext();
  const router = useRouter();

  // Не показываем если корзина пустая
  if (cartItems.length === 0) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/(tabs)/cart')}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="cart" size={24} color="#FFFFFF" />
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </View>
          <Text style={styles.text}>Корзина</Text>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={styles.price}>{getTotal()}₸</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90, // над таб-баром
    left: 20,
    right: 20,
    backgroundColor: '#EA580C',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#EA580C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});