import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/Productos" element={<ProductsPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    )
};

export default App;