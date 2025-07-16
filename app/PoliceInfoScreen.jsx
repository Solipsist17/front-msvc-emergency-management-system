import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { PoliceFooter } from '../components/PoliceFooter';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const PoliceInfoScreen = () => {
      const [patrulla, setPatrulla] = useState('');
      const navigation = useNavigation();
      
  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={ require('../assets/images/original.jpg') } // Reemplazar con URI real o ruta local
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <Icon name="camera" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Pablo Lujan Carrion</Text>

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Icon name="call" size={20} />
            <Text style={styles.contactText}>+51 974 612 842</Text>
          </View>
          <View style={styles.contactRow}>
            <Icon name="mail" size={20} />
            <Text style={styles.contactText}>correogenerico@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="pencil" size={20} />
          </TouchableOpacity>
        </View>

        <Link href="/" asChild>
            <Pressable style={styles.passwordButton}>
                  <Text style={styles.passwordButtonText}>Cerrar Sesion</Text>
            </Pressable>
        </Link>

        <Link href="/UpdatePassPoliceScreen" asChild>
            <Pressable style={styles.passwordButton} >
                  <Text style={styles.passwordButtonText}>Actualizar contraseña</Text>
            </Pressable>
        </Link>
        
        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>Seleccionar patrulla</Text>
          <Picker
            selectedValue={patrulla}
            onValueChange={(itemValue) => setPatrulla(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Patrulla 1" value="patrulla1" />
            <Picker.Item label="Patrulla 2" value="patrulla2" />
          </Picker>
        </View>
      </View>
      <PoliceFooter />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff0',
    paddingTop: 40,
  },
  backButton: {
    backgroundColor: '#1d4d4f',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ccc',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    elevation: 3,
    position: 'relative',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  passwordButton: {
    marginTop: 20,
    backgroundColor: '#147e6d',
    padding: 12,
    borderRadius: 8,
  },
  passwordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 30,
    width: '100%',
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default PoliceInfoScreen;