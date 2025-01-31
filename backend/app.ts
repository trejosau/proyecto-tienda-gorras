import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/deliverie', deliveryRoutes);
app.use('/api/product', productRoutes);

export default app;


