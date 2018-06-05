import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './ModulePicker.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import ModuleIcon from '../../Content/ModuleIcon';

class ModulePickerComponent extends React.Component {
	constructor(props) {
		super(props);
		const { styles } = props;
		this.classNames = classNamesFunction()(styles, props);

		this.state = {
			selectedModuleId: null
		};
	}

	selectModule(e) {
		this.setState({ selectedModuleId: e.target.value });
	}

	render() {
		const { modules } = this.props;
		return (
			<div className={this.classNames.root}>
				<ul className={this.classNames.list}>
					{modules.map(x => {
						const isSelected = x.Id === this.state.selectedModuleId;
						return (
							<li key={x.Id} className={this.classNames.listItem}>
								<input
									type="radio"
									name="selector"
									id={x.Id}
									value={x.Id}
									checked={isSelected}
									className={this.classNames.radio}
									onChange={this.selectModule.bind(this)}
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
										<span className={this.classNames.moduleName}>{x.Name}</span>
									</span>
								</label>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
export const ModulePicker = ModulePickerComponent;

ModulePicker.propTypes = {
	/** Array of modules */
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			/** Module Id */
			Id: PropTypes.string.isRequired,
			/** Module name */
			Name: PropTypes.string.isRequired
		})
	)
};

ModulePickerComponent.propTypes = {
	/** Array of modules */
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			/** Module Id */
			Id: PropTypes.string.isRequired,
			/** Module name */
			Name: PropTypes.string.isRequired
		})
	)
};

export default styled(customizable('ModulePicker', ['theme'])(ModulePicker), styles);
