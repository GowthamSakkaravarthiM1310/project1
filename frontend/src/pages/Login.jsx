import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(email, password);
            const role = data.roles[0];
            if (role === 'DONOR') navigate('/donor');
            else if (role === 'BLOOD_BANK') navigate('/bank');
            else if (role === 'HOSPITAL') navigate('/hospital');
            else navigate('/');
        } catch (err) {
            setError('Login failed. Please check credentials.');
            console.error(err);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to your account</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p className="auth-footer">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};
export default Login;
