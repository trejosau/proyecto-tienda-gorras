import express from 'express';
import { registerClient, registerDeliveryMan, registerAdmin, login } from '../controllers/userController';

const router = express.Router();

router.post('/register-client', registerClient);
router.post('/register-deliveryman', registerDeliveryMan);
router.post('/register-admin', registerAdmin);

router.post('/', login);




export default router;