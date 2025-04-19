import axios from 'axios';
import { PLUGIN_ID } from '../pluginId';
import { auth } from '@strapi/helper-plugin';

export default axios.create({
    baseURL: `http://localhost:1337/${PLUGIN_ID}`,
    headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        'Content-Type': 'application/json',
    },
});