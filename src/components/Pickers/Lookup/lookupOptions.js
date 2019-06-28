import _ from "lodash";

function addFreetextValue(includeFreetextValues, fullObjectValue, search) {
	if (!includeFreetextValues || !search) return [];

	return [
		{
			value: search,
			label: search,
			custom: true,
			fullObjectValue: fullObjectValue
		}
	];
}

export function allOptions(
	currentOptionsOptions,
	customOptions,
	includeFreetextValues,
	fullObjectValue,
	search
) {
	const optionsWithCustomOptions = currentOptionsOptions.concat(customOptions);

	const allOptions = optionsWithCustomOptions.concat(
		addFreetextValue(includeFreetextValues, fullObjectValue, search)
	);

	// Note the priority here:
	// If an option exist in both lookup + custom lookups + freetext - it will only show the lookup version
	// If the option exists in custom lookups + freetext - it will only show the custom lookup version
	const allOptionsWithoutDuplicates = _.uniqBy(allOptions, "value");

	return allOptionsWithoutDuplicates;
}
