import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import IncidentMap from '../IncidentMap';
import { router } from 'expo-router';

export default function InProcessIncident({ incident }) {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>ATENDIDO</Text>
      <Button title="REGISTRAR INFORMACION" onPress={() => router.push('RegisterIncidentInformation', { incident:incident })} />
      <Button title="VOLVER" onPress={() => {router.back()}} disabled={false} />

      <IncidentMap latitude={incident.latitude} longitude={incident.longitude} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  status: {
    backgroundColor: '#f1c40f',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
});