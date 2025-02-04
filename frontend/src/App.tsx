import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";

// Componente ProtectedRoute
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const role = localStorage.getItem("userRole");

    if (role === "admin" || role === "deliveryman") {
        return <>{children}</>;
    }

    return <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/catalogo" element={<ProductsPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage role={localStorage.getItem("userRole") as "admin" | "deliveryman"} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
