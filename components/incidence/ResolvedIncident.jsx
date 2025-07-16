import { View, Text, Button, TextInput, StyleSheet } from 'react-native';  
import IncidentMap from '../IncidentMap';


export default function InProcessIncident({ incident }) {
  return (
   <View style={styles.container}>
      <Text style={styles.header}>INCIDENTE N° {incident.id}</Text>
      <Text style={styles.status}>RESUELTO</Text>

      <IncidentMap latitude={incident.latitude} longitude={incident.longitude} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    backgroundColor: '#fdf0f0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    padding: 8,
  },
  status: {
    backgroundColor: '#2ecc71',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
});