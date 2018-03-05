/* Auto-generated code. Do not modify manually */declare module 'Button' {
    import * as React from 'react';

    export interface ButtonProps {
        /**
         * Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing.
         */
        htmlId: string;
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

declare module 'InputField' {
    import * as React from 'react';

    export interface InputFieldProps {
        /**
         * Do you want a fancy placeholder?
         */
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        errorMessage?: string;
    }

    export default type InputField = React.SFC<InputFieldProps>;

}

