import * as React from 'react';

export interface LoginAppConfig {
        configServerUrl: string;
        configServerAuth: string;
        configServerReq: string;
        idpClient: string;
        baseUri: string;
        idpRedirectUri: string;
        extSystemName: string;
    }

    export interface LoginLabels {
        login?: string;
        logout?: string;
        selectTenant?: string;
        loggedInAs?: string;
    }

    export interface LoginProps {
        /**
         * ConfigServer settings
         */
        appConfig: LoginAppConfig;
        /**
         * Current ID token
         */
        currentIdToken?: string;
        /**
         * Current access token
         */
        currentAccessToken?: string;
        /**
         * Logged in person's name
         */
        name?: string;
        /**
         * Redux actions
         */
        actions?: Object;
        /**
         * Labels
         */
        labels?: LoginLabels;
    }

    export default class Login extends React.Component<LoginProps, any> {
        render(): JSX.Element;

    }
