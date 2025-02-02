import app from './app';          // Importa tu aplicación Express
import sequelize from './config/db'; // Importa la configuración de la base de datos
import dotenv from 'dotenv';         // Cargar variables de entorno
import http from 'http';             // Crear un servidor HTTP
import { Server } from 'socket.io';  // Importación correcta de socket.io

dotenv.config();

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;

// Crear el servidor HTTP usando Express
const server = http.createServer(app);

// Inicializar Socket.IO en el servidor
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Establecer la conexión de WebSocket
io.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");

    // Aquí puedes escuchar eventos específicos del cliente
    socket.on('send-location', (data) => {
        console.log("Ubicación recibida:", data);
        // Emitir la nueva ubicación a todos los clientes conectados
        io.emit("update-location", data);
    });

    socket.on('disconnect', () => {
        console.log("Cliente desconectado");
    });
});

// Sincronizar la base de datos y luego arrancar el servidor
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API ROUTES => http://localhost:${PORT}/api/`);
    });
});
