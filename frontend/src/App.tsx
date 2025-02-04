import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';

// Componente ProtectedRoute
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const role = localStorage.getItem("role");

    // Verifica si el rol es 'admin' o 'deliveryman', si es así, muestra el contenido.
    if (role === "admin" || role === "deliveryman") {
        return <>{children}</>;
    }

    // Si no, redirige al login.
    return <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                {/* Aquí protegemos la ruta de dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage role={localStorage.getItem("role") as "admin" | "deliveryman"} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};

export default App;
