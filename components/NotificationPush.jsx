import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import clientApiGateway from '../services/clientApiGateway';
import { connectWebSocket, disconnectWebSocket } from '../services/clientWebSocket';
import { router } from 'expo-router';

export default function NotificationPush () {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    try {
      const response = await clientApiGateway.get('/api/incidents');
      setIncidents(response.data.content);
    } catch (error) {
      console.error('Error al obtener incidentes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents(); // primera carga

    // Conectar WebSocket y recibir nuevos incidentes
    connectWebSocket((newIncident) => {
      console.log('📡 Incidente en tiempo real:', newIncident);
      setIncidents(prev => [newIncident, ...prev]);
    });

    return () => disconnectWebSocket();
  }, []);

  const statusColors = {
  pending: '#e74c3c',     // rojo
  in_process: '#f39c12',   // naranja
  resolved: '#2ecc71',    // verde
};

  const handleIncidentInfo = (incident) => {
    router.push({ pathname: "/IncidentInfoScreen", params: { id: incident.id } });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>Incidentes de hoy</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : incidents.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
          No hay incidentes registrados.
        </Text>
      ) : incidents.map((incident) => (
          <Pressable
              key={incident.id}
              style={styles.incidentCard}
              onPress={() => handleIncidentInfo(incident)}
          >
          <View style={styles.cardHeader}>
              <Text style={styles.incidentType}>
                  {incident.type ? `🚨 ${incident.type}` : "🚨 INCIDENTE"}
              </Text>
              <View style={[
                  styles.statusDot,
                  { backgroundColor: statusColors[incident.status?.toLowerCase()] || '#999' }
              ]} />
          </View>

      {incident.description && (
          <Text style={styles.incidentDesc}>
              Descripción: {incident.description}
          </Text>
      )}

          <Text style={styles.incidentLoc}>
              📍 Ubicación: {incident.latitude}, {incident.longitude}
          </Text>

          <Text style={styles.incidentTime}>
              📅 {new Date(incident.createdAt).toLocaleString('es-PE', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
          </Text>
    </Pressable>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 100,
  },
  sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
  },
  
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
  
  incidentDesc: {
      fontSize: 14,
      marginBottom: 4,
      color: '#2c3e50',
  },

  incidentLoc: {
      fontSize: 13,
      color: '#34495e',
      marginBottom: 4,
  },
  link: { color: '#007bff' },
  cardFooter: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },

  incidentType: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#c0392b',
  },
  incidentTime: {
      fontSize: 12,
      color: '#7f8c8d',
  },
  statusDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      marginTop: 4,
      marginRight: 6,
},
});