import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:uuid', getProduct);

router.put('/:uuid', updateProduct);

router.delete('/:uuid', deleteProduct);

export default router;