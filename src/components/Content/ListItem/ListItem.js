import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './ListItem.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function ListItem(props) {
	const { styles, title, onClick, link } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<li className={classNames.root}>
			<a className={classNames.link} href={link} onClick={onClick}>
				<div className={classNames.row}>
					<div className={classNames.iconCol}>
						<i className={classNames.icon} />
					</div>
					<div className={classNames.textCol}>
						<span>
							<span>{title}</span>
						</span>
					</div>
				</div>
			</a>
		</li>
	);
}

ListItem.propTypes = {
	/** ListItem title */
	title: PropTypes.string,
	/** onClick event handler */
	onClick: PropTypes.func,
	/** Item link */
	link: PropTypes.string,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('ListItem', ['theme'])(ListItem), styles);
