import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';


export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // ✅ исправлено название
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  const { login, register, loading } = useAuth(); // ✅ взяли loading из hook
  const router = useRouter();

  const handleSubmit = async () => {
    // Валидация
    if (!phoneNumber || !password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    if (!isLogin && !fullName) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    try {
      if (isLogin) {
        // Логин
        await login(phoneNumber, password);
        Alert.alert('Успешно', 'Вы успешно вошли!');
        router.replace('/(tabs)'); // переход на главную
      } else {
        // Регистрация
        await register({
          fullName: fullName,
          phoneNumber: phoneNumber,
          password: password
        });
        Alert.alert('Успешно', 'Регистрация завершена!');
        router.replace('/(tabs)'); // переход на главную
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Что-то пошло не так';
      Alert.alert('Ошибка', message);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google вход', 'Функция в разработке');
  };

  const handleAppleLogin = () => {
    Alert.alert('Apple вход', 'Функция в разработке');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBEB" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo & Welcome */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={60} color="#EA580C" />
            </View>
            <Text style={styles.logoText}>Delicioso</Text>
            <Text style={styles.welcomeText}>
              {isLogin ? 'Добро пожаловать!' : 'Создайте аккаунт'}
            </Text>
            <Text style={styles.subtitleText}>
              {isLogin 
                ? 'Войдите, чтобы продолжить' 
                : 'Зарегистрируйтесь для заказа'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name - только для регистрации */}
            {!isLogin && (
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Полное имя"
                  placeholderTextColor="#9CA3AF"
                  value={fullName} // ✅ исправлено
                  onChangeText={setFullName} // ✅ исправлено
                  autoCapitalize="words"
                />
              </View>
            )}

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Ionicons name="call-outline" size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="+7 (777) 123-45-67"
                placeholderTextColor="#9CA3AF"
                value={phoneNumber} // ✅ правильное имя
                onChangeText={setPhoneNumber} // ✅
                keyboardType="phone-pad"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password - только для входа */}
            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Забыли пароль?</Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>или</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
              >
                <Ionicons name="logo-google" size={24} color="#EA4335" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleAppleLogin}
              >
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Facebook', 'Функция в разработке')}
              >
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
            </View>

            {/* Toggle Login/Register */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleLink}>
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Guest Mode */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => {
              Alert.alert('Гостевой режим', 'Продолжить без регистрации');
              router.replace('/(tabs)');
            }}
          >
            <Text style={styles.guestButtonText}>Продолжить как гость</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FED7AA',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#EA580C',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  toggleText: {
    fontSize: 14,
    color: '#6B7280',
  },
  toggleLink: {
    fontSize: 14,
    color: '#EA580C',
    fontWeight: 'bold',
  },
  guestButton: {
    marginTop: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
});