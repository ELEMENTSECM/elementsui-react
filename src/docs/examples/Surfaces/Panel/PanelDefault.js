import * as React from 'react';
import Panel from 'elementsui-react/Surfaces/Panel';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

/**Default panel */
export default function PanelDefault() {
	// const _onShowPanel = function() {
	// 	//Panel.options.setState({ showPanel: true });
	// 	PanelDefault.setState({ showPanel: true });
	// };
	// const _onClosePanel = function(dd) {
	// 	debugger;
	// 	return PanelDefault.setState.showPanel(false);
	// };
	const _onRenderFooterContent = function() {
		return (
			<div>
				<PrimaryButton
					onClick={e => {
						e.showPanel = false;
					}}
					style={{ marginRight: '8px' }}>
					Save
				</PrimaryButton>
				<DefaultButton>Cancel</DefaultButton>
			</div>
		);
	};
	return (
		<Panel
			htmlId="defaultPanel"
			headerText="Default panel"
			onRenderFooterContent={_onRenderFooterContent}
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
	);
}
