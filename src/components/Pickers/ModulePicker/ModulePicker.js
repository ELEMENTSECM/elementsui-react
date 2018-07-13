import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './ModulePicker.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import ModuleIcon from '../../Content/ModuleIcon';
import { IntlProvider, FormattedMessage } from 'react-intl';
import json from './ModulePicker.nls.json';

class ModulePickerComponent extends React.Component {
	constructor(props) {
		super(props);
		const { styles } = props;
		this.classNames = classNamesFunction()(styles, props);

		this.state = {
			selectedModuleId: null
		};
	}

	selectModule = (e, cb) => {
		const moduleId = e.target.value;
		this.setState({ selectedModuleId: moduleId }, () => cb && cb(moduleId));
	};

	enterModule = e => {
		const isClickEvent = e.type === 'click' && e.clientX !== 0 && e.clientY !== 0;
		const isSubmitEvent = e.type === 'submit';
		if (isSubmitEvent) {
			e.preventDefault();
			this.redirectToModule();
		} else {
			this.selectModule(e, moduleId => {
				if (isClickEvent || isSubmitEvent) {
					const { tenantId, applicationPath } = this.props;
					window.location.href = `${applicationPath}/${moduleId}/${tenantId}`;
				}
			});
		}
	};

	redirectToModule = () => {
		const { tenantId, applicationPath } = this.props;
		window.location.href = `${applicationPath}/${this.state.selectedModuleId}/${tenantId}`;
	};

	componentDidMount() {
		this.form && this.form.focus();
	}

	render() {
		const { modules } = this.props;
		return (
			<IntlProvider locale={this.props.locale} messages={json[this.props.locale]}>
				<form
					id={this.props.id}
					className={this.classNames.root}
					onSubmit={e => this.enterModule(e)}
					ref={form => (this.form = form)}>
					<ul className={this.classNames.list}>
						{modules.map((x, index) => {
							const isSelected = x.Id === this.state.selectedModuleId;
							return (
								<li
									key={x.Id}
									tabIndex={index}
									className={this.classNames.listItem}
									onClick={e => this.enterModule(e)}>
									<input
										type="radio"
										name="selector"
										id={x.Id}
										value={x.Id}
										checked={isSelected}
										className={this.classNames.radio}
									/>
									<label htmlFor={x.Id} className={this.classNames.moduleItem}>
										<span
											className={
												isSelected
													? `${this.classNames.thumbnail} ${
															this.classNames.thumbnailSelected
													  }`
													: `${this.classNames.thumbnail} ${
															this.classNames.thumbnailDefault
													  }`
											}>
											<ModuleIcon
												size={60}
												color={isSelected ? '#fff' : '#333'}
												moduleId={x.Id}
												className={this.classNames.moduleIcon}
											/>
											<span className={this.classNames.moduleName}>
												<FormattedMessage id={x.Id} />
											</span>
										</span>
									</label>
								</li>
							);
						})}
					</ul>
					<input type="submit" className={this.classNames.submit} />
				</form>
			</IntlProvider>
		);
	}
}
export const ModulePicker = ModulePickerComponent;

ModulePicker.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Application path */
	applicationPath: PropTypes.string,
	/** Selected tenant */
	tenantId: PropTypes.string,
	/** Array of modules */
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			/** Module Id */
			Id: PropTypes.string.isRequired
		})
	)
};

ModulePickerComponent.propTypes = {
	/** HTML id tag of the root element */
	id: PropTypes.string,
	/** Application path */
	applicationPath: PropTypes.string,
	/** Selected tenant */
	tenantId: PropTypes.string,
	/** Array of modules */
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			/** Module Id */
			Id: PropTypes.string.isRequired
		})
	)
};

export default styled(customizable('ModulePicker', ['theme'])(ModulePicker), styles);
