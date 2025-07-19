import { Slot } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clientApiGateway from "../services/clientApiGateway";

// actúa como una capa envolvente de todas las pantallas en expo-router
// se ejecuta una vez cuando la aplicación se inicia
// y permanece activa durante toda la navegación de la app mientras no se reinicie el árbol de navegación
export default function Layout() {
  // Refs para mantener los listeners de notificaciones
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  // se ejecuta una vez al montar el componente
  useEffect(() => {
    const setupPushNotifications = async () => {
      // 1. se verifica si el usuario está autenticado (JWT guardado)
      const tokenJWT = await SecureStore.getItemAsync("authToken");
      if (!tokenJWT) {
        console.log("No hay sesión activa. No se registra token push.");
        return;
      }

      // 2. se verifica si ya se envió el push token al backend previamente
      const alreadyRegistered = await AsyncStorage.getItem("pushTokenSent");
      if (alreadyRegistered === "true") {
        console.log("Push token ya fue enviado previamente");
        return;
      }

      // 3. solo dispositivos físicos pueden recibir notificaciones push
      if (!Device.isDevice) {
        Alert.alert("Solo dispositivos físicos pueden recibir notificaciones");
        return;
      }

      // 4. verificamos si necesitamos permisos de notificaciones
      // desestructuramos el objeto y lo renombramos a existingStatus
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      // existingStatus: estado antes de solicitar permisos
      // finalStatus: estado después de solicitar permisos
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Permisos de notificación no concedidos");
        return;
      }

      // 5. obtenemos el token de notificaciones push
      try {
        const expoPushToken = (await Notifications.getExpoPushTokenAsync())
          .data;
        console.log("Expo Push Token:", expoPushToken);

        // enviamos el token al backend
        await clientApiGateway.post("/api/notifications/devices", {
          expoPushToken,
        });

        // marcamos en AsyncStorage que el token ya fue enviado para no repetirlo
        await AsyncStorage.setItem("pushTokenSent", "true");
        console.log("Push token registrado en backend");
      } catch (err) {
        console.error("Error al registrar token push:", err);
      }
    };

    setupPushNotifications(); // ejecutamos la función al cargar el componente

    // listener cuando se recibe una notificación en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notificación recibida:", notification);
      });

    // listener cuando el usuario toca la notificación
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notificación tocada:", response);
      });

    // cleanup: removemos los listeners al desmontar el componente
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []); // solo se ejecuta una vez al montar el componente

  return <Slot />; // Renderiza la ruta correspondiente
}
