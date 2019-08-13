import * as React from "react";

export interface PopupTargetNode {
	clientHeight?: number;
	clientWidth?: number;
	getBoundingClientRect?: (...args: any[]) => any;
}

export type PopupPlacement = string | boolean;

export interface PopupProps {
	/**
	 * Whether popup can be dragged on the screen. Default: true
	 */
	isDraggable?: boolean;
	/**
	 * CSS class for the <div> that hosts popup and backdrop(overlay). Default: "popup-dialog"
	 */
	hostClassName?: string;
	/**
	 * CSS class for the top <div> of the popup. Default: "popup-container"
	 */
	containerClassName?: string;
	/**
	 * CSS class for the backdrop (overlay) <div>. Default: "popup-overlay"
	 */
	backdropClassName?: string;
	/**
	 * CSS selector for the HTML element serving as a handle of draggable popup. Default: ".popup-container"
	 */
	handle?: string;
	/**
	 * Whether popup should be made visible. Default: true
	 */
	show?: boolean;
	/**
	 * Target node used for positioning of popup relative to it. Popper.js lib used behind the scene.
	 */
	targetNode?: PopupTargetNode;
	/**
	 * One of the placements supported by Popper.js relative to target node. If boolean 'false' value is passed, Popper positioning will not be applied.
	 */
	placement?: PopupPlacement;
	/**
	 * Handler that is called when backdrop is clicked or ESC key pressed. Typically in this handler you will update state so that popup is removed.
	 */
	onHide?: (...args: any[]) => any;
	/**
	 * Standard ARIA attribute that will be set on popup root element
	 */
	"aria-labelledby"?: string;
	/**
	 * Should modal become focused on render
	 */
	autoFocus?: boolean;
}

export default class Popup extends React.Component<PopupProps, any> {
	render(): JSX.Element;
}
