import React, { useState, useEffect } from 'react';
import {
    Loader,
    TextInput,
    Box,
    Button,
    Link,
    Grid,
} from '@strapi/design-system';
import { Check } from '@strapi/icons';
import useConfig from '../../hooks/useConfig';
import { Config, UpdateConfig } from '../../../../types';
import { Layouts, Page, useAuth } from '@strapi/strapi/admin';

export default function Settings() {
    const [saveConfig, setSaveConfig] = useState<UpdateConfig | undefined>();

    const [inputFields, setInputFields] = useState<UpdateConfig | undefined>();

    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const token = useAuth('ConfigurationProvider', (state) => state.token);
    const config = useConfig(token ?? '', saveConfig);

    useEffect(() => {
        if (!!config) {
            setInputFields(config);
        }
    }, [config]);

    useEffect(() => {
        if (!inputFields || !config) return;

        const inputFieldChanged = Object.entries(inputFields).some(
            ([key, value]) => value !== config[key as keyof Config]
        );

        setUnsavedChanges(inputFieldChanged);
    }, [inputFields]);

    const onSave = () => {
        setUnsavedChanges(false);

        setSaveConfig(inputFields);
    };

    return (

        <Page.Main aria-busy={config === undefined}>
            <Layouts.Header
                primaryAction={
                    <Button
                        startIcon={<Check />}
                        loading={config === undefined}
                        disabled={!unsavedChanges}
                        onClick={onSave}
                    >
                        Save
                    </Button>
                }
                title='Google Maps Configuration'
                subtitle='Configure your Google Maps API key and other settings'
            />

            <Layouts.Content>
                {config === null ? (
                    <Page.Error />
                ) : config === undefined || !inputFields ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loader />
                    </div>
                ) : (
                    <Box
                        shadow='tableShadow'
                        background='neutral0'
                        paddingTop={6}
                        paddingLeft={7}
                        paddingRight={7}
                        paddingBottom={6}
                        hasRadius
                    >
                        <TextInput
                            type='password'
                            id='apiKey'
                            name='apiKey'
                            placeholder='Paste your Google Maps API key here'
                            label='API Key'
                            value={inputFields.googleMapsKey}
                            onChange={(e: any) => {
                                setInputFields({
                                    ...inputFields,
                                    googleMapsKey: e.target.value,
                                });
                            }}
                        />

                        <Grid.Root>
                            <Grid.Item col={5} padding={2}>
                                <Link
                                    href='https://developers.google.com/maps/documentation/javascript/cloud-setup'
                                    isExternal
                                >
                                    Get your Google Maps API key
                                </Link>
                            </Grid.Item>

                            <Grid.Item col={5} padding={2}>
                                <Link
                                    href='https://developers.google.com/maps/documentation/javascript/places'
                                    isExternal
                                >
                                    Grant your API key access to the Google Places API
                                </Link>
                            </Grid.Item>
                        </Grid.Root>
                    </Box>
                )}
            </Layouts.Content>
        </Page.Main>
    );
}