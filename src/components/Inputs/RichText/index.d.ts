import * as React from "react";

export interface RichTextProps {
	config?: Object;
	onChange?: (...args: any[]) => any;
}

export default class RichText extends React.Component<RichTextProps, any> {
	render(): JSX.Element;
}
