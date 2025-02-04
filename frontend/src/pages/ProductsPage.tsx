import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import axiosClient from "../services/axiosClient.ts";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    axiosClient.get("product")
      .then(response => {
        console.log("API Response:", response.data);
        setProducts(response.data.products || []);
        setFilteredProducts(response.data.products || []);
      })
      .catch(() => setError("Error al cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(value)));
  };

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
          className="text-4xl font-bold text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros productos
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Explora nuestra amplia variedad de productos, cada uno cuidadosamente seleccionado para ti.
        </motion.p>
        
        <div className="mb-6 text-right">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={search}
            onChange={handleSearch}
            className="px-4 py-2 w-1/4 rounded-md border border-gray-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        
        {loading && <p className="text-center">Cargando productos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(({ id, name, price, description, image }) => (
            <motion.div 
              key={id} 
              className="bg-gray-900 p-6 rounded-lg shadow-lg text-center h-[500px] flex flex-col justify-between transform transition duration-300 hover:shadow-xl hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img 
                src={image} 
                alt={name} 
                className="w-full h-56 object-cover mb-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <p className="text-white">${price}</p>
              <p className="text-white text-sm mb-4">{description || "Descripción no disponible"}</p> {/* Texto alternativo si no hay descripción */}
              <motion.button 
                className="mt-4 bg-black text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-700 transition transform hover:scale-105"
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
