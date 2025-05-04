import { Core } from '@strapi/strapi';
import { sanitizeConfigInput } from '../content-types/config';
import { Config } from 'src/interface';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async index(ctx: any) {
        const config: Config = await strapi
            .plugin('strapi-google-maps')
            .service('config')
            .retrieve();

        ctx.body = config;
    },

    async update(ctx: any) {
        const data: Config = await sanitizeConfigInput(ctx.request.body, ctx);

        const config: Config = await strapi
            .plugin('strapi-google-maps')
            .service('config')
            .update(data);

        ctx.body = config;

    },
});