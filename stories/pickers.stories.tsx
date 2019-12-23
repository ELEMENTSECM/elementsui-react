import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, radios, boolean } from "@storybook/addon-knobs";
import { padDecorator } from ".";
import DateTimePicker from "../src/DateTimePicker";
import { Lookup } from "../src";
import { withState } from "@dump247/storybook-state";
import "react-ada-datepicker/dist/react-ada-datepicker.css";

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
	_value;
	take = () => this;
	skip = () => this;
	withQuery = () => this;
	fetchCollection = () =>
		Promise.resolve({
			value: options
		});
	settings = { params: {} };
}

storiesOf("Pickers/DateTimePicker", module)
	.addDecorator(withInfo)
	.addDecorator(padDecorator)
	.addDecorator(withKnobs)
	.add(
		"Default usage",
		() => {
			const viewMode = radios(
				"viewMode",
				{
					date: "date",
					time: "time",
					datetime: "datetime"
				},
				"datetime"
			);

			const dateFormat = radios(
				"dateFormat",
				{
					L: "L",
					LL: "LL",
					LLL: "LLL",
					LLLL: "LLLL",
					LT: "LT",
					LTS: "LTS",
					false: ""
				},
				"L"
			);

			const timeFormat = radios(
				"timeFormat",
				{
					LT: "LT",
					LTS: "LTS",
					false: ""
				},
				"LT"
			);

			const allowSameDay = boolean("allowSameDay", true);

			return (
				<DateTimePicker
					locale="nb"
					defaultValue={new Date()}
					onChange={e => alert(e)}
					allowSameDay={allowSameDay}
					viewMode={viewMode}
					dateFormat={dateFormat ? dateFormat : false}
					timeFormat={timeFormat ? timeFormat : false}
					todayButton
				/>
			);
		},
		{
			info: { inline: true, header: false }
		}
	);

storiesOf("Pickers/Lookup", module)
	.addDecorator(padDecorator)
	.addDecorator(withKnobs)
	.add(
		"Single value",
		withState({
			value: { value: 1, label: "John" }
		})(
			withInfo()(({ store }) => {
				const queryProvider = () => new Query();

				return (
					<Lookup
						inputId="TestLookup"
						value={store.state.value}
						queryProvider={queryProvider}
						renderOption={x => x.Title}
						onChange={selected => {
							store.set({ options: store.state.options, value: selected });
						}}
					/>
				);
			})
		),
		{
			info: { inline: true, header: false }
		}
	)
	.add(
		"Multi value",
		withState({
			value: [{ value: 1, label: "John" }]
		})(
			withInfo()(({ store }) => {
				const queryProvider = () => new Query();

				return (
					<Lookup
						inputId="TestLookup"
						value={store.state.value}
						queryProvider={queryProvider}
						renderOption={x => x.Title}
						onChange={selected => {
							store.set({ options: store.state.options, value: selected });
						}}
						isMulti
					/>
				);
			})
		),
		{
			info: { inline: true, header: false }
		}
	)
	.add(
		"Multi value with predefined options",
		withState({
			value: [{ value: 1, label: "John" }]
		})(
			withInfo()(({ store }) => {
				return (
					<Lookup
						inputId="TestLookup"
						value={store.state.value}
						renderOption={x => x.Title}
						options={options.map(x => ({ value: x.Id, label: x.Title }))}
						onChange={selected => {
							store.set({ options: store.state.options, value: selected });
						}}
						isMulti
					/>
				);
			})
		),
		{
			info: { inline: true, header: false }
		}
	)
	.add(
		"Option bindings",
		withState({
			value: { value: 1, label: "John" }
		})(
			withInfo()(({ store }) => {
				const queryProvider = () => new Query();
				const bindClasses = value =>
					value === 1
						? ["text-primary"]
						: value === 2
						? ["text-secondary"]
						: [];

				return (
					<Lookup
						inputId="TestLookup"
						value={store.state.value}
						queryProvider={queryProvider}
						renderOption={x => x.Title}
						onChange={selected => {
							store.set({ options: store.state.options, value: selected });
						}}
						optionBindings={bindClasses}
					/>
				);
			})
		),
		{
			info: { inline: true, header: false }
		}
	);
