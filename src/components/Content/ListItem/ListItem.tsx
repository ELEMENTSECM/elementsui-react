import * as React from "react";
import { styles } from "./ListItem.styles";

export interface IListItemProps {
	/**
	 * Any JSX
	 */
	children?: any;
	/**
	 * onClick event handler
	 */
	onClick?: (...args: any[]) => any;
	/**
	 * Item link
	 */
	link?: string;
	/**
	 * Icon class name
	 */
	icon?: string;
	/**
	 * Icon color
	 */
	iconColor?: string;
	/**
	 * List item class name
	 */
	className?: string;
	/**
	 * Link className
	 */
	linkClassName?: string;
}

const ListItem: React.SFC<IListItemProps> = (props) => {
	const { children, onClick, link, icon, iconColor, className, linkClassName } = props;
	return (
		<li className={`${styles.ListItem} ${className}`}>
			<a className={`${styles.link} ${linkClassName}`} href={link} onClick={onClick}>
				<div className="row">
					<div className="col-xs-1">
						<i style={iconColor && { color: iconColor }} className={`${styles.icon} ${icon}`} />
					</div>
					<div className="col-xs-10">
						<span>
							<span>{children}</span>
						</span>
					</div>
				</div>
			</a>
		</li>
	);
};

export default ListItem;
