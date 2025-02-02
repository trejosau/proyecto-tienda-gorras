import axios from "axios";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
export class LocationService {
    static async getAddressFromCoordinates(googleMapsLocation: string): Promise<string> {
        try {
            const [lat, lng] = googleMapsLocation.split(",").slice(0, 2).map(coord => coord.trim());
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

            const response = await axios.get(url);

            if (response.data.status === "OK") {
                // Buscar una dirección que NO sea un Plus Code
                const results = response.data.results;
                const address = results.find((r: any) => !r.plus_code)?.formatted_address;

                if (address) {
                    return address;
                } else {
                    throw new Error("Solo se obtuvo un Plus Code, no una dirección tradicional.");
                }
            } else {
                throw new Error("No se pudo obtener la dirección.");
            }
        } catch (error) {
            throw new Error("Error en la solicitud a Google Maps: " + (error as Error).message);
        }
    }
}
