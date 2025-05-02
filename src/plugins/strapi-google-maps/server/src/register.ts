import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
    strapi.customFields.register({
        name: 'location-picker',
        plugin: 'strapi-google-maps',
        type: 'json',
    });
};

export default register;
