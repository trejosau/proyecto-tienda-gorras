import { Request, Response } from 'express';
const { User } = require('../models');
const bcrypt = require('bcryptjs');
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');


dotenv.config();

export const registerClient = async (req: Request, res: Response) => {
    try {
        const { username, password, email, phone, name, last_name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            phone,
            role: 'client',
            name,
            last_name
        });

        res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Error creating user:", error); // 🔍 Mostrar error en consola
        res.status(500).json({ message: 'Error creating user', error: error.message || error });
    }
};

export const registerDeliveryMan = async (req: Request, res: Response) => {
    try {
        const { username, password, email, phone, name, last_name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            phone,
            role: 'deliveryman',
            name,
            last_name
        });

        res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message || error });
    }
};

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const { username, password, email, phone, name, last_name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            phone,
            role: 'admin',
            name,
            last_name
        });

        res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message || error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                userRole: user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h'
            }
        );


        return res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,
            userId: user.id
        });


    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging in', error: error.message || error });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {

        console.log(req.params, "Obteniendo usuario");

        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: 'Error getting user', error: error.message || error });
    }
};

