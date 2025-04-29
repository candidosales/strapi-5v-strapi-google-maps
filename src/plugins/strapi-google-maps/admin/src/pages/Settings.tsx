/*
 *
 * SettingsPage
 *
 */

import React from 'react';
import { Page } from '@strapi/strapi/admin';
import { Settings } from '../components/Settings';
import { PLUGIN_ID } from '../pluginId';

const permissions = [{ action: `plugin::${PLUGIN_ID}.config`, subject: null }];

const SettingsPage = () => {
    return (
        <Page.Protect permissions={permissions}>
            <Settings />
        </Page.Protect>
    );
};

export { SettingsPage };