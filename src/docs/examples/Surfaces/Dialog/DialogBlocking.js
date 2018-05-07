import * as React from 'react';
import Dialog from 'elementsui-react/Surfaces/Dialog';
import { DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import Button from 'elementsui-react/Inputs/Button';

/** Blocking Dialog with large header  */
export default class DialogDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hideDialog: true,
			label: 'Show blocking dialog',
			dialogContentProps: {
				type: DialogType.largeHeader,
				title: 'Dialog header',
				subText: 'You have to use the Cancel/OK buttons inside the dialog to be able to close it!'
			},
			modalProps: {
				isBlocking: true,
				isDarkOverlay: true,
				containerClassName: 'ms-dialogMainOverride'
			}
		};
	}

	toggleDialog = () => {
		this.setState(() => ({
			hideDialog: !this.state.hideDialog,
			label: !this.state.hideDialog ? 'Show blocking dialog' : 'Blocking dialog visible :)'
		}));
	};

	render() {
		return (
			<div>
				<Button label={this.state.label} onClick={this.toggleDialog} isPrimary={true} />
				<Dialog
					hidden={this.state.hideDialog}
					onDismiss={this.toggleDialog}
					dialogContentProps={this.state.dialogContentProps}
					modalProps={this.state.modalProps}
					additionalContent={
						<span>
							<DialogFooter>
								<Button
									htmlId="cancelBtnBlocking"
									label="Cancel"
									isPrimary={false}
									className="button-default"
									onClick={this.toggleDialog}
								/>
								<Button
									htmlId="okBtnBlocking"
									label="OK"
									isPrimary={true}
									className="button-primary"
									onClick={this.toggleDialog}
								/>
							</DialogFooter>
						</span>
					}
				/>
			</div>
		);
	}
}
