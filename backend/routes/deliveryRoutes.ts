import { Router } from 'express';
import { Delivery } from '../models';  // Importa el modelo Delivery

const router = Router();

// Ruta para actualizar las coordenadas GPS de una entrega
router.put('/:id/gps', async (req, res) => {
    const { id } = req.params;
    const { GPS_coordinates } = req.body;  // Asegúrate de que las coordenadas estén en el cuerpo de la solicitud

    try {
        const delivery = await Delivery.findByPk(id);

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        // Actualizar las coordenadas GPS
        await delivery.update({ GPS_coordinates });

        // Emitir el evento WebSocket para actualizar la ubicación
        req.app.get('io').emit('update-location', {
            deliveryId: id,
            GPS_coordinates
        });

        res.status(200).json({ message: 'Delivery GPS coordinates updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating GPS coordinates' });
    }
});

export default router;
