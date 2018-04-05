import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

/** LoggedInBar example */
function LoggedInBar({ name, handleLogoutClick, labels }) {
	return (
		<MessageBar messageBarType={MessageBarType.info}>
			{`${labels.loggedInAs} '${name}'. `}
			<Link href="" onClick={handleLogoutClick}>
				{labels.logout}
			</Link>
		</MessageBar>
	);
}

LoggedInBar.propTypes = {
	/** Logged in user's name */
	name: PropTypes.string,
	/** Log ou mouse click event handler */
	handleLogoutClick: PropTypes.func,
	/** Labels */
	labels: PropTypes.shape({
		/** Log out button label */
		logout: PropTypes.string,
		/** Logged in label */
		loggedInAs: PropTypes.string
	})
};

LoggedInBar.defaultProps = {
	labels: {
		logout: 'Log out',
		loggedInAs: 'You are logged in as'
	}
};

export default LoggedInBar;
