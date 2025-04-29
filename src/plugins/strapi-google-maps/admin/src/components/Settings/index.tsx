import React, { useState, useEffect } from 'react';
import {
    Main,
    ContentLayout,
    HeaderLayout,
    Layout,
    Loader,
    TextInput,
    Box,
    Button,
    Link,
    Grid,
    GridItem,
} from '@strapi/design-system';
import { Check } from '@strapi/icons';
import { AxiosResponse } from 'axios';
import { Config } from '../../../../server/src/interface';
import { PLUGIN_ID } from '../../pluginId';
import { Page, useNotification } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { getConfig, updateConfig } from '../../utils/axios';

const Settings = () => {
    const { toggleNotification } = useNotification();
    const { formatMessage } = useIntl();

    const [isLoading, setIsLoading] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);

    const [data, setData] = useState<Config>({
        id: 0,
        googleMapsKey: '',
    });
    const [madeChanges, setMadeChanges] = useState(false);

    /* Fetch plugin config using axios instance */
    useEffect(() => {
        getConfig()
            .then((response: AxiosResponse) => {
                setIsLoading(false);

                const { data: config }: { data: Config } = response.data;
                setData(config);
            })
            .catch((error: any) => {
                setIsLoading(false);

                console.error(error);

                setErrorOccurred(true);
            });
    }, []);

    /* Save plugin config using axios instance */
    const handleSave = async () => {
        setIsLoading(true);

        try {
            await updateConfig(data);

            setMadeChanges(false);

            toggleNotification({
                type: 'success',
                message: formatMessage({
                    id: `${PLUGIN_ID}.config.updated`,
                    defaultMessage: 'Configuration updated',
                }),
            });
        } catch (error) {
            console.error(error);

            toggleNotification({
                type: 'warning',
                message: formatMessage({
                    id: `${PLUGIN_ID}.error`,
                    defaultMessage: 'An error occurred',
                })
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box background='neutral100'>
            <Layout>
                <Main aria-busy={isLoading}>
                    <HeaderLayout
                        primaryAction={
                            <Button
                                startIcon={<Check />}
                                loading={isLoading}
                                disabled={errorOccurred || !madeChanges}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        }
                        title='Google Maps Configuration'
                        subtitle='Configure your Google Maps API key and other settings'
                    />

                    <ContentLayout>
                        {errorOccurred ? (
                            // @ts-ignore
                            <Page.Error content="An error occurred" icon={<div>Custom icon</div>} />
                        ) : isLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Loader>Loading content...</Loader>
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
                                    value={data.googleMapsKey}
                                    onChange={(e: any) => {
                                        setData({ ...data, googleMapsKey: e.target.value });
                                        setMadeChanges(true);
                                    }}
                                />

                                <Grid>
                                    <GridItem col={5} padding={2}>
                                        <Link
                                            href='https://developers.google.com/maps/documentation/javascript/cloud-setup'
                                            isExternal
                                        >
                                            Get your Google Maps API key
                                        </Link>
                                    </GridItem>

                                    <GridItem col={5} padding={2}>
                                        <Link
                                            href='https://developers.google.com/maps/documentation/javascript/places'
                                            isExternal
                                        >
                                            Grant your API key access to the Google Places API
                                        </Link>
                                    </GridItem>
                                </Grid>
                            </Box>
                        )}
                    </ContentLayout>
                </Main>
            </Layout>
        </Box>
    );
};

export { Settings };