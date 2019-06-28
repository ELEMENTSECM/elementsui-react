import { allOptions } from "./lookupOptions";

describe("lookupOptions", () => {
	function getOneValidOption() {
		return {
			value: "SimpleValue",
			label: "Simple Label"
		};
	}

	function getOneValidCustomOption() {
		return {
			value: "SimpleCustomValue",
			label: "Simple Custom Label",
			custom: true
		};
	}

	function getOneValidFreetextObject(freetext, fullObjectValue = false) {
		return {
			value: freetext,
			label: freetext,
			custom: true,
			fullObjectValue: fullObjectValue
		};
	}

	test("renders currentOptionsOptions alone if nothing else is defined", () => {
		const sut = allOptions([getOneValidOption()], [], false, false, "irrelevant");
		expect(sut).toEqual([getOneValidOption()]);
	});

	test("renders both currentOptionsOption and custom options", () => {
		const sut = allOptions(
			[getOneValidOption()],
			[getOneValidCustomOption()],
			false,
			false,
			"irrelevant"
		);
		expect(sut).toEqual([getOneValidOption(), getOneValidCustomOption()]);
	});

	test("renders only currentOptionsOption if custom option has the same value", () => {
		const sut = allOptions(
			[getOneValidOption()],
			[
				{
					value: "SimpleValue",
					label: "Different Label but same value"
				}
			],
			false,
			false,
			"irrelevant"
		);
		expect(sut).toEqual([getOneValidOption()]);
	});

	test("renders both currentOptionsOption and freetext option", () => {
		const sut = allOptions([getOneValidOption()], [], true, false, "freetext");
		expect(sut).toEqual([getOneValidOption(), getOneValidFreetextObject("freetext")]);
	});

	test("renders both currentOptionsOption and freetext option with fullObjectValue true", () => {
		const sut = allOptions([getOneValidOption()], [], true, true, "freetext");
		expect(sut).toEqual([getOneValidOption(), getOneValidFreetextObject("freetext", true)]);
	});

	test("renders both currentOptionsOption, custom option and freetext option", () => {
		const sut = allOptions([getOneValidOption()], [getOneValidCustomOption()], true, false, "freetext");
		expect(sut).toEqual([
			getOneValidOption(),
			getOneValidCustomOption(),
			getOneValidFreetextObject("freetext")
		]);
	});

	test("renders only currentOptionsOption when both custom option and freetext option has same value", () => {
		const sut = allOptions(
			[getOneValidOption()],
			[
				{
					value: "SimpleValue",
					label: "Custom Option Label"
				}
			],
			true,
			false,
			"SimpleValue"
		);
		expect(sut).toEqual([getOneValidOption()]);
	});

	test("renders only custom option and freetext option has same value", () => {
		const sut = allOptions([], [getOneValidCustomOption()], true, false, "SimpleCustomValue");
		expect(sut).toEqual([getOneValidCustomOption()]);
	});

	test("renders only freetext option when nothing else is defined", () => {
		const sut = allOptions([], [], true, false, "freetext");
		expect(sut).toEqual([getOneValidFreetextObject("freetext")]);
	});

	test("does not render freetext value when it is empty", () => {
		const sut = allOptions([], [], true, false, "");
		expect(sut).toEqual([]);
	});

	test("renders OK when all arrays are undefined", () => {
		const sut = allOptions(undefined, undefined, true, false, undefined);
		expect(sut).toEqual([]);
	});

	test("renders OK when all arrays are null", () => {
		const sut = allOptions(null, null, true, false, null);
		expect(sut).toEqual([]);
	});
});
