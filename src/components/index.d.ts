declare module 'elementsui-react' {
	import * as React from 'react';

	export interface SpinnerProps {
        /**
         * Spinner label
         */
        label?: string;
    }

    export const Spinner: React.SFC<SpinnerProps>;


export interface CheckboxProps {
        /**
         * Checkbox label
         */
        label?: string;
        /**
         * Checkbox is disabled
         */
        disabled?: boolean;
        /**
         * Checkbox description
         */
        ariaDescribedBy?: string;
    }

    export const Checkbox: React.SFC<CheckboxProps>;


export interface ButtonProps {
        /**
         * Button label
         */
        label?: string;
        /**
         * Button is disabled
         */
        disabled?: boolean;
        /**
         * Mouse click event handler
         */
        onCLick?: (...args: any[])=>any;
    }

    export const Button: React.SFC<ButtonProps>;


export interface DropdownOptions {
        key: any;
        text: string;
        isSelected?: boolean;
    }

    export interface DropdownProps {
        /**
         * DOM element id
         */
        id?: string;
        /**
         * Dropdown label
         */
        label?: string;
        /**
         * The key of the selected element
         */
        selectedKey?: any;
        /**
         * Default placeholder
         */
        placeHolder?: string;
        /**
         * Dropdown options
         */
        options: DropdownOptions[];
        /**
         * onChange event handler function
         */
        onChange?: (...args: any[])=>any;
    }

    export const Dropdown: React.SFC<DropdownProps>;


export interface InputFieldProps {
        /**
         * Input field placeholder text
         */
        placeholder?: string;
        /**
         * Input field is marked with red asterisk as required if set to true
         */
        required?: boolean;
        /**
         * Input field is disabled is set to true
         */
        disabled?: boolean;
        /**
         * Error message shown under the input field
         */
        errorMessage?: string;
    }

    export const InputField: React.SFC<InputFieldProps>;


export interface ToggleProps {
        /**
         * Toggle label
         */
        label?: string;
        /**
         * Toggle is disabled
         */
        disabled?: boolean;
        /**
         * Toggle description
         */
        ariaDescribedBy?: string;
        /**
         * Toggle checked
         */
        defaultChecked?: boolean;
    }

    export const Toggle: React.SFC<ToggleProps>;


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

}
