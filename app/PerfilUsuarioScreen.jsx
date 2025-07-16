import  {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import { Link } from 'expo-router';
import { getUserData } from '../services/getUserData';

const PerfilUsuarioScreen = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await getUserData();
        setProfile(userData);
        console.log("Perfil cargado:", userData);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
        
        {/* Header */}
        <Header />

        {/* Foto y Nombre */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: 'https://pbs.twimg.com/media/Gb-gSVZWMAA4p-C.jpg' }} 
              style={styles.profileImage}
            />
            <Pressable style={styles.iconOverlay}>
              <Ionicons name="camera-reverse" size={30} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.userName}>Estheban Marín</Text>
        </View>
        <View style={{alignItems: "center",
            height: 60, // Ajusta la altura según sea necesario
            width: "100%",}}>
              <Link href="/" asChild>
                <Pressable style={styles.logoutButton}>
                    <Text style={styles.updateButtonText}>Cerrar Sesion</Text>
                </Pressable>
              </Link>
        </View>
        {/* Información de contacto */}
        <View style={styles.contactCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Información del Contacto</Text>
            <Feather name="edit-2" size={16} color="#333" />
          </View>
          <View style={styles.cardRow}>
            <Feather name="phone" size={16} color="#333" />
            <Text style={styles.cardText}>+51 987 654 321</Text>
          </View>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="email-outline" size={16} color="#333" />
            <Text style={styles.cardText}>contacto1@gmail.com</Text>
          </View>
        </View>

        {/* Actualizar contraseña */}
        <View style={{
          alignItems: "center",
          height: 200, // Ajusta la altura según sea necesario
        width: "100%",}}>
        <Text style={styles.sectionTitle}>Actualizar contraseña</Text>
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Nueva Contraseña"
              secureTextEntry={true}
              style={styles.input}
            />
            <Ionicons name="eye-off" size={18} color="#555" />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirmar Contraseña"
              secureTextEntry={true}
              style={styles.input}
            />
            <Ionicons name="eye-off" size={18} color="#555" />
          </View>
        </View>
        <Pressable style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </Pressable>
        
        </View>
            

        
        <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f2',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 30,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#116D2D',
    padding: 6,
    borderRadius: 20,
  },
  userName: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  cardText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
    width: '100%',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 13,
  },
  updateButton: {
    backgroundColor: '#116D2D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom:10,
  },
  logoutButton: {
    backgroundColor: '#116D2D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '40%',
  },
  
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PerfilUsuarioScreen;