import React, { useEffect, useRef } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";
import { LoginOptions } from "../components/LoginButtonGroup";
import { Shield } from "../components/Shield";

// import de notificaciones push
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import clientApiGateway from "../services/clientApiGateway";

const LoginScreen = ({ navigation }) => {
  // código de notificaciones push
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  // useEffect se ejecuta una vez al montar el componente y se encarga de registrar el dispositivo para recibir notificaciones push
  useEffect(() => {
    // función que solicita permisos, obtiene el token y lo envía al backend
    const registerForPushNotifications = async () => {
      console.log("Entrando a registerForPushNotifications"); /////
      console.log("Device.isDevice:", Device.isDevice); //////

      if (Device.isDevice) {
        console.log("verificamos si tenemos permisos de notificaciones"); /////
        // verificamos si ya tenemos permisos de notificaciones
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // si no tenemos permisos, solicitamos
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        console.log("si el usuario no concede permisos, mostramos un mensaje"); /////
        // si el usuario no concede permisos, mostramos un mensaje
        if (finalStatus !== "granted") {
          Alert.alert("Permisos denegados para notificaciones");
          return;
        }

        console.log("si todo esá bien, obtenemos el token de notificaciones"); /////
        // si todo está bien, obtenemos el token de notificaciones del dispositivo
        let token;
        try {
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log("Expo Push Token:", token);
        } catch (err) {
          console.error("Error al obtener el token de notificaciones:", err);
          return;
        }

        // Enviamos el token al backend Spring Boot (msvc-notifications)
        try {
          await clientApiGateway.post("/api/notifications/devices", {
            expoPushToken: token,
          });
          console.log("Token enviado correctamente al backend");
        } catch (error) {
          console.error("Error al enviar el token al backend:", error);
        }

        /*
        await fetch("https://tu-backend.com/api/notificaciones/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "123", // reemplazar por el ID del usuario real 
            token: token,
          }),
        });
        */
      } else {
        Alert.alert(
          "Debes usar un dispositivo físico para recibir notificaciones"
        );
      }
    };

    // ejecutamos la función al cargar el componente
    console.log("Registrando para notificaciones push...");
    registerForPushNotifications();

    // Listener cuando la app está en foreground (primer plano)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notificación recibida en primer plano:", notification);
      });

    // Listener cuando el usuario toca la notificación
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Usuario abrió notificación:", response);
      });

    // Limpiamos los listeners al desmontar el componente
    // Esto es importante para evitar fugas de memoria y comportamientos inesperados
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // Fin del código de notificaciones push

  // interfaz visual del login
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Header color1={"black"} color2={"green"} />
        <Shield height={200} width={200} />
        <LoginForm />
        <LoginOptions />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Fondo blanco
    justifyContent: "space-between", // Centra los elementos en el eje vertical
    paddingHorizontal: 0, // Sin espaciado horizontal
  },
});

export default LoginScreen;
