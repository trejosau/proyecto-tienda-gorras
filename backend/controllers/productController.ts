import { Request, Response } from 'express';
const { Product } = require('../models');
const bcrypt = require('bcryptjs');
// @ts-ignore
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');

dotenv.config();


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, image } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image
        });

        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Error creating product', error: error.message || error });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({ message: 'Products found', products });

    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ message: 'Error getting products', error: error.message || error });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params;

        const product = await Product.findByPk(uuid);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product found', product });

    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ message: 'Error getting product', error: error.message || error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params;
        const { name, description, price, stock, image } = req.body;

        const product = await Product.update({ name, description, price, stock, image }, { where: { id: uuid } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', name, description, price, stock, image });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Error updating product', error: error.message || error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params;

        const product = await Product.destroy({ where: { id: uuid } });


        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully'});

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Error deleting product', error: error.message || error });
    }
};