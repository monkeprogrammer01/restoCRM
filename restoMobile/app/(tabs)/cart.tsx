import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

interface CartItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  iconLib: string;
  quantity: number;
  description: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Стейк Рибай',
      price: 4500,
      icon: 'food-steak',
      iconLib: 'MaterialCommunityIcons',
      quantity: 1,
      description: 'Сочный стейк из мраморной говядины'
    },
    {
      id: 2,
      name: 'Паста Карбонара',
      price: 2800,
      icon: 'pasta',
      iconLib: 'MaterialCommunityIcons',
      quantity: 2,
      description: 'Классическая итальянская паста'
    },
    {
      id: 3,
      name: 'Капучино',
      price: 800,
      icon: 'coffee',
      iconLib: 'FontAwesome5',
      quantity: 1,
      description: 'Ароматный итальянский кофе'
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const deliveryFee = 500;

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

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    Alert.alert(
      'Удалить товар',
      'Вы уверены, что хотите удалить этот товар из корзины?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => setCartItems(prevItems => prevItems.filter(item => item.id !== id))
        }
      ]
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    Alert.alert(
      'Оформление заказа',
      `Итого к оплате: ${total}₸`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBEB" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Корзина</Text>
        <Text style={styles.headerSubtitle}>{cartItems.length} товаров</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          // Empty Cart
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cart-off" size={100} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>Корзина пуста</Text>
            <Text style={styles.emptySubtitle}>Добавьте блюда из меню</Text>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemImageContainer}>
                    {renderIcon(item.iconLib, item.icon, 40, '#EA580C')}
                  </View>

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>{item.price}₸</Text>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Ionicons name="remove" size={18} color="#6B7280" />
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Ionicons name="add" size={18} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Promo Code */}
            <View style={styles.promoContainer}>
              <View style={styles.promoInputContainer}>
                <Ionicons name="pricetag-outline" size={20} color="#6B7280" />
                <Text style={styles.promoPlaceholder}>Промокод</Text>
              </View>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Применить</Text>
              </TouchableOpacity>
            </View>

            {/* Delivery Info */}
            <View style={styles.deliveryContainer}>
              <View style={styles.deliveryHeader}>
                <Ionicons name="bicycle" size={24} color="#EA580C" />
                <Text style={styles.deliveryTitle}>Доставка</Text>
              </View>
              <Text style={styles.deliveryText}>г. Алматы, ул. Достык 123</Text>
              <TouchableOpacity>
                <Text style={styles.changeAddressText}>Изменить адрес</Text>
              </TouchableOpacity>
            </View>

            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Детали заказа</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Сумма</Text>
                <Text style={styles.summaryValue}>{subtotal}₸</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Доставка</Text>
                <Text style={styles.summaryValue}>{deliveryFee}₸</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Итого</Text>
                <Text style={styles.summaryTotalValue}>{total}₸</Text>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentTitle}>Способ оплаты</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity style={[styles.paymentMethod, styles.paymentMethodActive]}>
                  <Ionicons name="card" size={24} color="#EA580C" />
                  <Text style={[styles.paymentMethodText, styles.paymentMethodTextActive]}>
                    Карта
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Ionicons name="cash" size={24} color="#6B7280" />
                  <Text style={styles.paymentMethodText}>Наличные</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
            <Text style={styles.checkoutButtonPrice}>{total}₸</Text>
          </TouchableOpacity>
        </View>
      )}
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
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  itemsContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FED7AA',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
    marginTop: 4,
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  removeButton: {
    padding: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  promoContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
  },
  promoInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  promoPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
  },
  promoButton: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  deliveryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  deliveryText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  changeAddressText: {
    fontSize: 14,
    color: '#EA580C',
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  paymentContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 100,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentMethodActive: {
    backgroundColor: '#FED7AA',
    borderColor: '#EA580C',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  paymentMethodTextActive: {
    color: '#EA580C',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 90,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  checkoutButton: {
    backgroundColor: '#EA580C',
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButtonPrice: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});