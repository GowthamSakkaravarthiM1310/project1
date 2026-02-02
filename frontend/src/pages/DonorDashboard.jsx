import React, { useState, useEffect } from 'react';
import { donationService } from '../services/api';

const DonorDashboard = () => {
    const [donations, setDonations] = useState([]);
    const [formData, setFormData] = useState({
        bloodGroup: '',
        disease: 'None',
        city: '', // Optional override
        district: '' // Optional override
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await donationService.getMyDonations();
            setDonations(response.data);
        } catch (error) {
            console.error("Error fetching donations", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await donationService.createDonation(formData);
            setMessage("Donation recorded successfully!");
            fetchDonations(); // Refresh list
            setFormData({ bloodGroup: '', disease: 'None', city: '', district: '' });
        } catch (error) {
            setMessage("Failed to record donation.");
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Donor Dashboard</h1>

            <div className="card form-section">
                <h3>Donate Blood</h3>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Blood Group</label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                            <option value="">Select Group</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="AB+">AB+</option>
                            <option value="O+">O+</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="AB-">AB-</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Any Disease?</label>
                        <input name="disease" value={formData.disease} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-primary">Submit Donation</button>
                </form>
            </div>

            <div className="card list-section">
                <h3>My Donation History</h3>
                {donations.length === 0 ? (
                    <p>No donations recorded yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(d => (
                                <tr key={d.id}>
                                    <td>{d.donationDate}</td>
                                    <td>{d.bloodGroup}</td>
                                    <td>
                                        <span className={`status ${d.status?.toLowerCase()}`}>{d.status}</span>
                                    </td>
                                    <td>{d.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DonorDashboard;
