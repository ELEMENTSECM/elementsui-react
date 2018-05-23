import * as React from 'react';
import Panel from 'elementsui-react/Surfaces/Panel';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import Button from 'elementsui-react/Inputs/Button';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export default class PanelDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isOpen: false, dismissed: true };
	}

	onRenderFooterContent = () => {
		return (
			<div>
				<PrimaryButton onClick={this.closePanel} style={{ marginRight: '8px' }}>
					Save
				</PrimaryButton>
				<DefaultButton onClick={this.closePanel}>Cancel</DefaultButton>
			</div>
		);
	};

	closePanel = () => {
		this.setState(() => ({
			isOpen: false,
			dismissed: true
		}));
	};

	openPanel = () => {
		this.setState(() => ({
			isOpen: true,
			dismissed: false
		}));
	};

	render() {
		return (
			<div>
				<Panel
					htmlId="defaultPanel"
					headerText="Default panel"
					isOpen={this.state.isOpen}
					onDismissed={this.closePanel}
					hasCloseButton={true}
					closebuttonAriaLabel="Close panel"
					onRenderFooterContent={this.onRenderFooterContent}>
					<ChoiceGroup
						options={[
							{
								key: 'A',
								text: 'Option A'
							},
							{
								key: 'B',
								text: 'Option B',
								checked: true
							},
							{
								key: 'C',
								text: 'Option C',
								disabled: true
							},
							{
								key: 'D',
								text: 'Option D',
								checked: true,
								disabled: true
							}
						]}
						label="Pick one"
						required={true}
					/>
				</Panel>
				<Button onClick={this.openPanel} label="Open Panel" />
			</div>
		);
	}
}
