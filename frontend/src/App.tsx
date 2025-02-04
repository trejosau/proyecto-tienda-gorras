import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
<<<<<<< HEAD
import DashboardPage from './pages/DashboardPage'; // Corregido el nombre
=======
import RegisterPage from './pages/RegisterPage';
>>>>>>> 9a1bbbdb13777dc88acb5f9fa3fb31944aabe1dc

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/Productos" element={<ProductsPage />} />
<<<<<<< HEAD
                    <Route
                        path="/dashboard"
                        element={
                            ["admin", "deliveryman"].includes(localStorage.getItem("role") || "")
                            ? <DashboardPage role={localStorage.getItem("role") as "admin" | "deliveryman"} />
                            : <Navigate to="/login" />
                        }
                    />
=======
                    <Route path="/register" element={<RegisterPage />} />
>>>>>>> 9a1bbbdb13777dc88acb5f9fa3fb31944aabe1dc
                </Routes>
            </div>
        </Router>
    );
};

export default App;
