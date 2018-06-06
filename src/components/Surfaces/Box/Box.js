import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './Box.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function Box(props) {
	const { htmlId, styles, children, height, width, backgroundColor } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<div htmlId={htmlId} className={classNames.root} style={{ height, width, backgroundColor }}>
			{children}
		</div>
	);
}

Box.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/** Class name */
	className: PropTypes.string,
	/** Box height in pixels */
	height: PropTypes.number,
	/** Box width in pixels */
	width: PropTypes.number,
	/** Box background color */
	backgroundColor: PropTypes.string
};

export default styled(customizable('Box', ['theme'])(Box), styles);
