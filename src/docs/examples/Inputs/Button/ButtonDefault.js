import * as React from 'react';
import Button from 'elementsui-react/Inputs/Button';

/** Default button */
export default function ButtonDefault() {
	const getStyles = props => {
		const { className, theme } = props;
		const { palette, semanticColors } = theme;

		return {
			root: ['ms-Button', props.isPrimary ? { background: 'red' } : {}, className]
		};
	};
	return (
		<div>
			<Button
				htmlId="defaultBtn"
				label="Default button"
				isPrimary={true}
				className="button-default"
				getStyles={getStyles}
			/>
			<Button htmlId="defaultBtn" label="Default button" isPrimary={true} className="button-default" />
		</div>
	);
}
