import React from "react";


type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title = "SAJ CAPS" }) => {
  return (
<header className="w-full p-6 flex justify-between items-center border-b border-gray-700">
  <a href="/" className="text-4xl font-bold tracking-wide flex items-center space-x-4">
    <img 
      src="/images/SAJ CAPS.png" 
      alt="Logo SAJ CAPS" 
      className="h-auto w-auto max-h-12 max-w-28 object-contain"
    />
    <span>{title}</span>
  </a>  
  <nav>
    <ul className="flex space-x-8 text-lg">
      <li>
        <a href="/Productos" className="hover:text-gray-400 transition">Productos</a>
      </li>
      <li>
        <a href="#about" className="hover:text-gray-400 transition">Nosotros</a>
      </li>
      <li>
        <a href="/login">Carrito GG papa</a>
      </li>
      <li>
        <a href="/login" className="px-8 py-4 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-300 transition">
          Login
        </a>
      </li>
    </ul>
  </nav>
</header>

  );
};

export default Header;
