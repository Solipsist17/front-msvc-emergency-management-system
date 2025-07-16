import clientApiGateway from "./clientApiGateway";

export const getUserData = async (userId) => {
  const response = await clientApiGateway.get("/api/users/me");
  return response.data;
};
