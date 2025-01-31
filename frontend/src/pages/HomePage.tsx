import React from "react";
import Header from "../components/Header"; 
import { motion } from 'framer-motion';


const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">




<Header />
      
<main className="flex flex-col md:flex-row items-center justify-between text-left px-6 py-20 max-w-6xl mx-auto gap-10">
  {/* Contenido a la izquierda */}
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
      href="/Productos" 
      className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1, delay: 0.6 }}
    >
      Explorar Ahora
    </motion.a>
  </div>

  {/* Imagen a la derecha */}
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
</main>


      
      <section id="products" className="w-full py-20 text-center">
        <h3 className="text-5xl font-bold mb-12">Nuestros Productos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold mb-2">Gorra Clásica</h4>
            <p className="text-gray-400">Diseño icónico en negro y blanco.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold mb-2">Gorra Estilo Urbano</h4>
            <p className="text-gray-400">Un look moderno y sofisticado.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold mb-2">Gorra Premium</h4>
            <p className="text-gray-400">Materiales de alta calidad y detalles exclusivos.</p>
          </div>
        </div>
      </section>
      
      <footer className="w-full py-6 text-center border-t border-gray-700 text-gray-500">
        <p>&copy; 2024 SAJ CAPS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
