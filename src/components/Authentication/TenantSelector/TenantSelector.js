import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Inputs/Button';
import Dropdown from '../../Inputs/Dropdown';
import Spinner from '../../Indicators/Spinner';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

/** TenantSelector example */
class TenantSelector extends React.Component {
	static defaultProps = {
		labels: {
			login: 'Log in',
			logout: 'Log out',
			selectTenant: 'Select tenant',
			loggedInAs: 'You are logged in as'
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedDatabase: null
		};
	}

	callOnChange = value => {
		if (this.props.tenants != null) {
			this.props.tenants.forEach(tenant => {
				if (tenant._id === value) {
					this.props.onChange(tenant);
				}
			});
		}
	};

	handleSelectChange = option => {
		this.callOnChange(option.key);
		this.setState({
			selectedDatabase: option.key
		});
	};

	render() {
		let options;
		if (this.props.tenants != null && !this.props.isLoggedIn) {
			options = this.props.tenants.map(tenant => ({
				key: tenant._id,
				text: tenant._id,
				isSelected: tenant._id === this.props.preSelectedDataBase
			}));
		}

		return (
			<div>
				{!this.props.isLoggedIn ? (
					<div>
						<Dropdown
							id="databaseDropdown"
							label={this.props.labels.selectTenant + ':'}
							selectedKey={this.state.selectedDatabase}
							placeHolder={this.props.labels.selectTenant + '...'}
							options={options}
							onChange={option => this.handleSelectChange(option)}
						/>
						<br />
						<Button
							label={this.props.labels.login}
							disabled={this.state.selectedDatabase == null}
							onClick={() => this.props.handleLoginClick()}
						/>
						<div>{this.props.isSpinnerVisible && <Spinner />}</div>
					</div>
				) : (
					<MessageBar messageBarType={MessageBarType.info}>
						{`${this.props.labels.loggedInAs} '${this.props.name}'. `}
						<Link href="" onClick={this.props.handleLogoutClick}>
							{this.props.labels.logout}
						</Link>
					</MessageBar>
				)}
			</div>
		);
	}
}

TenantSelector.propTypes = {
	/** List of tenant configs */
	tenants: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			_childId: PropTypes.string,
			_scope: PropTypes.string,
			ncoreclient: PropTypes.shape({
				BaseUrl: PropTypes.string
			}),
			elements: PropTypes.shape({
				Authentication_BaseUrl: PropTypes.string,
				Authentication_DefaultProvider: PropTypes.string
			})
		})
	),
	/** Logged in user's name */
	name: PropTypes.string,
	/** Is logged in */
	isLoggedIn: PropTypes.bool,
	/** Selected tenant changed event handler */
	onChange: PropTypes.func,
	/** Log in mouse click event handler */
	handleLoginClick: PropTypes.func,
	/** Log ou mouse click event handler */
	handleLogoutClick: PropTypes.func,
	/** Is spinner visible */
	isSpinnerVisible: PropTypes.bool,
	/** Labels */
	labels: PropTypes.shape({
		/** Log in button label */
		login: PropTypes.string,
		/** Log out button label */
		logout: PropTypes.string,
		/** Select tenant label */
		selectTenant: PropTypes.string,
		/** Logged in label */
		loggedInAs: PropTypes.string
	})
};

export default TenantSelector;
