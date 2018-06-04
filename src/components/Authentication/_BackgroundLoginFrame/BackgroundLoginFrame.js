import * as React from 'react';
import PropTypes from 'prop-types';

function BackgroundLoginFrame({ source }) {
	return (
		<div style={{ display: 'none' }}>
			<iframe
				src={source}
				id="background-login"
				style={{ display: 'none' }}
				tabIndex="-1"
				height="0"
				width="0"
				title="Empty"
			/>
			<iframe id="manual-login" tabIndex="1" height="500" width="500" title="Empty" />
		</div>
	);
}

BackgroundLoginFrame.propTypes = {
	/** BackgroundLoginFrame source */
	source: PropTypes.string
};

export default BackgroundLoginFrame;
