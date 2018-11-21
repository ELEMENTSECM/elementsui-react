import * as React from "react";

export interface LookupDialogProps {
	/**
	 * Callback executed when a dialog is closed
	 */
	close?: (...args: any[]) => any;
	/**
	 * Abolute or fixed positioning for a dialog
	 */
	position?: string;
	/**
	 * Enabled drag n drop for a diealog
	 */
	isDraggable?: boolean;
}

export class LookupDialog extends React.Component<LookupDialogProps, any> {
	render(): JSX.Element;
}
