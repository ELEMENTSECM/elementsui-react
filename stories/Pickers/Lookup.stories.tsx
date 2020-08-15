import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Lookup, { LookupProps } from "../../src/Lookup";
import { State, Store } from "@sambego/storybook-state";

const options = [
	{
		Id: 1,
		Title: "John",
	},
	{
		Id: 2,
		Title: "Marry",
	},
];

class Query {
	_value;
	take = () => this;
	skip = () => this;
	withQuery = () => this;
	fetchCollection = () =>
		Promise.resolve({
			value: options,
		});
	settings = { params: {} };
}

const queryProvider = () => new Query();

export default {
	title: "Pickers/Lookup",
	component: Lookup,
} as Meta;

export const SingleSelection: Story<LookupProps> = () => {
	const store = new Store({
		value: { value: 1, label: "John" },
	});

	return (
		<State store={store}>
			{(state) => (
				<Lookup
					inputId="TestLookup"
					value={state.value}
					queryProvider={queryProvider}
					renderOption={(x) => x.Title}
					onChange={(selected) => {
						store.set({ value: selected });
					}}
				/>
			)}
		</State>
	);
};
SingleSelection.storyName = "Single selection";

export const MultipleSelection: Story<LookupProps> = () => {
	const store = new Store({
		value: [{ value: 1, label: "John" }],
	});

	return (
		<State store={store}>
			{(state) => (
				<Lookup
					inputId="TestLookup"
					value={state.value}
					queryProvider={queryProvider}
					renderOption={(x) => x.Title}
					onChange={(selected) => {
						store.set({ value: selected });
					}}
					isMulti
				/>
			)}
		</State>
	);
};
MultipleSelection.storyName = "Multiple selection";

export const MultipleSelectionWithOptions: Story<LookupProps> = () => {
	const store = new Store({
		value: [{ value: 1, label: "John" }],
	});

	return (
		<State store={store}>
			{(state) => (
				<Lookup
					inputId="TestLookup"
					value={state.value}
					renderOption={(x) => x.Title}
					options={options.map((x) => ({ value: x.Id, label: x.Title }))}
					onChange={(selected) => {
						store.set({ value: selected });
					}}
					isMulti
				/>
			)}
		</State>
	);
};
MultipleSelectionWithOptions.storyName = "Multiple selection with predefined options";

export const OptionBindings: Story<LookupProps> = () => {
	const store = new Store({
		value: [{ value: 1, label: "John" }],
	});

	const bindClasses = (value) => (value === 1 ? ["text-primary"] : value === 2 ? ["text-success"] : []);

	return (
		<State store={store}>
			{(state) => (
				<Lookup
					inputId="TestLookup"
					value={state.value}
					queryProvider={queryProvider}
					renderOption={(x) => x.Title}
					onChange={(selected) => {
						store.set({ value: selected });
					}}
					optionBindings={bindClasses}
				/>
			)}
		</State>
	);
};
OptionBindings.storyName = "Option bindings";
