import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog as UIFabDialog } from 'office-ui-fabric-react/lib/Dialog';
import { getStyles } from './Dialog.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Dialog example */
export function Dialog(props) {
	const { hidden, onDismiss, dialogContentProps, modalProps, className, theme, getStyles } = props;
	const classNames = classNamesFunction()(getStyles, props);

	return (
		<UIFabDialog
			className={classNames.root}
			hidden={hidden}
			onDismiss={onDismiss}
			dialogContentProps={dialogContentProps}
			modalProps={modalProps}>
			{props.children}
		</UIFabDialog>
	);
}

Dialog.propTypes = {
	/** Dialog visibility state */
	hidden: PropTypes.bool,
	/** Dialog dissmiss callback */
	onDismiss: PropTypes.func,
	/** Dialog content props */
	dialogContentProps: PropTypes.shape({
		type: PropTypes.number,
		title: PropTypes.string,
		subText: PropTypes.string
	}),
	/** Dialog modal props (context)*/
	modalProps: PropTypes.shape({
		isBlocking: PropTypes.bool,
		isDarkOverlay: PropTypes.bool,
		containerClassName: PropTypes.string
	}),
	/** User-defined styling */
	getStyles: PropTypes.func
};

export default styled(customizable('Dialog', ['theme'])(Dialog), getStyles);
