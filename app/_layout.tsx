import { Slot, useRouter, usePathname } from "expo-router";
import { use, useEffect, useRef, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clientApiGateway from "../services/clientApiGateway";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// 👇👇👇 ESTA ES LA LÍNEA IMPORTANTE 👇👇👇
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// actúa como una capa envolvente de todas las pantallas en expo-router
// se ejecuta una vez cuando la aplicación se inicia
// y permanece activa durante toda la navegación de la app mientras no se reinicie el árbol de navegación
export default function Layout() {
  // Refs para mantener los listeners de notificaciones
  const notificationListener = useRef(null);
  const responseListener = useRef(null);
  const router = useRouter();
  const pathname = usePathname(); // ruta actual

  const [checkingAuth, setCheckingAuth] = useState(true);

  // se ejecuta una vez al montar el componente
  useEffect(() => {
    const checkAuthAndSetup = async () => {
      try {
        // SOLO PARA DESARROLLO: Forzar reenviar token eliminando la marca
        //await AsyncStorage.removeItem("pushTokenSent");
        const token = await SecureStore.getItemAsync("token");

        if (token) {
          // Puedes hacer un request al backend para validar el token si quieres
          const response = await clientApiGateway.get(`/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const role = response.data.role;

          // Redirigir automáticamente según rol
          switch (role) {
            case "ADMIN":
              router.replace("/AdminScreen");
              break;
            case "POLICE":
              router.replace("/PoliceScreen");
              break;
            case "CITIZEN":
              router.replace("/HomeScreen");
              break;
            default:
              router.replace("/");
          }
        } else {
          if (pathname !== "/") {
            router.replace("/"); // Si no hay token, ir a login
          }
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error);
        if (pathname !== "/") {
          router.replace("/"); // si hay error redirigir a login
        }
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthAndSetup();

    /*
    const setupPushNotifications = async () => {
      // 🔥 SOLO PARA DESARROLLO: Forzar reenviar token eliminando la marca
      //await AsyncStorage.removeItem("pushTokenSent");

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
        const { data: fcmToken } =
          await Notifications.getDevicePushTokenAsync(); // obtenemos los FCM tokens
        console.log("FCM Token:", fcmToken);

        // enviamos el token al backend
        await clientApiGateway.post("/api/notifications/devices", {
          fcmPushToken: fcmToken, // o usa fcmToken si el backend ya está ajustado
        });

        // marcamos en AsyncStorage que el token ya fue enviado para no repetirlo
        await AsyncStorage.setItem("pushTokenSent", "true");
        console.log("Push token registrado en backend");
      } catch (err) {
        console.error("Error al registrar token push:", err);
      }
    };

    setupPushNotifications(); // ejecutamos la función al cargar el componente
    */

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

  // spinner mientras se verifica la autenticación
  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  ///

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
      >
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
