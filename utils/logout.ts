import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export const logout = async () => {
  try {
    // Limpia todo lo relacionado al usuario
    await SecureStore.deleteItemAsync("token"); // auth token
    await SecureStore.deleteItemAsync("userId"); // auth token
    await AsyncStorage.removeItem("pushTokenSent"); // opcional, si quieres que se vuelva a enviar cuando haga login

    console.log("✅ Sesión cerrada correctamente, storage limpiado");

    // Aquí se podría cancelar suscripciones, cerrar sockets, etc.

    // Redirecciona al login o landing page
    router.replace("/");
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
  }
};
