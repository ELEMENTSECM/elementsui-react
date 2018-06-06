import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as UIFabBreadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { styles } from './Breadcrumb.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function Breadcrumb(props) {
	const { htmlId, items, ariaLabel, maxDisplayedItems, styles } = props;
	const classNames = classNamesFunction()(styles, props);
	return (
		<UIFabBreadcrumb
			id={htmlId}
			className={classNames.root}
			ariaLabel={ariaLabel}
			maxDisplayedItems={maxDisplayedItems}
			items={items}
		/>
	);
}

Breadcrumb.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
	/** Breadcrumb arialabel for navigation landmark*/
	ariaLabel: PropTypes.string,
	/** Breadcrumb max visible crumbs when availible space */
	maxDisplayedItems: PropTypes.number,
	/** The actual crumb elements */
	items: PropTypes.array,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Breadcrumb', ['theme'])(Breadcrumb), styles);
