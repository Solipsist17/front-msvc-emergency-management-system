import {useState, useRef, useEffect} from 'react';
import {StyleSheet, Pressable, Text, View, Dimensions, Animated} from 'react-native';
import { Map } from './Map';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { createIncident } from '../services/createIncident'; // Asegúrate de que esta ruta sea correcta

export function ButtonSOS(){
    
  const [pressed, setPressed] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const clickPulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación');
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación obtenida:', location.coords.longitude, location.coords.latitude);
      console.log(typeof location.coords.longitude, typeof location.coords.latitude);
      return location.coords;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      Alert.alert('Error', 'Hubo un problema al obtener la ubicación');
      return null;
    }
  };

  const manejarPresion = async () => {
  const coords = await getLocation();
  if (!coords) return; // si no se obtuvo ubicación, salimos

  const lat = parseFloat(coords.latitude);
  const lng = parseFloat(coords.longitude);
  console.log('Coordenadas:', lng, lat);

  setLocation({ longitude: lng, latitude: lat }); // <-- CORREGIDO
  setPressed(true);

  clickPulseAnim.setValue(1);

  Animated.timing(clickPulseAnim, {
    toValue: 2.5,
    duration: 600,
    useNativeDriver: true,
  }).start(() => {
    clickPulseAnim.setValue(1);
  });

  setShowMap(true);
  createIncident(lng, lat); // <-- suposición de que esta función está definida
};
  return(
            <View style={styles.container}>

              {/* Onda de click - efecto más grande */}
              <Animated.View pointerEvents="none"
                style={[
                  styles.pulse,
                  {
                    transform: [{ scale: clickPulseAnim }],
                    opacity: clickPulseAnim.interpolate({
                      inputRange: [1, 2.5],
                      outputRange: [0.6, 0],
                    }),
                  },
                ]} 
                />

                 {/* Onda pequeña pulsante */}
                 <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.pulse,
                      {
                        transform: [{ scale: pulseAnim }],
                        opacity: 0.3,
                      },
                  ]}
                />

              {/* Botón SOS */}              
              <Pressable onPress={manejarPresion} style={({ pressed: isPressed }) => [
                styles.sosButton,
                { backgroundColor: pressed ? 'red' : 'green' },
                isPressed,]} >

                  <Text style={styles.sosText}>{pressed ? 'Activo' : 'SOS'}</Text>

              </Pressable>
              {/* Muestra el mapa cuando showMap es true */}
                {showMap && (
                  <Map
                  width={Dimensions.get('window').width}
                  height={'210'}
                  longitude={location.longitude}
                  latitude={location.latitude}
                />
                )}
            </View>
    );
};

const BUTTON_SIZE = 140;

const styles = StyleSheet.create({
  container:{
    height: BUTTON_SIZE*3,
      width: BUTTON_SIZE*3, // Asegura que ocupe todo el ancho de la pantalla
      alignItems: "center",
      flex:1,
    },  
  sosButton: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      borderRadius: BUTTON_SIZE/2,
      /* backgroundColor: '#D30000', */
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#D30000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      marginBottom: 30,
  },
  sosText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  pulse: {
    position: 'absolute',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#3498db',
  },
});