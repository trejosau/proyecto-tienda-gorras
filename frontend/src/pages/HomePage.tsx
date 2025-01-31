import React from "react";
import Header from "../components/Header"; // Ajusta la ruta según tu estructura


const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">




<Header />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-6xl font-extrabold">Eleva tu estilo</h2>
        <p className="mt-4 text-xl text-gray-300">Encuentra la gorra perfecta para cada ocasión.</p>
        <a href="#products" className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-300 transition">Explorar Ahora</a>
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
