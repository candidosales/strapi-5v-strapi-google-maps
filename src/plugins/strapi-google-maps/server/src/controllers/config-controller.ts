import { Core } from '@strapi/strapi';
import { sanitizeConfigInput } from '../content-types/config';
import { Config } from 'src/interface';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async index(ctx: any) {
        const config: Config = await strapi
            .plugin('google-maps')
            .service('config')
            .retrieve();

        ctx.body = {
            data: config,
        };
    },

    async update(ctx: any) {
        console.log('update - ctx', ctx);
        // TODO - Fix sanitizeConfigInput
        const data: Config = await sanitizeConfigInput(ctx.request.body, ctx);

        const config: Config = await strapi
            .plugin('google-maps')
            .service('config')
            .update(data);

        ctx.body = {
            data: config,
        };
    },
});