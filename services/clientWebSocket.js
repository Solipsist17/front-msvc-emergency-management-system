import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// URL del WebSocket — ¡Ojo! solo cambia si tienes un path diferente en tu API Gateway
const SOCKET_URL = "http://192.168.0.5:8080/api/msvc-notifications/ws";

let stompClient = null;

export const connectWebSocket = (onNewIncident) => {
  if (stompClient && stompClient.active) return;

  stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
    debug: (str) => {
      console.log("[STOMP]", str);
    },
    onConnect: () => {
      console.log("✅ Conectado al WebSocket");

      // Suscripción al canal
      stompClient.subscribe("/topic/incidents", (message) => {
        const incident = JSON.parse(message.body);
        console.log("🚨 Nuevo incidente recibido:", incident);
        if (onNewIncident) onNewIncident(incident); // Notificar al componente
      });
    },
    onStompError: (frame) => {
      console.error("❌ Error STOMP:", frame.headers["message"]);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate();
  }
};
