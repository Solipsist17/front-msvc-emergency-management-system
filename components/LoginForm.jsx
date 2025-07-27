import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import loginService from "../services/loginService";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import clientApiGateway from "../services/clientApiGateway";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const manejarLogin = async () => {
    try {
      const userData = await loginService(email, password);

      // Guardar token
      await SecureStore.setItemAsync("token", userData.token);
      await SecureStore.setItemAsync("userRole", userData.role); // guardar el rol del usuario
      await SecureStore.setItemAsync("userId", userData.id);

      // login exitoso, manejar notificaciones push
      ////////////
      if (!Device.isDevice) {
        Alert.alert(
          "Notificación no compatible",
          "Solo dispositivoss físicos pueden recibir notificaciones."
        );
        return;
      }

      try {
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
          Alert.alert(
            "Permiso denegado",
            "No se concedieron permisos para notificaciones push."
          );
          return;
        }

        // Verificar si el token ya fue enviado
        const alreadySent = await AsyncStorage.getItem("pushTokenSent");
        if (alreadySent === "true") {
          console.log("🔁 Push token ya registrado anteriormente.");
          //return;
        } else {
          // si no se ha enviado, obtener el token de notificaciones
          console.log("🔔 Obteniendo token de notificaciones...");
          const { data: fcmPushToken } =
            await Notifications.getDevicePushTokenAsync();

          await clientApiGateway.post("/api/notifications/devices", {
            fcmPushToken,
          });

          // marcar que el token ya fue enviado (flag en AsyncStorage)
          await AsyncStorage.setItem("pushTokenSent", "true");
          console.log("✅ Push token enviado y registrado:", fcmPushToken);
        }
      } catch (error) {
        // VALIDAR de acuerdo al error, si fue un:
        // Duplicate entry '36-ed2Mj_ryRnSGt_jRAMBvap:APA91bEGR63cTIH9jpnbSyvT7vVebNX_YpEHEw' for key 'devices.uk_user_token'
        console.error("❌ Error al registrar el push token:", error);
        Alert.alert(
          "Error",
          "No se pudo registrar el token de notificaciones."
        );
      }
      /////////////

      // Redirigir según el rol
      switch (userData.role) {
        case "ADMIN":
          router.replace("AdminScreen");
          break;
        case "POLICE":
          router.replace("PoliceScreen");
          break;
        case "CITIZEN":
          router.replace("HomeScreen");
          break;
        default:
          router.replace("index");
      }
    } catch (error) {
      Alert.alert(
        "Error de inicio de sesión",
        "Por favor, verifica tus credenciales e inténtalo de nuevo."
      );
      console.error("Error al iniciar sesión:", error);
    }
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.boxContainer}>
        <TextInput
          placeholder="Correo"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.inputPassword}
          />
          <MaterialCommunityIcons name="eye-off" size={20} color="#ccc" />
        </View>
      </View>
      <Pressable style={styles.loginButton} onPress={manejarLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    height: 300, // Ajusta la altura según sea necesario
    width: "100%",
  },
  boxContainer: {
    width: "80%", // Ancho del cuadro
    padding: 10,
    backgroundColor: "#235B52", // Color de fondo del cuadro
    borderRadius: 20,
    shadowColor: "#fff", // Sombra para dar un efecto de elevación
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    backgroundColor: "#1A2B24",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: "#fff",
    alignItems: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A2B24",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#007F5F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "2%",
    /* marginBottom: 20, */
    width: "75%", // Ancho del botón
  },
  loginButtonText: {
    color: "#D3FF57",
    fontWeight: "bold",
    fontSize: 16,
  },
});
