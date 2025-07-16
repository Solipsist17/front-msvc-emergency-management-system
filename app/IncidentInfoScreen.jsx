import React, {useState, useEffect}  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import InProcessIncident from '@/components/incidence/InProcessIncident';
import ResolvedIncident from '@/components/incidence/ResolvedIncident';
import PendingIncident from '@/components/incidence/PendingIncident';
import clientApiGateway from '../services/clientApiGateway';




export default function IncidenceInfoScreen() {
const { id } = useLocalSearchParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await clientApiGateway.get(`/api/incidents/${id}`);
        setIncident(response.data);
      } catch (error) {
        console.error("Error al obtener el incidente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchIncident();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!incident) {
    return <Text>No se encontró el incidente</Text>;
  }

  switch (incident.incidentStatus) {
    case "PENDING":
      return <PendingIncident incident={incident} onAttend={() => {}} />;
    case "IN_PROCESS":
      return <InProcessIncident incident={incident} onSave={() => {}} />;
    case "RESOLVED":
      return <ResolvedIncident incident={incident} />;
    default:
      return <Text>Estado desconocido</Text>;
  }
}

