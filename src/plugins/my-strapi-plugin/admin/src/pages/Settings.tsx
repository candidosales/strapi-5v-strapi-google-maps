/*
 *
 * SettingsPage
 *
 */

import React from 'react';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import { PLUGIN_ID } from 'src/pluginId';
import Settings from 'src/components/Settings';

const permissions = [{ action: `plugin::${PLUGIN_ID}.config`, subject: null }];

const SettingsPage = () => {
    return (
        <CheckPagePermissions permissions={permissions}>
            <Settings />
        </CheckPagePermissions>
    );
};

export default SettingsPage;