import React, { useState, useEffect } from 'react';
import { donationService, requestService } from '../services/api';

const BloodBankDashboard = () => {
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('requests');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [donRes, reqRes] = await Promise.all([
                donationService.getAllDonations(),
                requestService.getAllRequests()
            ]);
            setDonations(donRes.data);
            setRequests(reqRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Blood Bank Dashboard</h1>

            <div className="tabs">
                <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>Blood Requests</button>
                <button className={activeTab === 'donations' ? 'active' : ''} onClick={() => setActiveTab('donations')}>Donations Available</button>
            </div>

            <div className="content-area">
                {activeTab === 'requests' ? (
                    <div className="card">
                        <h3>All Blood Requests</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Hospital</th>
                                    <th>City</th>
                                    <th>Group</th>
                                    <th>Units</th>
                                    <th>Patient</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.requestDate}</td>
                                        <td>{r.hospital ? r.hospital.name : 'Unknown'}</td>
                                        <td>{r.city}</td>
                                        <td>{r.bloodGroup}</td>
                                        <td>{r.units}</td>
                                        <td>{r.patientName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="card">
                        <h3>All Donations</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Donor</th>
                                    <th>City</th>
                                    <th>Group</th>
                                    <th>Disease</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map(d => (
                                    <tr key={d.id}>
                                        <td>{d.donationDate}</td>
                                        <td>{d.donor ? d.donor.name : 'Unknown'}</td>
                                        <td>{d.city}</td>
                                        <td>{d.bloodGroup}</td>
                                        <td>{d.disease}</td>
                                        <td>{d.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodBankDashboard;
