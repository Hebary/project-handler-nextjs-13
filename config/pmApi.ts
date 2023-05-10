import axios from 'axios';

export const pmApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});

