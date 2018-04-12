import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as UIFabLink } from 'office-ui-fabric-react/lib/Link';

/**Link example */
function Link({ label, href, disabled }) {
	return (
		<UIFabLink href={href} disabled={disabled}>
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
	disabled: PropTypes.bool
};
export default Link;
