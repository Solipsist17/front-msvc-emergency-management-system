import axios from "axios";
import * as SecureStore from "expo-secure-store";

const clientApiGateway = axios.create({
  baseURL: "https://d2ae5e9ce7b9.ngrok-free.app",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token automáticamente a cada solicitud
clientApiGateway.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("authToken");
    console.log("TOKEN QUE SE ENVÍA:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientApiGateway;
