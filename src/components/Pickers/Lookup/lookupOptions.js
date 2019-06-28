import _ from "lodash";

function freetextValue(search, fullObjectValue) {
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
	let allOptions = [];

	if (_.isArray(currentOptionsOptions)) {
		allOptions = allOptions.concat(currentOptionsOptions);
	}

	if (_.isArray(customOptions)) {
		allOptions = allOptions.concat(customOptions);
	}

	if (includeFreetextValues && !_.isNil(search) && !_.isEmpty(search)) {
		allOptions = allOptions.concat(freetextValue(search, fullObjectValue));
	}

	// Note the priority here:
	// If an option exist in both lookup + custom lookups + freetext - it will only show the lookup version
	// If the option exists in custom lookups + freetext - it will only show the custom lookup version
	const allOptionsWithoutDuplicates = _.uniqBy(allOptions, "value");

	return allOptionsWithoutDuplicates;
}
