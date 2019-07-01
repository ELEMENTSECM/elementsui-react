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

	function getOneValidFreetextObject(freetext) {
		return {
			value: freetext,
			label: freetext,
			custom: true
		};
	}

	test("renders currentOptionsOptions alone if nothing else is defined", () => {
		const sut = allOptions([getOneValidOption()], [], false, "irrelevant");
		expect(sut).toEqual([getOneValidOption()]);
	});

	test("renders both currentOptionsOption and custom options", () => {
		const sut = allOptions([getOneValidOption()], [getOneValidCustomOption()], false, "irrelevant");
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
			"irrelevant"
		);
		expect(sut).toEqual([getOneValidOption()]);
	});

	test("renders both currentOptionsOption and freetext option", () => {
		const sut = allOptions([getOneValidOption()], [], true, "freetext");
		expect(sut).toEqual([getOneValidOption(), getOneValidFreetextObject("freetext")]);
	});

	test("renders both currentOptionsOption, custom option and freetext option", () => {
		const sut = allOptions([getOneValidOption()], [getOneValidCustomOption()], true, "freetext");
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
		const sut = allOptions([], [getOneValidCustomOption()], true, "SimpleCustomValue");
		expect(sut).toEqual([getOneValidCustomOption()]);
	});

	test("renders only freetext option when nothing else is defined", () => {
		const sut = allOptions([], [], true, "freetext");
		expect(sut).toEqual([getOneValidFreetextObject("freetext")]);
	});

	test("does not render freetext value when it is empty", () => {
		const sut = allOptions([], [], true, "");
		expect(sut).toEqual([]);
	});

	test("renders OK when all arrays are undefined", () => {
		const sut = allOptions(undefined, undefined, true, undefined);
		expect(sut).toEqual([]);
	});

	test("renders OK when all arrays are null", () => {
		const sut = allOptions(null, null, true, null);
		expect(sut).toEqual([]);
	});
});
