import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://customer-support-crm-api.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTickets = async (statusFilter = '', searchQuery = '') => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (searchQuery) params.search = searchQuery;

    const response = await api.get('/api/tickets', { params });
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await api.get(`/api/tickets/${id}`);
    return response.data;
};

export const createTicket = async (ticketData) => {
    const response = await api.post('/api/tickets', ticketData);
    return response.data;
};

export const updateTicket = async (id, updateData) => {
    const response = await api.put(`/api/tickets/${id}`, updateData);
    return response.data;
};

export default api;