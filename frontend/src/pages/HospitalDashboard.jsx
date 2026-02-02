import React, { useState, useEffect } from 'react';
import { requestService } from '../services/api';

const HospitalDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        units: 1,
        city: '',
        district: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await requestService.getMyRequests();
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await requestService.createRequest(formData);
            setMessage("Blood Request submitted successfully!");
            fetchRequests();
            setFormData({ patientName: '', bloodGroup: '', units: 1, city: '', district: '' });
        } catch (error) {
            setMessage("Failed to submit request.");
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Hospital Dashboard</h1>

            <div className="card form-section">
                <h3>Request Blood</h3>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Patient Name</label>
                        <input name="patientName" value={formData.patientName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Blood Group Needed</label>
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
                        <label>Units Required</label>
                        <input type="number" name="units" value={formData.units} onChange={handleChange} min="1" required />
                    </div>
                    <button type="submit" className="btn-primary">Submit Request</button>
                </form>
            </div>

            <div className="card list-section">
                <h3>Request History</h3>
                {requests.length === 0 ? (
                    <p>No requests made yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Patient</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(r => (
                                <tr key={r.id}>
                                    <td>{r.requestDate}</td>
                                    <td>{r.patientName}</td>
                                    <td>{r.bloodGroup}</td>
                                    <td>{r.units}</td>
                                    <td>
                                        <span className={`status ${r.status?.toLowerCase()}`}>{r.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default HospitalDashboard;
