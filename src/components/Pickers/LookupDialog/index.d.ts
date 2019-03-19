import * as React from "react";

export interface LookupDialogPosition {
	x?: number;
	y?: number;
}

export interface LookupDialogProps {
	/**
	 * Callback executed when a dialog is closed
	 */
	close?: (...args: any[]) => any;
	/**
	 * Abolute or fixed positioning for a dialog
	 */
	position: LookupDialogPosition;
	/**
	 * Enabled drag n drop for a diealog
	 */
	isDraggable?: boolean;
	/**
	 * Labelled by Id
	 */
	ariaLabelledBy?: string;
	/**
	 * Draggable handle selector
	 */
	dragHandle?: string;
	/**
	 * Portal target id
	 */
	portalTarget?: string;
	/**
	 * Popup container class name
	 */
	className?: string;
}

export default class LookupDialog extends React.Component<LookupDialogProps, any> {
	render(): JSX.Element;
}
