import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Footer } from '../components/Footer';
import { PoliceFooter } from '../components/PoliceFooter';
import NotificationPush from '../components/NotificationPush';

const incidents = [
  { id: 1, time: '3:15 pm', status: 'pending', description: 'Incidente: Robo', location: 'Urb. La Palma N-12' },
  { id: 2, time: '3:15 pm', status: 'attending', description: 'Incidente: Robo', location: 'Urb. La Palma N-12' },
  { id: 3, time: '3:15 pm', status: 'resolved', description: 'Incidente: Robo', location: 'Urb. La Palma N-12' },
];



export default function PoliceScreen() {
  const navigation = useNavigation();
    const handleIncidentInfo = (incident) => {
      navigation.navigate('IncidentInfo', { status: incident.status });
      console.log('Incident Info:', incidents);
      }
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>SENTRIC</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      {/* Info del agente */}
      <View style={styles.agentBox}>
        <Text style={styles.agentText}>Hola, Agt. Michael</Text>
        <Text style={styles.agentSubtext}>+51 954 701 446</Text>
      </View>

      {/* 
      <View style={styles.statusIndicators}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#2ecc71' }]} />
          <Text>Esperando atención</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#95a5a6' }]} />
          <Text>Está siendo atendido</Text>
        </View>
      </View> */}
        <NotificationPush />

      {/* Footer */}
      <PoliceFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fcf8' },
  header: {
    backgroundColor: '#043927',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  agentBox: {
    backgroundColor: '#004d3c',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  agentText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  agentSubtext: { color: '#fff', fontSize: 14 },
  statusIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  statusItem: { flexDirection: 'row', alignItems: 'center' },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  incidentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  incidentTime: { fontSize: 14, fontWeight: 'bold' },
  incidentDesc: { fontSize: 14, marginTop: 4 },
  incidentLoc: { fontSize: 13, color: '#444' },
  link: { color: '#007bff' },
  cardFooter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  
});