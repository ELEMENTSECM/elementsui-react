import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Popper } from "react-popper";

const noFlipModifier = { flip: { enabled: false } };

const directionPositionMap = {
	up: "top",
	left: "left",
	right: "right",
	down: "bottom"
};

const DropdownMenu = (props, context) => {
	const { className, right: rightPlacement, tag, flip, modifiers, persist, ...attrs } = props;
	const classes = classNames(className, "dropdown-menu", {
		"dropdown-menu-right": rightPlacement,
		show: context.isOpen
	});

	const Tag = tag;

	if (persist || (context.isOpen && !context.inNavbar)) {
		const position1 = directionPositionMap[context.direction] || "bottom";
		const position2 = rightPlacement ? "end" : "start";
		const modifiers = !flip
			? {
					...modifiers,
					...noFlipModifier
				}
			: modifiers;

		return (
			<Popper placement={`${position1}-${position2}`} modifiers={modifiers}>
				{({ ref, style, placement }) => {
					const { left, right, ...innerStyle } = style;
					return (
						<Tag
							className={classes}
							ref={ref}
							role="menu"
							aria-hidden={!context.isOpen}
							x-placement={placement}
							{...attrs}
						/>
					);
				}}
			</Popper>
		);
	}

	return (
		<Tag
			tabIndex="-1"
			role="menu"
			{...attrs}
			aria-hidden={!context.isOpen}
			className={classes}
			placement={attrs.placement}
		/>
	);
};

DropdownMenu.propTypes = {
	/** Customize component output by passing in an element name or Component */
	tag: PropTypes.string,
	/** Component children */
	children: PropTypes.node.isRequired,
	/** Placement */
	right: PropTypes.bool,
	/** Modifier used to flip the popper’s placement when it starts to overlap its reference element. */
	flip: PropTypes.bool,
	/** Plugins used to alter the popper behavior */
	modifiers: PropTypes.object,
	/** Class name */
	className: PropTypes.string,
	/** Should menu persist */
	persist: PropTypes.bool
};
DropdownMenu.defaultProps = {
	tag: "ul",
	flip: true
};
DropdownMenu.contextTypes = {
	isOpen: PropTypes.bool.isRequired,
	direction: PropTypes.oneOf([ "up", "down", "left", "right" ]).isRequired,
	inNavbar: PropTypes.bool.isRequired
};

export default DropdownMenu;
