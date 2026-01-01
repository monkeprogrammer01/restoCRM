import { Tabs } from 'expo-router';
import { Home, Utensils, ShoppingBag, User } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginLeft: '1%',
          maxHeight: 100,
          maxWidth: '98%',
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 25,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          paddingBottom: 10,
          paddingTop: 15,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Home size={26} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Utensils size={24} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: '#f97316' },
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <ShoppingBag size={24} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <User size={24} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 16,
  },
  iconContainerFocused: {
    backgroundColor: '#fed7aa',
  },
});