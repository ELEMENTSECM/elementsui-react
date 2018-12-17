import * as React from "react";
import Lookup from "elementsui-react/Pickers/Lookup";

/** Lookup option bindings */
export default function LookupOptionBindings() {
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
	class Query {
		take = () => this;
		skip = () => this;
		fetchRawCollection = () => Promise.resolve({ value: options });
	}

	const queryProvider = () => new Query();

	return (
		<Lookup
			inputId="TestLookup"
			value={{ value: options[0].Id, label: options[0].Title }}
			queryProvider={queryProvider}
			renderOption={x => x.Title}
			onChange={selected => alert("value: " + selected.value + ". label: " + selected.label)}
			optionBindings={value => ({
				"text-primary": value === 1,
				"text-secondary": value === 2
			})}
		/>
	);
}
