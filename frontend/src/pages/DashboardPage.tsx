import React, { useState, useEffect } from "react";
import io from "socket.io-client";

interface DashboardProps {
    role: "admin" | "deliveryman";
}

const socket = io("http://localhost:5001");

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
    const [section, setSection] = useState("estado");
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        // Confirmar conexión con el servidor
        socket.on("connect", () => {
            console.log("Conectado al servidor de Socket.IO");
        });

        // Escuchar cambios de estado desde el servidor
        socket.on("estado_actualizado", (estado: boolean) => {
            console.log("Estado actualizado recibido:", estado);
            setIsAvailable(estado);
        });

        // Solicitar el estado actual al conectarse
        socket.emit("obtener_estado_actual");

        return () => {
            socket.off("estado_actualizado");
            socket.off("connect"); // Limpiar la conexión
        };
    }, []);

    const toggleAvailability = () => {
        const newState = !isAvailable;
        setIsAvailable(newState);
        socket.emit("actualizar_estado", newState);
    };

    const buttonClasses = "px-4 py-2 rounded text-lg font-semibold";
    const activeButtonClasses = "bg-blue-500 text-white";
    const inactiveButtonClasses = "bg-gray-300 text-black";

    const renderDeliverymanSection = () => {
        return (
            <div className="flex-1 overflow-y-auto p-4">
                {section === "estado" && (
                    <div className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-lg font-semibold">Estado Actual</h2>
                        <div className="flex items-center mb-4">
                            <label className="mr-4 text-gray-700">
                                {isAvailable ? "Buscando pedidos" : "Sin servicio"}
                            </label>
                            <div
                                className="relative inline-block w-16 h-8 cursor-pointer"
                                onClick={toggleAvailability}
                            >
                                <div
                                    className={`w-full h-full rounded-full transition-all duration-300 ease-in-out ${
                                        isAvailable ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                                >
                                    <div
                                        className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out ${
                                            isAvailable ? "transform translate-x-8" : ""
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            Estado: {isAvailable ? "Buscando pedidos" : "Sin servicio"}
                        </p>
                        <div className="mt-4">
                            <img
                                src={isAvailable ? "/images/radar.gif" : "/images/offline.gif"}
                                alt="Estado de Disponibilidad"
                                className="w-32 h-32 mx-auto"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 text-black p-6">
            {role === "deliveryman" ? (
                <div className="flex flex-col h-full">
                    <h1 className="text-3xl font-bold p-4 bg-white shadow">Dashboard Repartidor</h1>
                    <div className="flex justify-around p-4 bg-white shadow">
                        <button
                            onClick={() => setSection("estado")}
                            className={`${buttonClasses} ${section === "estado" ? activeButtonClasses : inactiveButtonClasses}`}
                        >
                            Estado
                        </button>
                    </div>
                    {renderDeliverymanSection()}
                    <a href="/" className="p-4 bg-gray-800 hover:bg-gray-700 text-white text-center">Volver</a>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
                    <a href="/" className="mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-lg">
                        Volver
                    </a>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
