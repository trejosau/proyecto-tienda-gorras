import axios from "axios";

const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY || "";

export const getAddressFromCoordinates = async (lat: string, lon: string): Promise<string> => {
    try {

        const response = await axios.get("https://us1.locationiq.com/v1/reverse.php", {
            params: { key: LOCATIONIQ_API_KEY, lat, lon, format: "json" },
        });

        if (response.data && response.data.display_name) {
            return response.data.display_name;
        }

        return "Dirección no encontrada";
    } catch (error) {
        console.error("Error obteniendo dirección:", error);
        return "Error al obtener dirección";
    }
};
