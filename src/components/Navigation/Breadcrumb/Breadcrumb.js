import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as UIFabBreadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { getStyles } from './Breadcrumb.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

export function Breadcrumb(props) {
	const { items, ariaLabel, maxDisplayedItems, className, theme, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);
	return (
		<UIFabBreadcrumb
			className={classNames.root}
			ariaLabel={ariaLabel}
			maxDisplayedItems={maxDisplayedItems}
			items={items}
		/>
	);
}

Breadcrumb.propTypes = {
	/** Breadcrumb arialabel for navigation landmark*/
	ariaLabel: PropTypes.string,
	/** Breadcrumb max visible crumbs when availible space */
	maxDisplayedItems: PropTypes.number,
	/** The actual crumb elements */
	items: PropTypes.array,
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('Breadcrumb', ['theme'])(Breadcrumb), getStyles);
