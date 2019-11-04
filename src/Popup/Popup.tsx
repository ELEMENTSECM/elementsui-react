import * as React from "react";
import { PositionedDraggable } from "react-draggable-elements";
import { Modal } from "react-overlays";
import { Popper } from "react-popper";
import { ReferenceObject } from "popper.js";
import styled from "styled-components";
import { isNil } from "lodash";
import { styles } from "./Popup.styles";

type PopupTargetNode = {
	clientHeight: number;
	clientWidth: number;
	getBoundingClientRect: () => ClientRect | DOMRect;
};

export interface PopupProps {
	/** Whether popup can be dragged on the screen. Default: true */
	isDraggable?: boolean;
	/** CSS class for the <div> that hosts popup and backdrop(overlay). Default: "popup-dialog" */
	hostClassName?: string;
	/** CSS class for the top <div> of the popup. Default: "popup-container" */
	containerClassName?: string;
	/** CSS class for the backdrop (overlay) <div>. Default: "popup-overlay" */
	backdropClassName?: string;
	/** CSS selector for the HTML element serving as a handle of draggable popup. Default: ".popup-container" */
	handle?: string;
	/** Whether popup should be made visible. Default: true */
	show?: boolean;
	/** Target node used for positioning of popup relative to it. Popper.js lib used behind the scene. */
	targetNode?: PopupTargetNode | HTMLElement | null;
	/** One of the placements supported by Popper.js relative to target node. If boolean 'false' value is passed, Popper positioning will not be applied. */
	placement?:
		| "auto-start"
		| "auto"
		| "auto-end"
		| "top-start"
		| "top"
		| "top-end"
		| "right-start"
		| "right"
		| "right-end"
		| "bottom-end"
		| "bottom"
		| "bottom-start"
		| "left-end"
		| "left"
		| "left-start"
		| boolean;
	/** Handler that is called when backdrop is clicked or ESC key pressed. Typically in this handler you will update state so that popup is removed. */
	onHide: (event?: any) => any;
	/** Standard ARIA attribute that will be set on popup root element */
	"aria-labelledby": string;
	/** Should modal become focused on render */
	autoFocus?: boolean;
}

export default class Popup extends React.PureComponent<PopupProps> {
	static defaultProps = {
		isDraggable: true,
		hostClassName: "popup-dialog",
		containerClassName: "popup-container",
		backdropClassName: "popup-overlay",
		handle: ".popup-container",
		show: true,
		targetNode: undefined,
		placement: undefined,
		onHide: undefined,
		"aria-labelledby": undefined,
		autoFocus: true
	};

	onHide = () => {
		const { onHide } = this.props;
		onHide && onHide();
	};

	render() {
		const {
			handle,
			children,
			"aria-labelledby": ariaLabelledBy,
			isDraggable,
			show,
			hostClassName,
			containerClassName,
			backdropClassName,
			targetNode,
			placement,
			autoFocus
		} = this.props;

		return (
			<Modal
				aria-labelledby={ariaLabelledBy}
				backdropClassName={backdropClassName}
				backdropStyle={{ zIndex: 2000 }}
				onHide={this.onHide}
				show={show}
				autoFocus={autoFocus}
				className={hostClassName}
			>
				<Popper referenceElement={targetNode as ReferenceObject} placement={placement as any}>
					{({ ref, style }) => (
						<PositionedDraggable handle={handle} disabled={!isDraggable} bounds="html">
							<div
								ref={ref}
								className={containerClassName}
								style={{
									...styles.container,
									...placement === false ? {} : targetNode ? style : styles.centerToScreen
								}}
							>
								{children}
							</div>
						</PositionedDraggable>
					)}
				</Popper>
			</Modal>
		);
	}
}
