import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const RegDenPt1Screen = () => {
  const [tipoDenuncia, setTipoDenuncia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [evidencia, setEvidencia] = useState(null);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setEvidencia(result.assets[0]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        <Text style={styles.title}>Presenta tu denuncia</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Tipo:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tipoDenuncia}
              onValueChange={(itemValue) => setTipoDenuncia(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un tipo" value="" />
              <Picker.Item label="Violencia en Hogar" value="hogar" />
              <Picker.Item label="Desorden Público" value="desorden" />
              <Picker.Item label="Maltrato Animal" value="animal" />
              <Picker.Item label="Secuestro" value="secuestro" />
              <Picker.Item label="Robo" value="robo" />
              <Picker.Item label="Espionaje" value="espionaje" />
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Evidencia (foto/audio/video):</Text>
          <Pressable style={styles.uploadButton} onPress={seleccionarImagen}>
            <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
            <Text style={styles.uploadText}>Subir archivo</Text>
          </Pressable>
          {evidencia && (
            <Image source={{ uri: evidencia.uri }} style={styles.preview} />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Datos generales</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Detalla lo que quieres denunciar"
            multiline
            numberOfLines={6}
            maxLength={3000}
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <Text style={styles.charCount}>{descripcion.length}/3000</Text>
        </View>

        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Siguiente</Text>
        </Pressable>
      </ScrollView>
      <Footer activeTab="perfil" /*navigation={navigation}*/ />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FFF5',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: '#000',
  },
  pickerWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    textAlignVertical: 'top',
    padding: 12,
    fontSize: 15,
  },
  charCount: {
    textAlign: 'right',
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#007A5A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#007A5A',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '500',
  },
  preview: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default RegDenPt1Screen;
