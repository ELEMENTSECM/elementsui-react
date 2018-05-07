// DialogDefault
import * as React from 'react';
import Dialog from 'elementsui-react/Surfaces/Dialog';
import { DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import Button from 'elementsui-react/Inputs/Button';

/** Dialog */
export default class DialogDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hideDialog: true,
			label: 'Show dialog',
			dialogContentProps: {
				type: DialogType.normal,
				title: 'Dialog header',
				subText: 'Dialog content text with some description of what the dialog reveals.'
			},
			modalProps: {
				isBlocking: false,
				isDarkOverlay: true,
				containerClassName: 'ms-dialogMainOverride'
			}
		};
	}

	toggleDialog = () => {
		this.setState(() => ({
			hideDialog: !this.state.hideDialog,
			label: !this.state.hideDialog ? 'Show dialog' : 'Dialog visible :)'
		}));
		console.log('Dialog: ' + this.state.hideDialog);
	};
	render() {
		return (
			<div>
				<Button
					description="Toggle the Sample Dialog"
					onClick={this.toggleDialog}
					label={this.state.label}
				/>
				<Dialog
					hidden={this.state.hideDialog}
					onDismiss={this.toggleDialog}
					dialogContentProps={this.state.dialogContentProps}
					modalProps={this.state.modalProps}
					additionalContent={
						<span>
							<DialogFooter>
								<Button
									htmlId="cancelBtn"
									label="Cancel"
									isPrimary={false}
									className="button-default"
									onClick={this.toggleDialog}
								/>
								<Button
									htmlId="okBtn"
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
