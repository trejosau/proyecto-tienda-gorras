import React from "react";

interface DashboardProps {
    role: "admin" | "deliveryman";
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    {role === "admin" && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Gestión del Catálogo</h2>
                            <button className="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                Registrar Admins y Repartidores
                            </button>
                        </div>
                    )}
                    {role === "deliveryman" && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Historial de Pedidos</h2>
                            <button className="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                Ver Pedido en Curso
                            </button>
                            <button className="mt-2 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                Cancelar Pedido
                            </button>
                            <button className="mt-2 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                Cambiar Estado (Online/Offline)
                            </button>
                        </div>
                    )}
                </div>
                <a href="/" className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded">
                    Volver
                </a>
            </aside>
            <main className="flex-1 p-6 bg-gray-100 text-black">
                <h2 className="text-xl font-semibold">Bienvenido al Dashboard</h2>
                <p className="mt-2 text-gray-700">Selecciona una opción en el menú lateral.</p>
            </main>
        </div>
    );
};

export default Dashboard;