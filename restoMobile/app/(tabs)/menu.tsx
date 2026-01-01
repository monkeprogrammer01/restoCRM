import { View, Text, ScrollView } from 'react-native';

export default function MenuScreen() {
  return (
    <View className="flex-1 bg-gray-50 p-6 pt-16">
      <Text className="text-3xl font-bold text-gray-800 mb-4">Наше Меню</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white p-4 rounded-3xl mb-4 border border-gray-100 shadow-sm">
          <Text className="text-lg font-semibold">🍕 Пицца Маргарита</Text>
          <Text className="text-gray-500">Томаты, моцарелла, базилик</Text>
          <Text className="text-orange-500 font-bold mt-2">550 ₽</Text>
        </View>
      </ScrollView>
    </View>
  );
}