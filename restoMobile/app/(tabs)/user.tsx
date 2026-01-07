import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  Switch,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function UserProfile() {
  const {user, logout} = useAuth();
  const {profile, loading, fetchProfile} = useUser();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [])

  const handleLogout = async () => {
    console.log("logout")
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: async () => {
          try {
            await logout();
            router.replace("/(auth)/login")
          } catch (error) {
            console.log("logout error:", error)
          }
        } }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#EA580C" />
        </View>
      </SafeAreaView>
    );
  }

  const displayUser = profile || user

  const menuSections = [
    {
      title: 'Аккаунт',
      items: [
        { icon: 'person-outline', iconLib: 'Ionicons', label: 'Редактировать профиль', color: '#EA580C' },
        { icon: 'location-outline', iconLib: 'Ionicons', label: 'Адреса доставки', color: '#3B82F6' },
        { icon: 'card-outline', iconLib: 'Ionicons', label: 'Способы оплаты', color: '#10B981' },
      ]
    },
    {
      title: 'Заказы',
      items: [
        { icon: 'receipt-outline', iconLib: 'Ionicons', label: 'История заказов', color: '#8B5CF6' },
        { icon: 'heart-outline', iconLib: 'Ionicons', label: 'Избранное', color: '#EF4444' },
        { icon: 'star-outline', iconLib: 'Ionicons', label: 'Мои отзывы', color: '#F59E0B' },
      ]
    },
    {
      title: 'Настройки',
      items: [
        { icon: 'notifications-outline', iconLib: 'Ionicons', label: 'Уведомления', color: '#6366F1', switch: true },
        { icon: 'moon-outline', iconLib: 'Ionicons', label: 'Темная тема', color: '#1F2937', switch: true },
        { icon: 'language-outline', iconLib: 'Ionicons', label: 'Язык', color: '#059669', badge: 'Русский' },
      ]
    },
    {
      title: 'Поддержка',
      items: [
        { icon: 'help-circle-outline', iconLib: 'Ionicons', label: 'Помощь', color: '#06B6D4' },
        { icon: 'chatbubble-outline', iconLib: 'Ionicons', label: 'Связаться с нами', color: '#8B5CF6' },
        { icon: 'information-circle-outline', iconLib: 'Ionicons', label: 'О приложении', color: '#64748B' },
      ]
    }
  ];

  const stats = [
    { label: 'Заказов', value: '24', icon: 'receipt', iconLib: 'Ionicons' },
    { label: 'Отзывов', value: '18', icon: 'star', iconLib: 'Ionicons' },
    { label: 'Баллов', value: '1250', icon: 'trophy', iconLib: 'Ionicons' },
  ];

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
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#EA580C" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{displayUser?.fullName || "Name"}</Text>
          <Text style={styles.userPhone}>{displayUser?.phoneNumber || "Phone number"}</Text>

          <View style={styles.membershipBadge}>
            <Ionicons name="diamond" size={16} color="#F59E0B" />
            <Text style={styles.membershipText}>Gold Member</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${stat.value === '24' ? '#FED7AA' : stat.value === '18' ? '#FEF3C7' : '#DBEAFE'}` }]}>
                {renderIcon(stat.iconLib, stat.icon, 24, stat.value === '24' ? '#EA580C' : stat.value === '18' ? '#F59E0B' : '#3B82F6')}
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex !== section.items.length - 1 && styles.menuItemBorder
                  ]}
                  activeOpacity={item.switch ? 1 : 0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                      {renderIcon(item.iconLib, item.icon, 22, item.color)}
                    </View>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                  </View>

                  <View style={styles.menuItemRight}>
                    {item.switch ? (
                      <Switch
                        value={item.label === 'Уведомления' ? notificationsEnabled : darkModeEnabled}
                        onValueChange={(value) => {
                          if (item.label === 'Уведомления') {
                            setNotificationsEnabled(value);
                          } else {
                            setDarkModeEnabled(value);
                          }
                        }}
                        trackColor={{ false: '#D1D5DB', true: '#FED7AA' }}
                        thumbColor={item.label === 'Уведомления' ? (notificationsEnabled ? '#EA580C' : '#F3F4F6') : (darkModeEnabled ? '#EA580C' : '#F3F4F6')}
                      />
                    ) : item.badge ? (
                      <>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                      </>
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View style={styles.promoIcon}>
              <Ionicons name="gift" size={32} color="#EA580C" />
            </View>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Пригласи друга</Text>
              <Text style={styles.promoSubtitle}>Получите 1000₸ на счет</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Пригласить</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>

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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  membershipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
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
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  promoBanner: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  promoIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  promoButton: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  bottomSpace: {
    height: 100,
  },
});