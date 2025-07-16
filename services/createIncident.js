import clientApiGateway from "./clientApiGateway";

export const createIncident = async (longitude, latitude) => {
  try {
    console.log("Creating incident with coordinates:", longitude, latitude);
    const response = await clientApiGateway.post("/api/incidents", {
      latitude,
      longitude,
    });
    console.log("Respuesta del servidor:", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating incident:", error);
    throw error;
  }
};
