import * as React from 'react';
import Panel from 'elementsui-react/Surfaces/Panel';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import Button from 'elementsui-react/Inputs/Button';

export default class componentName extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isOpen: false };
	}

	closePanel() {
		alert('uuu');
	}
	openPanel(e) {
		this.setState;
	}
	_onRenderFooterContent = function(closePanel) {
		return (
			<div>
				{/* <PrimaryButton
					onClick={e => {
						//e.showPanel = false;
						this.closePanel.bind(this);
					}}
					style={{ marginRight: '8px' }}>
					Save
				</PrimaryButton>
				<DefaultButton>Cancel</DefaultButton> */}
			</div>
		);
	};
	render() {
		return (
			<div>
				<Panel
					htmlId="defaultPanel"
					headerText="Default panel"
					isOpen={false}
					onRenderFooterContent={this._onRenderFooterContent.bind()}
					element={
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
					}
				/>
				<Button onClick={this.openPanel} label="Open" />
			</div>
		);
	}
}
