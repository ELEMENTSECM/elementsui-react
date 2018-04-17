import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as UIFabBreadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
//import Label from 'elementsui-react/Label';

function Breadcrumb({ items, ariaLabel, maxDisplayedItems }) {
	return <UIFabBreadcrumb ariaLabel={ariaLabel} maxDisplayedItems={maxDisplayedItems} items={items} />;
}

Breadcrumb.propTypes = {
	/** Breadcrumb arialabel for navigation landmark*/
	ariaLabel: PropTypes.string,
	/** Breadcrumb max visible crumbs when availible space */
	maxDisplayedItems: PropTypes.number,
	/** The actual crumb elements */
	items: PropTypes.array
};

export default Breadcrumb;
