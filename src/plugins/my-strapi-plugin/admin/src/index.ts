import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

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

        app.customFields.register({
            name: 'Google-Maps',
            pluginId: 'google-maps',
            type: 'json',
            intlLabel: {
                id: 'google-maps.input.label',
                defaultMessage: name,
            },
            intlDescription: {
                id: 'google-maps.input.description',
                defaultMessage: 'Pick your location',
            },
            icon: PluginIcon,
            components: {
                Input: async () =>
                    import(
                  /* webpackChunkName: "input-component" */ './components/Input'
                    ),
            },
            options: {
                advanced: [
                    {
                        name: 'optionsDefaultLat',
                        type: 'string',
                        intlLabel: {
                            id: 'google-maps.attribute.item.defaultLat',
                            defaultMessage: 'Default latitude',
                        },
                    },
                    {
                        name: 'optionsDefaultLng',
                        type: 'string',
                        intlLabel: {
                            id: 'google-maps.attribute.item.defaultLng',
                            defaultMessage: 'Default longitude',
                        },
                    },
                    {
                        sectionTitle: {
                            id: 'global.settings',
                            defaultMessage: 'Settings',
                        },
                        items: [
                            {
                                name: 'required',
                                type: 'checkbox',
                                intlLabel: {
                                    id: 'form.attribute.item.requiredField',
                                    defaultMessage: 'Required field',
                                },
                                description: {
                                    id: 'form.attribute.item.requiredField.description',
                                    defaultMessage:
                                        "You won't be able to create an entry if this field is empty",
                                },
                            },
                        ],
                    },
                ],
            },
        });

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
