import * as React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './Box.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function Box(props) {
	const { getStyles, children, height, width, backgroundColor } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<div className={classNames.root} style={{ height, width, backgroundColor }}>
			{children}
		</div>
	);
}

Box.propTypes = {
	/** Class name */
	className: PropTypes.string,
	/** Box height in pixels */
	height: PropTypes.number,
	/** Box width in pixels */
	width: PropTypes.number,
	/** Box background color */
	backgroundColor: PropTypes.string
};

export default styled(customizable('Box', ['theme'])(Box), getStyles);
