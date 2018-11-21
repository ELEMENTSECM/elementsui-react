import * as React from "react";

export interface RichTextProps {
	/**
	 * Root div's id
	 */
	id?: string;
	/**
	 * Current value
	 */
	value?: string;
	/**
	 * CKEditor configuration object
	 */
	config?: Object;
	/**
	 * Event handlers { [eventName: string]: (e) => any }
	 */
	events?: Object;
	/**
	 * URL of ckeditor.js file. It is loaded from CDN by default.
	 */
	scriptUrl?: string;
	/**
	 * Root div's class
	 */
	className?: string;
	/**
	 * Throttle delay in milliseconds
	 */
	throttle?: number;
}

export default class RichText extends React.Component<RichTextProps, any> {
	render(): JSX.Element;
}
