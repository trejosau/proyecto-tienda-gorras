import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardPage from './pages/DashboardPage'; // Corregido el nombre

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/Productos" element={<ProductsPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            ["admin", "deliveryman"].includes(localStorage.getItem("role") || "")
                            ? <DashboardPage role={localStorage.getItem("role") as "admin" | "deliveryman"} />
                            : <Navigate to="/login" />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
