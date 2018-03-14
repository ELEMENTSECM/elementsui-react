/* Auto-generated code. Do not modify manually */declare module 'Spinner' {
    import * as React from 'react';

    export interface SpinnerProps {
        /**
         * Spinner label
         */
        label?: string;
    }

    export default type Spinner = React.SFC<SpinnerProps>;

}

declare module 'Button' {
    import * as React from 'react';

    export interface ButtonProps {
        /**
         * Button label
         */
        label?: string;
        /**
         * Button is disabled
         */
        disabled?: boolean;
    }

    export default type Button = React.SFC<ButtonProps>;

}

declare module 'Checkbox' {
    import * as React from 'react';

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

    export default type Checkbox = React.SFC<CheckboxProps>;

}

declare module 'InputField' {
    import * as React from 'react';

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

    export default type InputField = React.SFC<InputFieldProps>;

}

declare module 'Toggle' {
    import * as React from 'react';

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

    export default type Toggle = React.SFC<ToggleProps>;

}

