import axios from 'axios';

export const pmApi = axios.create({
    baseURL: 'http://localhost:3000/api',
});

