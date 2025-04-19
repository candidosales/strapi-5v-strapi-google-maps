import { sanitize } from '@strapi/utils';
import { Config } from '@strapi/utils/dist/types';

export default {
    kind: 'singleType',
    collectionName: 'google_maps_configs',
    info: {
        singularName: 'config',
        pluralName: 'configs',
        displayName: 'Google Maps Config',
    },
    options: {
        draftAndPublish: false,
    },
    pluginOptions: {
        'content-manager': {
            visible: false,
        },
        'content-type-builder': {
            visible: false,
        },
    },
    attributes: {
        googleMapsKey: {
            type: 'string',
            default: '',
            required: true,
            configurable: false,
        },
    },
};

// export function sanitizeConfigInput(data: object, ctx: any): Promise<Config> {
//     return contentAPI.input(data, this, ctx.state.auth);
// }
export function sanitizeConfigInput(data: object, ctx: any): Promise<Config> {
    return sanitize.input(data, this, ctx.state.auth);
}
