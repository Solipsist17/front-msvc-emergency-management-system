import { StyleSheet } from "react-native"
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import { Link } from 'expo-router';
import { registerService } from "../services/registerService";


export function RegisterForm() {
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

  const handleRegister = async() => {
    
    
      console.log('DNI:', dni);
      console.log('Email:', email); 
      console.log('Phone:', phone);
      console.log('Password:', password);
      try{
        const user = await registerService(dni, email, phone, password);
        Alert.alert('Registro exitoso');
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        Alert.alert('Error', 'No se pudo registrar el usuario. Inténtalo de nuevo más tarde.');
      }
  };
        return (
        <View style={styles.formContainer}>
                <TextInput
                placeholder="DNI"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                maxLength={8}
                style={styles.input}
                value={dni}
                onChangeText={setDni}
                />
                
                <TextInput
                placeholder="Correo Electrónico"
                placeholderTextColor="#ccc"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                />
                
                <TextInput
                placeholder="Número de Teléfono"
                placeholderTextColor="#ccc"
                style={styles.input}
                keyboardType="numeric"
                value={phone}
                onChangeText={setPhone}
                />
                
                <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    style={styles.inputPassword}
                    value={password}
                    onChangeText={setPassword}
                />

                <MaterialCommunityIcons name="eye-off" size={20} color="#ccc" />
                </View>
    
                <Pressable style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Regístrate</Text>
                </Pressable>

                <Link href="/" asChild>
                <Pressable>
                <Text style={styles.linkText}>¿Ya tienes cuenta?</Text>
                </Pressable>
                </Link>
            </View>
        )
        }

const styles = StyleSheet.create({
    formContainer: {
    width: '80%',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#1A2B24',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2B24',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#007F5F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#D3FF57',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: {
  color: 'red',
  fontSize: 12,
  marginBottom: 4,
  marginLeft: 4,
}
});