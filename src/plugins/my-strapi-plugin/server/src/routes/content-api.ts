export default [
    {
        method: 'GET',
        path: '/config',
        // name of the controller file & the method.
        handler: 'config.index',
        config: {
            policies: ['admin::isAuthenticatedAdmin'],
        },
    },
    {
        method: 'PUT',
        path: '/config',
        handler: 'config.update',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::google-maps.config'],
                    },
                },
            ],
        },
    },
];
