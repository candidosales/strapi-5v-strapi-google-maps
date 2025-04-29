import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
    strapi.customFields.register({
        name: 'Google-Maps',
        plugin: 'google-maps',
        type: 'json',
    });
};

export default register;
