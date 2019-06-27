import * as React from "react";
import Lookup from "elementsui-react/Pickers/Lookup";

class Query {
	take = () => this;
	skip = () => this;
	fetchRawCollection = () => Promise.resolve({ value: options });
}

const options = [
	{
		Id: 1,
		Title: "John"
	},
	{
		Id: 2,
		Title: "Marry"
	}
];

const queryProvider = () => new Query();

/** Lookup with multiple values */
export default class LookupMultiple extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: [
				{
					value: options[0].Id,
					label: options[0].Title
				}
			]
		};
	}

	render() {
		return (
			<Lookup
				value={this.state.values}
				queryProvider={queryProvider}
				renderOption={x => x.Title}
				isMulti={true}
				theme={theme => {
					return {
						...theme,
						borderRadius: 0,
						spacing: {
							baseUnit: 2,
							controlHeight: 28
						}
					};
				}}
				includeFreetextValues={true}
			/>
		);
	}
}
