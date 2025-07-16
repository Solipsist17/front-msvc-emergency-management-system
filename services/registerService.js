import clientApiGateway from "./clientApiGateway";

export const registerService = async (
  dni,
  email,
  phoneNumber,
  password,
  role = "CITIZEN"
) => {
  try {
    console.log("1. Iniciando petición...");
    const response = await clientApiGateway.post("/api/auth/register", {
      dni,
      name: "",
      lastname: "",
      email,
      phoneNumber,
      password,
      role,
    });
    console.log("3. Respuesta exitosa:", response.status);
    return response.data;
  } catch (error) {
    console.log("Error completo:", error);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    }
    throw error; //
  }
};
