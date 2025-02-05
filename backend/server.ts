import app from './app';          // Importa tu aplicación Express
import sequelize from './config/db'; // Importa la configuración de la base de datos
import dotenv from 'dotenv';         // Cargar variables de entorno
import http from 'http';             // Crear un servidor HTTP
import { Server } from 'socket.io';  // Importación correcta de socket.io

dotenv.config();

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5001;

// Crear el servidor HTTP usando Express
const server = http.createServer(app);

// Inicializar Socket.IO en el servidor
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

let estadoDisponible = true;

io.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");

    // Enviar el estado actual al cliente cuando se conecta
    socket.emit('estado_actualizado', estadoDisponible);

    // Escuchar solicitudes para obtener el estado actual
    socket.on('obtener_estado_actual', () => {
        socket.emit('estado_actualizado', estadoDisponible);
    });

    // Escuchar actualizaciones del estado desde el cliente
    socket.on('actualizar_estado', (nuevoEstado) => {
        estadoDisponible = nuevoEstado;

        // Enviar el nuevo estado a todos los clientes conectados
        io.emit('estado_actualizado', estadoDisponible);
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
