import axios from 'axios';
import {getAuthToken} from '../auth';

export const createApiClient = baseURL => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Request interceptor
    instance.interceptors.request.use(async config => {
        const token = await getAuthToken();
        if (!token) {
            return Promise.reject(new Error('Not authorized!'));
        }

        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    // Response interceptor
    instance.interceptors.response.use(
        response => response.data,
        error => Promise.reject(error.response)
    );

    return instance;
};
