import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image, 
} from 'react-native';


import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const RegDenPt2Screen = ({ navigation }) => {

  const [agraviadoOption, setAgraviadoOption] = useState('yo'); 
  const [tipoDocumento, setTipoDocumento] = useState(''); 
  const [numDocumento, setNumDocumento] = useState('');
  const [nombreAgraviado, setNombreAgraviado] = useState('');
  const [agraviadosList, setAgraviadosList] = useState([]); 

  const [denunciadoOption, setDenunciadoOption] = useState('desconocido'); 
  const [nombreDenunciado, setNombreDenunciado] = useState('');
  const [denunciadosList, setDenunciadosList] = useState([]); 

  const [lugarIncidente, setLugarIncidente] = useState('');
  const [fechaIncidente, setFechaIncidente] = useState(''); 
  const [horaIncidente, setHoraIncidente] = useState('');   


  const handleAddAgraviado = () => {
    if (nombreAgraviado.trim() !== '') {
      setAgraviadosList([...agraviadosList, { nombre: nombreAgraviado, tipoDoc: tipoDocumento, numDoc: numDocumento }]);
      setNombreAgraviado('');
      setTipoDocumento('');
      setNumDocumento('');
    }
  };

  const handleDeleteAgraviado = (index) => {
    const newList = agraviadosList.filter((_, i) => i !== index);
    setAgraviadosList(newList);
  };

  const handleAddDenunciado = () => {
    if (nombreDenunciado.trim() !== '') {
      setDenunciadosList([...denunciadosList, { nombre: nombreDenunciado }]);
      setNombreDenunciado('');
    }
  };

  const handleDeleteDenunciado = (index) => {
    const newList = denunciadosList.filter((_, i) => i !== index);
    setDenunciadosList(newList);
  };

  const handleSubmit = () => {
    console.log('Datos de la Denuncia Parte 2:');
    console.log('Agraviados:', agraviadosList);
    console.log('Denunciados:', denunciadosList);
    console.log('Lugar del Incidente:', lugarIncidente);
    console.log('Fecha del Incidente:', fechaIncidente);
    console.log('Hora del Incidente:', horaIncidente);
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Header /> 

        <Text style={styles.mainTitle}>Detalles de la Denuncia</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agraviados</Text>
          <View style={styles.radioGroup}>
            <Pressable
              style={styles.radioButton}
              onPress={() => setAgraviadoOption('yo')}
            >
              <View style={styles.radioCircle}>
              {agraviadoOption === 'yo' && <View style={styles.selectedRadioCircle} />}
              </View>
              <Text style={styles.radioText}>Yo</Text>
            </Pressable>
            <Pressable
              style={styles.radioButton}
              onPress={() => setAgraviadoOption('otro')}
            >
              <View style={styles.radioCircle}>
                {agraviadoOption === 'otro' && <View style={styles.selectedRadioCircle} />}
              </View>
              <Text style={styles.radioText}>Otro</Text>
            </Pressable>
          </View>

          {agraviadoOption === 'otro' && (
            <>
              <Text style={styles.label}>Tipo de documento:</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={tipoDocumento}
                  onValueChange={(itemValue) => setTipoDocumento(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccione tipo" value="" />
                  <Picker.Item label="DNI" value="dni" />
                  <Picker.Item label="Pasaporte" value="pasaporte" />
                  <Picker.Item label="Carnet de Extranjería" value="ce" />
                </Picker>
              </View>

              <Text style={styles.label}>N° Documento</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="numeric"
                value={numDocumento}
                onChangeText={setNumDocumento}
              />
            </>
          )}

          <Text style={styles.label}>Nombre de agraviado:</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder={agraviadoOption === 'yo' ? "Tu nombre (automático)" : "Nombre o alias"}
              value={agraviadoOption === 'yo' ? "Bruce Lee" : nombreAgraviado} 
              onChangeText={setNombreAgraviado}
              editable={agraviadoOption === 'otro'} 
            />
            <Pressable style={styles.addButton} onPress={handleAddAgraviado}>
              <Text style={styles.addButtonText}>Agregar</Text>
              <Ionicons name="add" size={20} color="#fff" />
            </Pressable>
          </View>
          {agraviadosList.map((item, index) => (
            <View key={index} style={styles.addedItem}>
              <Text>{item.nombre} ({item.tipoDoc} - {item.numDoc})</Text>
              <Pressable onPress={() => handleDeleteAgraviado(index)}>
                <Ionicons name="trash-outline" size={20} color="#FF6347" />
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Denunciados</Text>
          <View style={styles.radioGroup}>
            <Pressable
              style={styles.radioButton}
              onPress={() => setDenunciadoOption('conocido')}
            >
              <View style={styles.radioCircle}>
                {denunciadoOption === 'conocido' && <View style={styles.selectedRadioCircle} />}
              </View>
              <Text style={styles.radioText}>Conocido</Text>
            </Pressable>
            <Pressable
              style={styles.radioButton}
              onPress={() => setDenunciadoOption('desconocido')}
            >
              <View style={styles.radioCircle}>
                {denunciadoOption === 'desconocido' && <View style={styles.selectedRadioCircle} />}
              </View>
              <Text style={styles.radioText}>Desconocido</Text>
            </Pressable>
          </View>

          {denunciadoOption === 'conocido' && (
            <>
              <View style={styles.inputWithButton}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 10 }]}
                  placeholder="Nombre del denunciado"
                  value={nombreDenunciado}
                  onChangeText={setNombreDenunciado}
                />
                <Pressable style={styles.addButton} onPress={handleAddDenunciado}>
                  <Text style={styles.addButtonText}>Agregar</Text>
                  <Ionicons name="add" size={20} color="#fff" />
                </Pressable>
              </View>
              {denunciadosList.map((item, index) => (
                <View key={index} style={styles.addedItem}>
                  <Text>{item.nombre}</Text>
                  <Pressable onPress={() => handleDeleteDenunciado(index)}>
                    <Ionicons name="trash-outline" size={20} color="#FF6347" />
                  </Pressable>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Dónde y cuándo ocurrió?</Text>

          <Text style={styles.label}>Lugar Incidente:</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección o referencia"
            value={lugarIncidente}
            onChangeText={setLugarIncidente}
          />
          
          <Text style={styles.label}>Fecha:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={fechaIncidente}
            onChangeText={setFechaIncidente}
          />

          <Text style={styles.label}>Hora:</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            keyboardType="numeric"
            value={horaIncidente}
            onChangeText={setHoraIncidente}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </Pressable>

        <View style={{ height: 80 }} />
      </ScrollView>

      <Footer activeTab="inicio" navigation={navigation} /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FFF5', 
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 20, 
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
    marginTop: 10, 
  },
  input: {
    height: 45,
    backgroundColor: '#F6FFF5', 
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F6FFF5',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  picker: {
    height: 45,
    width: '100%',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 20, 
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007A5A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRadioCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007A5A',
  },
  radioText: {
    fontSize: 15,
    color: '#333',
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007A5A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
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
});

export default RegDenPt2Screen;