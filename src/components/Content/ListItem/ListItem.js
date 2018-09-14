import * as React from "react";
import PropTypes from "prop-types";
import { styles } from "./ListItem.styles";

export default function ListItem(props) {
	const { children, onClick, link, icon, iconColor, className, linkClassName } = props;
	return (
		<li style={styles.ListItem} className={className}>
			<a style={styles.link} href={link} onClick={onClick} className={linkClassName}>
				<div className="row">
					<div className="col-xs-1">
						<i style={iconColor ? Object.assign({}, styles.icon, {color: iconColor}) : styles.icon} className={icon} />
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
}

ListItem.propTypes = {
	/** Any JSX */
	children: PropTypes.any,
	/** onClick event handler */
	onClick: PropTypes.func,
	/** Item link */
	link: PropTypes.string,
	/** Icon class name */
	icon: PropTypes.string,
	/** Icon color */
	iconColor: PropTypes.string,
	/** List item class name */
	className: PropTypes.string,
	/** Link className */
	linkClassName: PropTypes.string
};
