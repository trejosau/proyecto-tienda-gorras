import React, { useState } from "react";
import Header from "../components/Header"; 
import { div } from "framer-motion/client";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div  className="bg-black text-white min-h-screen flex flex-col">
      <Header />
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-gray-400">Correo Electrónico</label>
          <input
            type="email"
            className="p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label className="mb-2 text-gray-400">Contraseña</label>
          <input
            type="password"
            className="p-3 mb-6 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button
            type="submit"
            className="bg-white text-black py-3 rounded font-bold hover:bg-gray-300 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
