import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'DONOR',
        contactNumber: '', address: '', city: '', bloodGroup: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Email might be in use.');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container register-container">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="DONOR">Donor</option>
                                <option value="BLOOD_BANK">Blood Bank</option>
                                <option value="HOSPITAL">Hospital</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" placeholder="Full Name / Bank Name" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input name="contactNumber" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input name="city" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" onChange={handleChange} required />
                        </div>
                        {formData.role === 'DONOR' && (
                            <div className="form-group">
                                <label>Blood Group</label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                                    <option value="">Select Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn-primary">Register</button>
                </form>
                <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};
export default Register;
