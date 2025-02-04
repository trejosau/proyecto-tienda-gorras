// pages/Dashboard.tsx
import React from "react";

interface DashboardProps {
    role: "admin" | "deliveryman";
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {role === "admin" && (
                <div>
                    <h2 className="text-xl font-semibold mt-4">Gestión del Catálogo</h2>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Registrar Admins y Repartidores
                    </button>
                </div>
            )}
            {role === "deliveryman" && (
                <div>
                    <h2 className="text-xl font-semibold mt-4">Historial de Pedidos</h2>
                    <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                        Ver Pedido en Curso
                    </button>
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                        Cancelar Pedido
                    </button>
                    <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded">
                        Cambiar Estado (Online/Offline)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
