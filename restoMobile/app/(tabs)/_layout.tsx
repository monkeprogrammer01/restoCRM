import { Tabs } from 'expo-router';
import { Home, Utensils, ShoppingBag, User } from 'lucide-react-native';
import { View } from 'react-native';
export default function TabLayout() {
  return (
<Tabs
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
      height: 65,
      borderRadius: 25,
      backgroundColor: '#ffffff',
      borderTopWidth: 0,
      paddingBottom: 0, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    tabBarItemStyle: {
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }}
>
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`p-2 rounded-2xl ${focused ? 'bg-orange-100' : ''}`}>
              <Home size={28} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`p-2 rounded-2xl ${focused ? 'bg-orange-100' : ''}`}>
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
            <View className={`p-2 rounded-2xl ${focused ? 'bg-orange-100' : ''}`}>
              <ShoppingBag size={24} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
    <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`p-2 rounded-2xl ${focused ? 'bg-orange-100' : ''}`}>
              <User size={24} color={focused ? "#f97316" : "#94a3b8"} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}