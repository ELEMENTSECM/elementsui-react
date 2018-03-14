import { React, PropTypes} from "common/componentImport";
import { Toggle as UIFabToggle } from 'office-ui-fabric-react/lib/Toggle';


/** Toggle example */
function Toggle({ label, disabled = false }) {
	return (
		<UIFabToggle label={label} disabled={disabled} ariaDescribedBy={'descriptionID'} defaultChecked="false"  />
	);
}

Toggle.propTypes = {
	/** Toggle label */
	label: PropTypes.string,
	/** Toggle is disabled */
	disabled: PropTypes.bool,
	/** Toggle description */
	ariaDescribedBy: PropTypes.string,
	/** Toggle checked */
	defaultChecked: PropTypes.bool
};

export default Toggle;
