import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as UIFabLink } from 'office-ui-fabric-react/lib/Link';
import { getStyles } from './Link.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Link example */
export function Link(props) {
	const { label, href, disabled, className, theme, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<UIFabLink className={classNames.root} href={href} disabled={disabled}>
			{label}
		</UIFabLink>
	);
}

Link.propTypes = {
	/**Link label */
	label: PropTypes.string,
	/**Link href */
	href: PropTypes.string,
	/**Link disabled */
	disabled: PropTypes.bool,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('Link', ['theme'])(Link), getStyles);
