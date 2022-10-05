import * as React from "react";
import { Modal } from "react-overlays";
import type { ModalProps, RenderModalBackdropProps, RenderModalDialogProps } from "react-overlays/Modal";
import { styles } from "./Popup.styles";
import usePopper from "react-overlays/usePopper";
import { PositionedDraggable } from "react-draggable-elements";
import { Options as PopperOptions } from "@popperjs/core";

export type Placement = PopperOptions["placement"];

export interface PopupProps {
	/** Whether popup can be dragged on the screen. Default: true */
	isDraggable?: boolean;
	/** CSS class for the dialog element. Default: "popup__dialog" */
	className: ModalProps["className"];
	/** CSS class for the backdrop (overlay) element. Default: "popup__overlay" */
	backdropClassName?: string;
	/** CSS selector for the HTML element serving as a handle of draggable popup. Default: ".popup__dialog" */
	handle?: string;
	/** Whether popup should be made visible. Default: true */
	show: ModalProps["show"];
	/** Target node used for positioning of popup relative to it. Popper.js lib used behind the scene. */
	targetNode?: HTMLElement;
	/** One of the placements supported by Popper.js relative to target node. If boolean 'false' value is passed, Popper positioning will not be applied. */
	placement: Placement | false;
	/** Handler that is called when backdrop is clicked or ESC key pressed. Typically in this handler you will update state so that popup is removed. */
	onHide: ModalProps["onHide"];
	/** Standard ARIA attribute that will be set on popup root element */
	"aria-labelledby": string;
	/** Should modal become focused on render */
	autoFocus: ModalProps["autoFocus"];
	/** Allow popup to overlap target node in case of overflow. Default: true */
	allowOverlapOnOverflow?: boolean;
	/** Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked. Default: true */
	backdrop?: ModalProps["backdrop"];
	/** When true The modal will prevent focus from leaving the Modal while open. Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies, such as screen readers. Default: true */
	enforceFocus?: ModalProps["enforceFocus"];
}

Popup.defaultProps = {
	isDraggable: true,
	className: "popup__dialog",
	backdropClassName: "popup__overlay",
	handle: ".popup__dialog",
	show: true,
	targetNode: undefined,
	placement: undefined,
	onHide: undefined,
	"aria-labelledby": undefined,
	autoFocus: true,
	allowOverlapOnOverflow: true,
	enforceFocus: false,
};

export default function Popup(props: React.PropsWithChildren<PopupProps>) {
	const {
		handle,
		children,
		"aria-labelledby": ariaLabelledBy,
		isDraggable,
		show,
		className,
		backdropClassName,
		targetNode,
		placement,
		onHide,
		autoFocus,
		allowOverlapOnOverflow,
		backdrop,
		enforceFocus,
	} = props;

	const [modalElement, setModalElement] = React.useState<HTMLElement | null>();
	const renderBackdrop = React.useMemo(
		() => (props: RenderModalBackdropProps) => {
			return <div className={backdropClassName} style={styles.backdrop} {...props} />;
		},
		[backdropClassName]
	);
	const renderDialog = React.useMemo(
		() => (props: RenderModalDialogProps) => {
			return (
				<PositionedDraggable disabled={!isDraggable} handle={handle} bounds="html">
					<div {...props}>{children}</div>
				</PositionedDraggable>
			);
		},
		[isDraggable, handle, children]
	);
	const popperStyle = usePopper(targetNode, modalElement, {
		placement: placement === false ? undefined : placement,
		modifiers: allowOverlapOnOverflow
			? [{ name: "preventOverflow", options: { altAxis: true } }]
			: undefined,
	})?.styles?.popper;

	return (
		<Modal
			ref={(handle) => setModalElement(handle?.dialog)}
			aria-labelledby={ariaLabelledBy}
			className={className}
			renderBackdrop={renderBackdrop}
			renderDialog={renderDialog}
			onHide={onHide}
			show={show}
			autoFocus={autoFocus}
			backdrop={backdrop}
			enforceFocus={enforceFocus}
			style={{
				...styles.dialog,
				...(placement === false ? {} : targetNode ? (popperStyle as any) : styles.centerToScreen),
			}}
		/>
	);
}
