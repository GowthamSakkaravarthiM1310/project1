import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import BloodBankDashboard from './pages/BloodBankDashboard';
import HospitalDashboard from './pages/HospitalDashboard';

const Home = () => <Navigate to="/login" replace />;

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/donor" element={<DonorDashboard />} />
                <Route path="/bank" element={<BloodBankDashboard />} />
                <Route path="/hospital" element={<HospitalDashboard />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
