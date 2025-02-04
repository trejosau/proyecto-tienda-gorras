import express from 'express';
import { registerClient, registerDeliveryMan, registerAdmin, login, getUser } from '../controllers/userController';
import { validateTokenAndRole } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:id", validateTokenAndRole(["admin", "client", "deliveryman"]), getUser);

router.post('/register-client', registerClient);
router.post('/register-deliveryman', registerDeliveryMan);
router.post('/register-admin', validateTokenAndRole(["admin"]), registerAdmin);

router.post('/', login);




export default router;