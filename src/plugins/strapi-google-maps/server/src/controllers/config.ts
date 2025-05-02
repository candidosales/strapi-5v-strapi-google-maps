import { Core } from '@strapi/strapi';
import { sanitizeConfigInput } from '../content-types/config';
import { Config } from 'src/interface';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async index(ctx: any) {
        const config: Config = await strapi
            .plugin('strapi-google-maps')
            .service('config')
            .retrieve();

        ctx.body = {
            data: config,
        };
    },

    async update(ctx: any) {
        console.log('update - ctx', ctx);
        const data: Config = await sanitizeConfigInput(ctx.request.body, ctx);
        console.log('update - data', data);

        const config: Config = await strapi
            .plugin('strapi-google-maps')
            .service('config')
            .update(data);

        console.log('update - config', config);

        ctx.body = {
            data: config,
        };
    },
});