import { React, PropTypes} from "common/componentImport";
import { Checkbox as UIFabCheckbox } from 'office-ui-fabric-react/lib/Checkbox';


/** Checkbox example */
function Checkbox({ label, disabled }) {
	return (
		<UIFabCheckbox label={label} disabled={disabled} ariaDescribedBy={'descriptionID'} />
	);
}

Checkbox.propTypes = {
	/** Checkbox label */
	label: PropTypes.string,
	/** Checkbox is disabled */
	disabled: PropTypes.bool,
	/** Checkbox description */
	ariaDescribedBy: PropTypes.string
};

export default Checkbox;
