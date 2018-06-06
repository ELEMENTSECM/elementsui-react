import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog as UIFabDialog } from 'office-ui-fabric-react/lib/Dialog';
import { styles } from './Dialog.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';

/** Dialog example */
export function Dialog(props) {
	const { htmlId, hidden, onDismiss, dialogContentProps, modalProps, styles } = props;
	const classNames = classNamesFunction()(styles, props);

	return (
		<UIFabDialog
			id={htmlId}
			hidden={hidden}
			onDismiss={onDismiss}
			dialogContentProps={dialogContentProps}
			modalProps={Object.assign({ className: classNames.root }, ...modalProps)}>
			{props.children}
		</UIFabDialog>
	);
}

Dialog.propTypes = {
	/** HTML id tag of the root element */
	htmlId: PropTypes.string,
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
	styles: PropTypes.func
};

export default styled(customizable('Dialog', ['theme'])(Dialog), styles);
