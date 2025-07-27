import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import clientApiGateway from "../services/clientApiGateway";

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
        Alert.alert("Error", "No se pudo obtener la información del incidente");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchIncident();
  }, [id]);

  const handleAttend = async () => {
    try {
      await clientApiGateway.put(`/api/incidents/${id}/status`, {
        status: "IN_PROCESS",
      });

      setIncident((prev) => ({
        ...prev,
        incidentStatus: "IN_PROCESS",
      }));
    } catch (error) {
      console.error("Error al atender el incidente:", error);
      Alert.alert("Error", "No se pudo actualizar el estado del incidente.");
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (!incident)
    return <Text style={styles.errorText}>No se encontró el incidente</Text>;

  const statusLabels = {
    PENDING: "Pendiente",
    IN_PROCESS: "En atención",
    RESOLVED: "Resuelto",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          🚨 {incident.incidentType || "Incidente"}
        </Text>
        <Text style={styles.label}>Estado:</Text>
        <Text
          style={[styles.status, styles[`status_${incident.incidentStatus}`]]}
        >
          {statusLabels[incident.incidentStatus] || "Desconocido"}
        </Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.text}>
          {incident.description || "Sin descripción"}
        </Text>

        <Text style={styles.label}>Ubicación:</Text>
        <Text style={styles.text}>
          📍 {incident.latitude}, {incident.longitude}
        </Text>

        <Text style={styles.label}>Fecha de creación:</Text>
        <Text style={styles.text}>
          {new Date(incident.createdAt).toLocaleString("es-PE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        {incident.incidentStatus === "PENDING" && (
          <TouchableOpacity style={styles.attendButton} onPress={handleAttend}>
            <Text style={styles.attendText}>🛠️ Atender incidente</Text>
          </TouchableOpacity>
        )}
      </View>

      {incident.latitude && incident.longitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: incident.latitude,
            longitude: incident.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: incident.latitude,
              longitude: incident.longitude,
            }}
          />
        </MapView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e74c3c",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    color: "#2c3e50",
  },
  text: {
    fontSize: 14,
    color: "#34495e",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  status_PENDING: {
    color: "#e74c3c",
  },
  status_IN_PROCESS: {
    color: "#f39c12",
  },
  status_RESOLVED: {
    color: "#2ecc71",
  },
  attendButton: {
    backgroundColor: "#f39c12",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  attendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    color: "red",
  },
});
