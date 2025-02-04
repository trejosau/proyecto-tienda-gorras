import React, { useState } from "react";
import Header from "../components/Header";
import { loginUser } from "../services/authService";

// Función para redirigir al usuario según su rol
const redirectUser = (role: string | null) => {
  const routes: { [key: string]: string } = {
    admin: "/dashboard",
    deliveryman: "/dashboard",
    client: "/",
  };

  window.location.href = routes[role as keyof typeof routes] || "/";
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { token, role } = await loginUser(email, password);

      // Guardar el token y el rol en localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      // Redirigir al usuario según su rol
      redirectUser(role);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="mb-2 text-gray-400">Correo Electrónico</label>
              <input
                  type="email"
                  className="p-3 mb-4 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <label className="mb-2 text-gray-400">Contraseña</label>
              <input
                  type="password"
                  className="p-3 mb-6 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <button
                  type="submit"
                  disabled={loading}
                  className={`bg-white text-black py-3 rounded font-bold transition ${
                      loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                  }`}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
              <a href="/register" className="text-center text-gray-400 hover:text-gray-500 mt-4">
                ¿No tienes cuenta? Regístrate
              </a>
            </form>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
