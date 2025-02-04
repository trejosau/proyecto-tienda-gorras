import React, { useState } from "react";
import { registerClient, registerDeliveryMan } from "../services/authService"; // Asumiendo que tienes este servicio

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isDelivery, setIsDelivery] = useState(false); // Estado para el checkbox
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const role = isDelivery ? "deliveryPerson" : ""; // Vacío para cliente

            // Perform the registration based on role (await the result to ensure the action completes before redirect)
            if (isDelivery) {
                await registerDeliveryMan(
                    username,
                    password,
                    email,
                    phone,
                    name,
                    lastName,
                    role
                );
            } else {
                await registerClient(
                    username,
                    password,
                    email,
                    phone,
                    name,
                    lastName,
                    role // Role vacío para cliente
                );
            }

            // Redirect to the appropriate page after successful registration
            window.location.href = "/";

        } catch (err: any) {
            setError(err.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-black text-white min-h-screen flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6">Registrarse</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Correo Electrónico</label>
                        <input
                            type="email"
                            className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Teléfono</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Nombre</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Apellido</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-700 rounded focus:ring-2 focus:ring-gray-500 text-white"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isDelivery"
                            className="mr-2 rounded focus:ring-2 focus:ring-gray-500"
                            checked={isDelivery}
                            onChange={() => setIsDelivery(!isDelivery)}
                        />
                        <label htmlFor="isDelivery" className="text-gray-400">
                            Registrarme como repartidor
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-3 bg-white text-black rounded font-semibold transition ${
                                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                            }`}
                        >
                            {loading ? "Registrando..." : "Registrarse"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
