import * as React from 'react';
import PropTypes from 'prop-types';
import Persona from '../../Content/Persona';
import { styles } from './LoggedInBar.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import ElementsLogo from '../../Content/ElementsLogo';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { FormattedMessage } from 'react-intl';
/** LoggedInBar example */
export function LoggedInBar(props) {
	const { currentUserName, tenant, styles, goBack, logout } = props;
	const classNames = classNamesFunction()(styles, props);
	const textStyle = { color: '#fff', fontSize: 10 };
	return (
		<div className={classNames.root}>
			<Icon iconName="ChevronLeftSmall" className={classNames.backButton} onClick={goBack} />
			<ElementsLogo className={classNames.logo} color="#fff" width={145} />
			<Persona
				text={currentUserName}
				secondaryText={tenant}
				className={classNames.persona}
				styles={() => ({
					persona: { selectors: { ':hover': { color: '#fff' } } },
					primaryText: textStyle,
					secondaryText: textStyle
				})}
			/>
			<ActionButton
				className={classNames.logoutLink}
				iconProps={{
					iconName: 'PowerButton',
					styles: () => ({
						icon: {
							color: '#fff'
						}
					})
				}}
				onClick={logout}>
				<FormattedMessage id="logout" />
			</ActionButton>
		</div>
	);
}

LoggedInBar.propTypes = {
	/** Logged in user's name */
	currentUserName: PropTypes.string,
	/** Current tenant */
	tenant: PropTypes.string,
	/** Logout function */
	logout: PropTypes.func,
	/** Return to tenant selection function */
	goBack: PropTypes.func,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('LoggedInBar', ['theme'])(LoggedInBar), styles);
