import express from 'express';
import { registerClient, registerDeliveryMan, registerAdmin, login, getUser } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUser);

router.post('/register-client', registerClient);
router.post('/register-deliveryman', registerDeliveryMan);
router.post('/register-admin', registerAdmin);

router.post('/', login);




export default router;