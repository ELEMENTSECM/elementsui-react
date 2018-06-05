import * as React from 'react';
import MessageBar from 'elementsui-react/Surfaces/MessageBar';

/** Default MessageBar with content */
export default class MessageBarDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageBarType: 'error',
			isMultiline: false,
			onDismiss: function() {
				alert('dismissed!');
			}
		};
	}
	render() {
		return (
			<MessageBar
				messageBarType={this.state.messageBarType}
				isMultiline={this.state.isMultiline}
				onDismiss={this.state.onDismiss}>
				Something unexpected has happened. Please try again
			</MessageBar>
		);
	}
}
