import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import clientApiGateway from "../services/clientApiGateway";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";

export default function NotificationPush() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestNotification, setLatestNotification] = useState(null);
  // lista de notificaciones recibidas por push
  // variable notifications inicializada [], función setNotifications que actualiza el valor de notifications
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // se suscribe al evento de notificaciones
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 Notificación recibida:", notification);

        // extrae los datos de la notificación
        const data = notification.request.content.data;

        // actualiza el estado de "notifications" añadiendo una nueva notificación al principio de la lista
        setNotifications((prev) => [
          // objeto de la lista "notifications"
          {
            id: 14, // harcodeado para pruebas, debería usar un ID único real
            title: notification.request.content.title,
            body: notification.request.content.body,
            type: data.type,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude,
            status: data.status,
            createdAt: new Date(),
          },
          ...prev,
        ]);
      }
    );

    return () => subscription.remove();
  }, []);

  const statusColors = {
    pending: "#e74c3c", // rojo
    in_process: "#f39c12", // naranja
    resolved: "#2ecc71", // verde
  };

  const handleIncidentInfo = (incident) => {
    router.push({
      pathname: "/IncidentInfoScreen",
      params: { id: incident.id },
    });
  };

  return (
    // permite desplazar el contenido verticalmente si se desborda la pantalla
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>Incidentes recientes</Text>

      {/* Si no hay notificaciones aún, mostramos un mensaje */}
      {notifications.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          No hay notificaciones recibidas aún.
        </Text>
      ) : (
        // Si hay notificaciones, las recorremos con .map() para renderizarlas una por una
        notifications.map((incident) => (
          // Pressable es como un botón: se puede presionar
          <Pressable
            key={incident.id} // clave única para cada notificación
            style={styles.incidentCard}
            onPress={() => handleIncidentInfo(incident)} // función que se ejecuta al presionar la notificación
          >
            {/* Encabezado de la notificación */}
            <View style={styles.cardHeader}>
              <Text style={styles.incidentType}>
                {incident.title ? `🚨 ${incident.title}` : "🚨 INCIDENTE"}
              </Text>
              {/* Punto de color para indicar el estado del incidente (pendiente, resuelto, etc.) */}
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      statusColors[incident.status?.toLowerCase()] || "#999",
                  },
                ]}
              />
            </View>

            {/* Descripción de la notificación */}
            {incident.body && (
              <Text style={styles.incidentDesc}>
                Descripción: {incident.body}
              </Text>
            )}

            <Text style={styles.incidentLoc}>
              📍 Ubicación: {incident.latitude}, {incident.longitude}
            </Text>

            <Text style={styles.incidentTime}>
              📅{" "}
              {new Date(incident.createdAt).toLocaleString("es-PE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Pressable>
        ))
      )}
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
    fontWeight: "bold",
    marginVertical: 10,
  },

  header: {
    backgroundColor: "#043927",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  agentBox: {
    backgroundColor: "#004d3c",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  agentText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  agentSubtext: { color: "#fff", fontSize: 14 },
  statusIndicators: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  statusItem: { flexDirection: "row", alignItems: "center" },

  incidentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  incidentDesc: {
    fontSize: 14,
    marginBottom: 4,
    color: "#2c3e50",
  },

  incidentLoc: {
    fontSize: 13,
    color: "#34495e",
    marginBottom: 4,
  },
  link: { color: "#007bff" },
  cardFooter: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  incidentType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#c0392b",
  },
  incidentTime: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
    marginRight: 6,
  },
  notificationCard: {
    backgroundColor: "#d1f5d3",
    borderLeftWidth: 5,
    borderLeftColor: "#2ecc71",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
    color: "#2c3e50",
  },
});
