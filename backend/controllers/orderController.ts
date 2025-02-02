import { Request, Response } from 'express';
import { Order, OrderProduct, Delivery, Product } from '../models';
const bcrypt = require('bcryptjs');
// @ts-ignore
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');
import { LocationService } from "../services/locationService";

dotenv.config();

export const createOrder = async (req: Request, res: Response) => {
    const { clientId, deliveryPersonId_final, status, google_maps_location, products, origin_GPS_coordinates } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "No hay productos en la orden" });
    }

    const transaction = await Order.sequelize?.transaction(); // Iniciar transacción

    try {
        // Obtener los precios desde la base de datos
        const productIds = products.map(p => p.productId);
        const dbProducts = await Product.findAll({
            where: { id: productIds },
            attributes: ['id', 'price'],
            transaction
        });

        // Crear un mapa para acceder rápidamente al precio de cada producto
        const productPriceMap = new Map(dbProducts.map(p => [p.id, p.price]));

        const total = products.reduce((acc, product) => {
            const price = Number(productPriceMap.get(product.productId)) || 0; // Convertir a número y evitar undefined
            const quantity = Number(product.quantity) || 0; // Convertir a número y evitar undefined
            return acc + (price * quantity);
        }, 0);



        const cleanLocation = google_maps_location.split(",").slice(0, 2).join(",").trim();

        // Obtener la dirección desde Google Maps Service
        const address = await LocationService.getAddressFromCoordinates(cleanLocation);



        // Crear la orden
        const order = await Order.create({
            clientId,
            deliveryPersonId_final,
            total,
            status,
            address,
            google_maps_location
        }, { transaction });

        // Insertar productos en OrderProducts con precios correctos
        const orderProductsData = products.map((product) => ({
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity,
            price: productPriceMap.get(product.productId) || 0
        }));

        await OrderProduct.bulkCreate(orderProductsData, { transaction });

        const deliveryPersonId = deliveryPersonId_final;

        // Crear un delivery vinculado a la orden
        const delivery = await Delivery.create({
            orderId: order.id,
            deliveryPersonId,
            status: 'pending',
            address: address,
            GPS_coordinates: origin_GPS_coordinates,
            origin_GPS_coordinates: origin_GPS_coordinates
        }, { transaction });

        // Confirmar transacción
        await transaction?.commit();

        res.status(201).json({ message: "Order created successfully", order, delivery });

    } catch (error) {
        // Revertir cambios si hay un error
        await transaction?.rollback();
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Error creating order', error: error.message || error });
    }
};



export const getOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order found', order });

    } catch (error) {
        console.error("Error getting order:", error);
        res.status(500).json({ message: 'Error getting order', error: error.message || error });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { clientId, deliveryPersonId, total, status, address, google_maps_location } = req.body;

        const order = await Order.update({ clientId, deliveryPersonId, total, status, address, google_maps_location }, { where: { id } });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', clientId, deliveryPersonId, total, status, address, google_maps_location });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: 'Error updating order', error: error.message || error });
    }
};