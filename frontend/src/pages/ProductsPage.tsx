import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import axiosClient from "../services/axiosClient.ts";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      axiosClient.get("product")
      .then(response => {
        console.log("API Response:", response.data);
        setProducts(response.data.products || []);
      })
      .catch(() => setError("Error al cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <motion.div
        className="min-h-screen bg-black text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Productos
        </motion.h2>
        
        {loading && <p className="text-center">Cargando productos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(({ id, name, price, image }) => (
            <motion.div 
              key={id} 
              className="bg-gray-900 p-4 rounded-lg shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img 
                src={image} 
                alt={name} 
                className="w-full h-48 object-cover mb-4 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-400">${price}</p>
              <motion.button 
                className="mt-4 bg-white text-black py-2 px-4 rounded font-bold hover:bg-gray-300 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Comprar
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsPage;
