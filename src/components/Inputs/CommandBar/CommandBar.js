import * as React from 'react';
import PropTypes from 'prop-types';
import { CommandBar as FabricCommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { styles } from './CommandBar.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** CommandBar example */
export function CommandBar(props) {
	const { htmlId, items, farItems, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return <FabricCommandBar id={htmlId} className={classNames.root} items={items} farItems={farItems} />;
}

CommandBar.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/** Items to render */
	items: PropTypes.array,
	/** I to render on the opposite side of those defined in items */
	farItems: PropTypes.array,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('CommandBar', ['theme'])(CommandBar), styles);
