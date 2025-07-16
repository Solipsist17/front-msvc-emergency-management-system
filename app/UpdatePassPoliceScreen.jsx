import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';

 function UpdatePassPolice () {
  const [mostrarActual, setMostrarActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  

  return (
    <View style={styles.container}>
      <Link href="/PoliceInfoScreen" asChild>
          <Pressable style={styles.backButton} >
                <Icon name="arrow-back" size={24} color="#fff" />
          </Pressable>
      </Link>

      <View style={styles.content}>
        <Image
          source={require('../assets/images/xinojeta.jpg')} // Reemplaza con la imagen real
          style={styles.profileImage}
        />
        <Text style={styles.nombre}>Pablo Lujan Carrion</Text>

        <Text style={styles.label}>Contraseña actual</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!mostrarActual}
            placeholder="Contraseña"
          />
          <TouchableOpacity onPress={() => setMostrarActual(!mostrarActual)}>
            <Icon
              name={mostrarActual ? 'eye-off' : 'eye'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.label}>Actualizar contraseña</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!mostrarNueva}
            placeholder="Nueva Contraseña"
          />
          <TouchableOpacity onPress={() => setMostrarNueva(!mostrarNueva)}>
            <Icon
              name={mostrarNueva ? 'eye-off' : 'eye'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!mostrarConfirmacion}
            placeholder="Confirmar Contraseña"
          />
          <TouchableOpacity
            onPress={() => setMostrarConfirmacion(!mostrarConfirmacion)}
          >
            <Icon
              name={mostrarConfirmacion ? 'eye-off' : 'eye'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botonActualizar}>
          <Text style={styles.textoBoton}>Actualizar</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 45,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 20,
  },
  botonActualizar: {
    backgroundColor: '#147e6d',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UpdatePassPolice;