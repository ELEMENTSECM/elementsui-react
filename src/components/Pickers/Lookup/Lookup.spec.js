import * as React from "react";
import { shallow } from "enzyme";
import Lookup from "./index";

describe("Lookup", () => {
	const queryProvider = filter => filter;
	const renderOption = lookupValue => lookupValue.Title;
	const values = [
		{
			Id: 1,
			Title: "Title 1"
		},
		{
			Id: 2,
			Title: "Title 2"
		}
	];

	const options = values.map(x => ({
		value: x.Id,
		label: x.Title
	}));

	let wrapper;
	let component;

	describe("with options property", () => {
		beforeEach(() => {
			wrapper = shallow(
				<Lookup id="testLookup" queryProvider={queryProvider} renderOption={renderOption} options={options} />
			);
			component = wrapper.instance();
		});

		test("should be displayed correctly", () => {
			expect(wrapper).toMatchSnapshot();
		});

		test("should update state with options", () => {
			expect(component.state["optionsCache"][""]["options"]).toEqual(options);
		});

		test("should update state on 'onMenuOpen'", async () => {
			const mockLoadOptions = jest.spyOn(component, "loadOptions");
			await wrapper.find("Select").simulate("menuOpen");
			expect(component.state["menuIsOpen"]).toBeTruthy();
			expect(mockLoadOptions).not.toBeCalled();
		});

		test("should update state on 'onMenuClose'", () => {
			component.state["menuIsOpen"] = true;
			wrapper.find("Select").simulate("menuClose");
			expect(component.state["menuIsOpen"]).toBeFalsy();
		});

		test("should update state with options", () => {
			expect(component.state["optionsCache"][""]["options"]).toEqual(options);
		});

		test("should update state on 'onInputChange' and call 'loadOptions'", async () => {
			const filter = "test";
			const mockLoadOptions = jest.spyOn(component, "loadOptions");
			await wrapper.find("Select").simulate("inputChange", filter);
			expect(component.state["search"]).toEqual(filter);
			expect(mockLoadOptions).toBeCalled();
		});

		test("should avoid calling 'loadOptions' on 'onInputChange'", async () => {
			const mockLoadOptions = jest.spyOn(component, "loadOptions");
			await wrapper.find("Select").simulate("inputChange", "");
			expect(mockLoadOptions).not.toBeCalled();
		});

		test("should call 'loadOptions' on 'onMenuScrollToBottom'", async () => {
			const mockLoadOptions = jest.spyOn(component, "loadOptions");
			await wrapper.find("Select").simulate("menuScrollToBottom");
			expect(mockLoadOptions).toBeCalled();
		});

		test("should skip loading if there are no new items", async () => {
			const mockLoad = jest.spyOn(component, "load");
			component.state["optionsCache"][""]["hasMore"] = false;
			await component.loadOptions();
			expect(mockLoad).not.toBeCalled();
		});
	});

	describe("without options property", () => {
		beforeEach(() => {
			wrapper = shallow(<Lookup id="testLookup" queryProvider={queryProvider} renderOption={renderOption} />);
			component = wrapper.instance();
		});

		test("should initialize optionsCache with initial cache", () => {
			expect(component.state["optionsCache"]).toEqual({
				"": { hasMore: true, isLoading: false, options: [], values: [], isTriedLoad: false }
			});
		});

		test("should update state on 'onMenuOpen' and call 'loadOptions'", async () => {
			const mockLoadOptions = jest.spyOn(component, "loadOptions");
			await wrapper.find("Select").simulate("menuOpen");
			expect(component.state["menuIsOpen"]).toBeTruthy();
			expect(mockLoadOptions).toBeCalled();
		});

		test("should load options", async () => {
			component.load = jest.fn(() => ({
				options,
				values
			}));
			await component.loadOptions();
			expect(component.state["optionsCache"][""]["options"]).toEqual(options);
		});
	});

	describe("with fullObjectValue property", () => {
		const mockOnChange = jest.fn();
		beforeEach(() => {
			wrapper = shallow(
				<Lookup
					id="testLookup"
					queryProvider={queryProvider}
					renderOption={renderOption}
					onChange={mockOnChange}
					fullObjectValue={true}
				/>
			);
			component = wrapper.instance();
		});

		test("should return full object value", async () => {
			component.load = jest.fn(() => ({
				options,
				values
			}));
			await component.loadOptions();
			expect(component.state["optionsCache"][""]["options"]).toEqual(options);
			expect(component.state["optionsCache"][""]["values"]).toEqual(values);
		});
	});
});
