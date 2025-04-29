import axios from 'axios';
import { PLUGIN_ID } from '../pluginId';
import { useAuth } from '@strapi/strapi/admin';

const useAxios = () => {
    const token = useAuth('ConfigurationProvider', (state) => state.token);

    const instance = axios.create({
        baseURL: `http://localhost:1337/${PLUGIN_ID}`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add a request interceptor to set the Authorization header dynamically
    instance.interceptors.request.use(
        async (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

export default useAxios;