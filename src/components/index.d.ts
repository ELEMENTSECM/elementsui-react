/* Auto-generated code. Do not modify manually */declare module 'Spinner' {
    import * as React from 'react';

    export interface SpinnerProps {
        /**
         * Spinner label
         */
        label?: any;
    }

    export default type Spinner = React.SFC<SpinnerProps>;

}

declare module 'Button' {
    import * as React from 'react';

    export interface ButtonProps {
        /**
         * Button label
         */
        label?: any;
        /**
         * Button is disabled
         */
        disabled?: any;
    }

    export default type Button = React.SFC<ButtonProps>;

}

declare module 'Checkbox' {
    import * as React from 'react';

    export interface CheckboxProps {
        /**
         * Checkbox label
         */
        label?: any;
        /**
         * Checkbox is disabled
         */
        disabled?: any;
        /**
         * Checkbox description
         */
        ariaDescribedBy?: any;
    }

    export default type Checkbox = React.SFC<CheckboxProps>;

}

declare module 'InputField' {
    import * as React from 'react';

    export interface InputFieldProps {
        /**
         * Input field placeholder text
         */
        placeholder?: any;
        /**
         * Input field is marked with red asterisk as required if set to true
         */
        required?: any;
        /**
         * Input field is disabled is set to true
         */
        disabled?: any;
        /**
         * Error message shown under the input field
         */
        errorMessage?: any;
    }

    export default type InputField = React.SFC<InputFieldProps>;

}

declare module 'Toggle' {
    import * as React from 'react';

    export interface ToggleProps {
        /**
         * Toggle label
         */
        label?: any;
        /**
         * Toggle is disabled
         */
        disabled?: any;
        /**
         * Toggle description
         */
        ariaDescribedBy?: any;
        /**
         * Toggle checked
         */
        defaultChecked?: any;
    }

    export default type Toggle = React.SFC<ToggleProps>;

}

