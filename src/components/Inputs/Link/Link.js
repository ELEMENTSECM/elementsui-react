import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as UIFabLink } from 'office-ui-fabric-react/lib/Link';
import { styles } from './Link.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/**Link example */
export function Link(props) {
	const { htmlId, label, href, disabled, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<UIFabLink id={htmlId} className={classNames.root} href={href} disabled={disabled}>
			{label}
		</UIFabLink>
	);
}

Link.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/**Link label */
	label: PropTypes.string,
	/**Link href */
	href: PropTypes.string,
	/**Link disabled */
	disabled: PropTypes.bool,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Link', ['theme'])(Link), styles);
