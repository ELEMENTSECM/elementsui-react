import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Popper } from "react-popper";
import { Modifiers } from "popper.js";

const noFlipModifier = { flip: { enabled: false } };

const directionPositionMap = {
	up: "top",
	left: "left",
	right: "right",
	down: "bottom"
};

export interface DropdownMenuProps {
	/** Customize component output by passing in an element name or Component */
	tag?: React.ComponentType | string;
	/** Placement */
	right?: boolean;
	/** Modifier used to flip the popper’s placement when it starts to overlap its reference element. */
	flip?: boolean;
	/** Plugins used to alter the popper behavior */
	modifiers?: Modifiers;
	/** Class name */
	className?: string;
	/** Should menu persist */
	persist?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props, context) => {
	const { className, right: rightPlacement, tag, flip, modifiers, persist, ...attrs } = props;
	const classes = classNames(className, "dropdown-menu", {
		"dropdown-menu-right": rightPlacement,
		show: context.isOpen
	});

	const Tag = tag as any;

	if (persist || (context.isOpen && !context.inNavbar)) {
		const position1 = directionPositionMap[context.direction] || "bottom";
		const position2 = rightPlacement ? "end" : "start";
		const mods = !flip
			? {
					...modifiers,
					...noFlipModifier
				}
			: modifiers;

		return (
			<Popper placement={`${position1}-${position2}` as any} modifiers={mods}>
				{({ ref, placement }) => {
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

	return <Tag tabIndex="-1" role="menu" {...attrs} aria-hidden={!context.isOpen} className={classes} />;
};

DropdownMenu.defaultProps = {
	tag: "ul",
	flip: true
};
DropdownMenu.contextTypes = {
	isOpen: PropTypes.bool.isRequired,
	direction: PropTypes.oneOf(["up", "down", "left", "right"]).isRequired,
	inNavbar: PropTypes.bool.isRequired
};

export default DropdownMenu;
