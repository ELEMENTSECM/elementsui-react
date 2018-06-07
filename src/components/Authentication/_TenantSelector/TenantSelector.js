import * as React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../Inputs/Dropdown';
import LoggedInBar from '../_LoggedInBar';
import Label from '../../Inputs/Label';
import { styles } from './TenantSelector.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import { FormattedMessage } from 'react-intl';
/** TenantSelector example */
class TenantSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDatabase: this.props.selectedTenant
		};

		this.classNames = classNamesFunction()(styles, props);
	}

	callOnChange = value => {
		if (this.props.tenants != null) {
			this.props.tenants.forEach(tenant => {
				if (tenant.Id === value) {
					this.props.onChange(tenant.Id);
				}
			});
		}
	};

	handleSelectChange = option => {
		this.callOnChange(option.key);
		this.setState(ps => ({
			...ps,
			selectedDatabase: option.key
		}));
	};

	componentWillReceiveProps(newProps) {
		this.setState(ps => ({ ...ps, selectedDatabase: newProps.selectedTenant }));
	}

	render() {
		let options;
		if (this.props.tenants != null && !this.props.isLoggedIn) {
			options = this.props.tenants.map(tenant => ({
				key: tenant.Id,
				text: tenant.Description,
				isSelected: tenant.Id === this.props.selectedTenant
			}));
		}

		return (
			<div>
				{!this.props.isLoggedIn ? (
					<div>
						<Label className={this.classNames.label}>
							<FormattedMessage id="database" />
						</Label>
						<Dropdown
							id="databaseDropdown"
							className={this.classNames.selectTenantDropdown}
							selectedKey={this.state.selectedDatabase}
							placeHolder={'...'}
							options={options || []}
							onChange={option => this.handleSelectChange(option)}
						/>
					</div>
				) : (
					<LoggedInBar
						currentUserName={this.props.currentUserName}
						tenant={this.state.selectedDatabase}
						handleLogoutClick={this.props.handleLogoutClick}
						goBack={this.props.goBack}
						logout={this.props.logout}
					/>
				)}
			</div>
		);
	}
}

TenantSelector.propTypes = {
	/** Selected tenant */
	selectedTenant: PropTypes.string,
	/** List of tenant configs */
	tenants: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.string,
			Description: PropTypes.string
		})
	),
	/** Logged in user's name */
	currentUserName: PropTypes.string,
	/** Is logged in */
	isLoggedIn: PropTypes.bool,
	/** Selected tenant changed event handler */
	onChange: PropTypes.func,
	/** Back button click event handler */
	goBack: PropTypes.func,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('TenantSelector', ['theme'])(TenantSelector), styles);
