import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './LoginError.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import { FormattedMessage } from 'react-intl';
import MessageBar from '../../Surfaces/MessageBar';

export class LoginError extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: this.props.type
		};
		this.classNames = classNamesFunction()(styles, this.props);
	}

	toggleError = () => {
		this.setState(ps => ({ ...ps, visible: false }));
	};

	componentWillReceiveProps(newProps) {
		this.setState(ps => ({ ...ps, visible: newProps.type }));
	}

	render() {
		const { root } = this.classNames;
		const { children, type } = this.props;
		return (
			<div id={this.props.id} className={root}>
				{this.state.visible ? (
					<MessageBar
						messageBarType="error"
						isMultiline={false}
						onDismiss={() => this.toggleError()}
						dismissButtonAriaLabel="Close"
						truncated={true}
						overflowButtonAriaLabel="Overflow">
						<b>
							<FormattedMessage id={type} />.
						</b>
						{` ${children || ''}`}
					</MessageBar>
				) : (
					''
				)}
			</div>
		);
	}
}

LoginError.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Error type */
	type: PropTypes.oneOf(['backgroundLoginFailed', 'noModuleLicense', 'noModule']).isRequired
};

export default styled(customizable('LoginError', ['theme'])(LoginError), styles);
