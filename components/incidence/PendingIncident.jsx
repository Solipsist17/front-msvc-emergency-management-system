import { View, Text, StyleSheet, Button } from 'react-native';
import IncidentMap from '../IncidentMap';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import clientApiGateway from '../../services/clientApiGateway';
import { Alert } from 'react-native';


export default function PendingIncident({  incident }) {
  console.log("PendingIncident", incident);

  const handleAttend = async () => {
    try {
        const userId = await SecureStore.getItemAsync("userId");
        const token = await SecureStore.getItemAsync("token");

        const requestBody = {
          
          incidentId: incident.id,
          userId: parseInt(userId),
          patrolId: null
        };

        const response = await clientApiGateway.post("/api/incident-assignments", requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        Alert.alert("✅ Incidente asignado correctamente");
        console.log("Enviando:", requestBody);
        console.log("Token:", token);
        console.log("Asignación:", response.data);
        // Opcional: redirigir o actualizar estado
        // router.replace("/ruta");
        /* router.back(); // Volver a la pantalla anterior */

    } catch (error) {
        console.error("❌ Error al asignar:", error.response?.data || error.message);
        Alert.alert("Error", "No se pudo asignar el incidente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Incidencia</Text>
      <Text style={styles.statusPending}>PENDIENTE</Text>

      <View style={styles.buttonRow}>
        <Button title="VOLVER" onPress={() => {router.back()}} />
        <Button title="ATENDER" onPress={handleAttend} />
      </View>

      <IncidentMap latitude={incident.latitude} longitude={incident.longitude} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { color: '#fff', fontSize: 18 },
  statusPending: {
    backgroundColor: '#e74c3c',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 10,
    marginVertical: 8
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
