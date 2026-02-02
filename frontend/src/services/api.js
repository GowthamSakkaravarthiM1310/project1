import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    login: (email, password) => {
        return api.post('/auth/login', { email, password });
    },
    register: (userData) => {
        return api.post('/auth/signup', userData); // Corrected endpoint to /signup based on Controller
    }
};

export const donationService = {
    createDonation: (data) => api.post('/donations', data),
    getMyDonations: () => api.get('/donations/my'),
    getAllDonations: () => api.get('/donations/all')
};

export const requestService = {
    createRequest: (data) => api.post('/requests', data),
    getMyRequests: () => api.get('/requests/my'),
    getAllRequests: () => api.get('/requests/all')
};

export default api;
