import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';

export default {
    register(app: any) {
        app.createSettingSection(
            {
                id: PLUGIN_ID,
                intlLabel: {
                    id: `${PLUGIN_ID}.plugin.name`,
                    defaultMessage: 'Google Maps',
                },
            }, // Section to create
            [
                // links
                {
                    intlLabel: {
                        id: `${PLUGIN_ID}.plugin.name`,
                        defaultMessage: 'Configuration',
                    },
                    id: PLUGIN_ID,
                    to: '/settings/google-maps',
                    Component: async () => {
                        const component = await import(
                    /* webpackChunkName: "settings-page" */ './pages/Settings'
                        );

                        return component;
                    },
                    permissions: [
                        { action: 'plugin::google-maps.config', subject: null },
                    ],
                },
            ]
        );

        app.registerPlugin({
            id: PLUGIN_ID,
            initializer: Initializer,
            isReady: false,
            name: PLUGIN_ID,
        });
    },

    async registerTrads({ locales }: { locales: string[] }) {
        return Promise.all(
            locales.map(async (locale) => {
                try {
                    const { default: data } = await import(`./translations/${locale}.json`);

                    return { data, locale };
                } catch {
                    return { data: {}, locale };
                }
            })
        );
    },
};
