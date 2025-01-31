import express from 'express';
import { createOrder, getOrder, updateOrder} from '../controllers/orderController';


const router = express.Router();

// Crear una nueva orden
router.post('/', createOrder);

// Obtener una orden por ID
router.get('/orders/:id', getOrder);

// Actualizar una orden por ID
router.put('/orders/:id', updateOrder);


export default router;

