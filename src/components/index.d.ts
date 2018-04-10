declare module 'elementsui-react' {
	import * as React from 'react';

	export interface LoggedInBarLabels {
        logout?: string;
        loggedInAs?: string;
    }

    export interface LoggedInBarProps {
        /**
         * Logged in user's name
         */
        name?: string;
        /**
         * Log ou mouse click event handler
         */
        handleLogoutClick?: (...args: any[])=>any;
        /**
         * Labels
         */
        labels?: LoggedInBarLabels;
    }

    export const LoggedInBar: React.SFC<LoggedInBarProps>;


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
        /**
         * Aria description for SR
         */
        ariaDescription?: string;
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


export interface SpinnerProps {
        /**
         * Spinner label
         */
        label?: string;
    }

    export const Spinner: React.SFC<SpinnerProps>;


export interface LabelProps {
        /**
         * Label required
         */
        required?: boolean;
        /**
         * Label disabled
         */
        disabled?: boolean;
        /**
         * Label
         */
        label?: any;
    }

    export const Label: React.SFC<LabelProps>;


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


export interface TenantSelectorTenants {
        _id?: string;
        _childId?: string;
        _scope?: string;
        ncoreclient?: {
            BaseUrl?: string;
        };
        elements?: {
            Authentication_BaseUrl?: string;
            Authentication_DefaultProvider?: string;
        };
    }

    export interface TenantSelectorLabels {
        login?: string;
        logout?: string;
        selectTenant?: string;
        loggedInAs?: string;
    }

    export interface TenantSelectorProps {
        /**
         * List of tenant configs
         */
        tenants?: TenantSelectorTenants[];
        /**
         * Logged in user's name
         */
        name?: string;
        /**
         * Is logged in
         */
        isLoggedIn?: boolean;
        /**
         * Selected tenant changed event handler
         */
        onChange?: (...args: any[])=>any;
        /**
         * Log in mouse click event handler
         */
        handleLoginClick?: (...args: any[])=>any;
        /**
         * Log ou mouse click event handler
         */
        handleLogoutClick?: (...args: any[])=>any;
        /**
         * Is spinner visible
         */
        isSpinnerVisible?: boolean;
        /**
         * Labels
         */
        labels?: TenantSelectorLabels;
    }

    export default class TenantSelector extends React.Component<TenantSelectorProps, any> {
        render(): JSX.Element;

    }

}
