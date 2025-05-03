import { useEffect, useState } from 'react';
import { Config, UpdateConfig } from '../../../types';
import { AxiosResponse } from 'axios';
import useAxios from '../utils/axios';

const endpoint = '/config';

export default function useConfig(token = '', newConfig?: UpdateConfig) {
    const [config, setConfig] = useState<Config | undefined | null>();

    const onResponse = ({ data }: AxiosResponse) => setConfig(data);

    const onError = (error: Error) => {
        console.error(error);
        setConfig(null);
    };

    useEffect(() => {
        useAxios(token).get(endpoint).then(onResponse).catch(onError);
    }, []);

    useEffect(() => {
        if (newConfig) {
            setConfig(undefined);

            useAxios(token).put(endpoint, { data: newConfig }).then(onResponse).catch(onError);
        }
    }, [newConfig]);

    return config;
}