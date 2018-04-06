import * as React from 'react';
import LoggedInBar from 'elementsui-react/Authentication/LoggedInBar';

/** Default logged in bar */
export default function LoggedInBarDefault() {
	return (
		<LoggedInBar
			labels={{
				logout: 'Log out',
				loggedInAs: 'Logged in as'
			}}
			name="John Doe"
			handleLogoutClick={() => alert('Log out clicked')}
		/>
	);
}
