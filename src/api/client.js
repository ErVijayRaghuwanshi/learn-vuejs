import axios from 'axios';

const client = axios.create({
    // baseURL: 'http://localhost:8080/api',
    // Change this to match your Vue port (or just use /api)
    baseURL: '/api',
    headers: {
        'accept': 'application/json'
    }
});

export default client;