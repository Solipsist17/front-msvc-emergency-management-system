import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Shield } from '../components/Shield';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterScreen() {
  const navigation = useNavigation();
  
  const handleRegister = () => {
      navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <Shield />
      <Text style={styles.comisariaText}>COMISARÍA LA PALMA</Text>
      <RegisterForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1E15',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  callText: {
    color: '#9FFFCB',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  comisariaText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 14,
  },
  
});
export default RegisterScreen;

