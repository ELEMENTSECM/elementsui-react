import * as React from 'react';
import PropTypes from 'prop-types';
import { CommandBar as FabricCommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { getStyles } from './CommandBar.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** CommandBar example */
export function CommandBar(props) {
	const { items, farItems, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return <FabricCommandBar className={classNames.root} items={items} farItems={farItems} />;
}

CommandBar.propTypes = {
	/** Items to render */
	items: PropTypes.array,
	/** I to render on the opposite side of those defined in items */
	farItems: PropTypes.array,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('CommandBar', ['theme'])(CommandBar), getStyles);
