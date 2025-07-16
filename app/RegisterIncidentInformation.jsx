import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure you have this package installed
import { router } from 'expo-router';

export default function RegisterIncidentInformation({incident}) {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');

  console.log('Incident:', incident); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario</Text>

      <View style={styles.incidentHeader}>
        <Text style={styles.incidentText}>INCIDENTE {} </Text>
      </View>

      <View style={styles.dropdownContainer}>
        {Platform.OS === 'ios' ? (
          // iOS-specific Picker styling could go here
          <Picker
            selectedValue={incidentType}
            style={styles.picker}
            onValueChange={(itemValue) => setIncidentType(itemValue)}
          >
            <Picker.Item label="Tipo de incidente" value="" />
            <Picker.Item label="Robo" value="robo" />
            <Picker.Item label="Accidente" value="accidente" />
          </Picker>
        ) : (
          <Picker
            selectedValue={incidentType}
            style={styles.picker}
            onValueChange={(itemValue) => setIncidentType(itemValue)}
          >
            <Picker.Item label="Tipo de incidente" value="" />
            <Picker.Item label="Robo" value="robo" />
            <Picker.Item label="Accidente" value="accidente" />
          </Picker>
        )}
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="Descripcion del incidente"
        placeholderTextColor="#999"
        multiline
        numberOfLines={6}
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={styles.button} onPress={() => {router.back()}}>
        <Text style={styles.buttonText}>ACEPTAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c1f1a',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  incidentHeader: {
    backgroundColor: '#f6eded',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  incidentText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#3e3e3e',
  },
  dropdownContainer: {
    backgroundColor: '#f6eded',
    borderRadius: 4,
    marginBottom: 20,
  },
  picker: {
    height: 40,
    color: '#000',
  },
  textArea: {
    backgroundColor: '#f6eded',
    color: '#000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f6eded',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#333',
  },
});
