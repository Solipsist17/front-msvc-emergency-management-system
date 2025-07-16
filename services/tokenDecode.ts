import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  role: string;
};
const getTokenData = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded : DecodedToken = jwtDecode(token);
    return null;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};