import React from "react";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Gorra Clásica", price: "$25", image: "/images/gorra1.jpg" },
  { id: 2, name: "Gorra Snapback", price: "$30", image: "/images/gorra2.jpg" },
  { id: 3, name: "Gorra Trucker", price: "$28", image: "/images/gorra3.jpg" },
  { id: 4, name: "Gorra Deportiva", price: "$35", image: "/images/gorra4.jpg" },
];

const ProductsPage: React.FC = () => {
  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div 
            key={product.id} 
            className="bg-gray-900 p-4 rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover mb-4 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-400">{product.price}</p>
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
  );
};

export default ProductsPage;
