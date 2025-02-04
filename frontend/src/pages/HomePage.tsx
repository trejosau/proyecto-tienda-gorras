import React from "react";
import ProductSection from "../components/ProductSection";
import Header from "../components/Header"; 
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      
      

      {/* Sección de Productos con Imagen y Animaciones */}
      <section id="products" className="w-full py-20 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Texto y Botón */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <motion.h2 
              className="text-5xl md:text-6xl font-extrabold text-white leading-tight" 
              initial={{ opacity: 0, x: -100 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
            >
              Eleva tu estilo
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-300" 
              initial={{ opacity: 0, x: -100 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1, delay: 0.3 }}
            >
              Encuentra la gorra perfecta para cada ocasión.
            </motion.p>
            <motion.a 
              href="/catalogo"
              className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.6 }}
            >
              Explorar Ahora
            </motion.a>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2 flex justify-center">
            <motion.img 
              src="/images/gorra.png" 
              alt="Gorra elegante" 
              className="w-80 md:w-full max-w-md rounded-lg shadow-lg" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.9 }}
            />
          </div>
        </div>
      </section>

      {/* Componente de productos dinámicos */}
      <ProductSection />

      <footer className="w-full py-6 text-center border-t border-gray-700 text-gray-500">
        <p>&copy; 2024 SAJ CAPS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
