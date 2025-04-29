/*
 *
 * SettingsPage
 *
 */

import React from 'react';
import { Page } from '@strapi/strapi/admin';
import { PLUGIN_ID } from 'src/pluginId';
import Settings from 'src/components/Settings';

const permissions = [{ action: `plugin::${PLUGIN_ID}.config`, subject: null }];

const SettingsPage = () => {
    return (
        <Page.Protect permissions={permissions}>
            <Settings />
        </Page.Protect>
    );
};

export default SettingsPage;