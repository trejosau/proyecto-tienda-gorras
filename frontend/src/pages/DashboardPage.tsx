import React, { useState } from "react";
import { motion } from "framer-motion";
import AgregarProducto from "../components/AgregarProducto.tsx";
import ModificarProducto from "../components/ModificarProducto.tsx";

const Dashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("inicio");

  return (
    <div className="flex h-screen">
      {/* Barra Lateral */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </motion.div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Gestión de Productos</h2>
          <motion.button
            onClick={() => setSelectedOption("agregarProducto")}
            className="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Agregar Producto
          </motion.button>
          <motion.button
            onClick={() => setSelectedOption("modificarProducto")}
            className="mt-2 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Modificar Producto
          </motion.button>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Órdenes</h2>
          <motion.button
            onClick={() => setSelectedOption("historialOrdenes")}
            className="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Ver Historial de Órdenes
          </motion.button>
          <motion.button
            onClick={() => setSelectedOption("pedidosEnCurso")}
            className="mt-2 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Pedidos en Curso
          </motion.button>
        </div>
        <a href="/" className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded">
          Volver
        </a>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 text-black overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedOption === "inicio" && (
            <>
              <h2 className="text-xl font-semibold">Bienvenido al Dashboard</h2>
              <p className="mt-2 text-gray-700">Selecciona una opción en el menú lateral.</p>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedOption === "agregarProducto" && (
            <>
              <h2 className="text-xl font-semibold">Formulario para agregar productos</h2>
              <AgregarProducto />
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedOption === "modificarProducto" && (
            <>
              <h2 className="text-xl font-semibold">Formulario para modificar productos</h2>
              <ModificarProducto />
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
