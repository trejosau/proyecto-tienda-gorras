import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
//EJEMPLO DE USAR GOOGLE MAPS API
/**
 * Obtiene la distancia y duración entre dos ubicaciones.
 * @param origin - Ubicación de origen (formato: "lat,lng").
 * @param destination - Ubicación de destino (formato: "lat,lng").
 * @returns Distancia y duración.
 */
export const getDistance = async (origin: string, destination: string) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching distance from Google Maps');
    }
};