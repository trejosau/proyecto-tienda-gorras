import axios from "axios";

const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;

export const getAddressFromCoordinates = async (lat: string, lon: string): Promise<string> => {
    if (!LOCATIONIQ_API_KEY) {
        throw new Error("Falta la clave API de LocationIQ en las variables de entorno.");
    }

    try {
        const response = await axios.get("https://us1.locationiq.com/v1/reverse.php", {
            params: { key: LOCATIONIQ_API_KEY, lat, lon, format: "json" },
        });

        // Obtener la dirección desde display_name
        const address = response.data?.display_name || "Dirección no encontrada";

        return address;
    } catch (error: any) {
        console.error("Error obteniendo dirección:", error.response?.data || error.message);
        return "Error al obtener dirección";
    }
};
