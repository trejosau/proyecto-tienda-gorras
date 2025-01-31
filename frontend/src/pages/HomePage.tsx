import React from "react";
import Header from "../components/Header";
import ProductSection from "../components/ProductSection";

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-6xl font-extrabold">Eleva tu estilo</h2>
        <p className="mt-4 text-xl text-gray-300">Encuentra la gorra perfecta para cada ocasión.</p>
        <a href="#products" className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-300 transition">Explorar Ahora</a>
      </main>
      <ProductSection />
      <footer className="w-full py-6 text-center border-t border-gray-700 text-gray-500">
        <p>&copy; 2024 SAJ CAPS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;