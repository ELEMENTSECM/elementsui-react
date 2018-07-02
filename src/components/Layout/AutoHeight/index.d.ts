import * as React from 'react';

export interface AutoHeightProps {
	/**
	 * CSS selector for component's container element up in the DOM tree
	 */
	containerSelector?: string;
	/**
	 * Padding for component
	 */
	padding?: number;
	/**
	 * % of container's height to force on the component
	 */
	heightRelativeToParent?: number;
}

export default class AutoHeight extends React.Component<AutoHeightProps, any> {
	render(): JSX.Element;
}
