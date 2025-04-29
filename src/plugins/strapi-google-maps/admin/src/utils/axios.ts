import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { PLUGIN_ID } from '../pluginId';
import { useAuth } from '@strapi/strapi/admin';
import { Config } from '../../../server/src/interface';

const useAxios = (): AxiosInstance => {
    const token = useAuth('ConfigurationProvider', (state) => state.token);

    const instance = axios.create({
        baseURL: `${process.env.STRAPI_ADMIN_BACKEND_URL}/${PLUGIN_ID}`,
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

export const getConfig = (): Promise<AxiosResponse> => useAxios().get('/config');

export const updateConfig = (config: Config): Promise<AxiosResponse> =>
    useAxios().put('/config', {
        data: config,
    });
