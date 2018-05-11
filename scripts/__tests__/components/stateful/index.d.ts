import * as React from 'react';

export interface StatefulProps {
	/**
	 * Stateful label
	 */
	label?: string;
}

export default class Stateful extends React.Component<StatefulProps, any> {
	render(): JSX.Element;
}
