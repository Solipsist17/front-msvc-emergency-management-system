import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import clientApiGateway from "./clientApiGateway";

const loginService = async (email, password) => {
  const response = await clientApiGateway.post("/api/auth/login", {
    email,
    password,
  });

  const { accessToken } = response.data;
  if (!accessToken) {
    throw new Error("Token no recibido");
  }

  // Guardar token en SecureStore
  await SecureStore.setItemAsync("authToken", accessToken);

  const decoded = jwtDecode(accessToken);

  return {
    id: decoded.sub,
    role: decoded.role,
    token: accessToken,
  };
};

export default loginService;
