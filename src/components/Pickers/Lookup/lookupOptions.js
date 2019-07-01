import _ from "lodash";

function freetextValue(search) {
	return [
		{
			value: search,
			label: search,
			custom: true
		}
	];
}

function addFreetextValue(search) {
	if (_.isNil(search) || _.isEmpty(search)) {
		return [];
	}

	return freetextValue(search);
}

export function allOptions(currentOptionsOptions, customOptions, includeFreetextValues, search) {
	let allOptions = [];

	if (_.isArray(currentOptionsOptions)) {
		allOptions = allOptions.concat(currentOptionsOptions);
	}

	if (_.isArray(customOptions)) {
		allOptions = allOptions.concat(customOptions);
	}

	if (includeFreetextValues) {
		allOptions = allOptions.concat(addFreetextValue(search));
	}

	// Note the priority here:
	// If an option exist in both lookup + custom lookups + freetext - it will only show the lookup version
	// If the option exists in custom lookups + freetext - it will only show the custom lookup version
	const allOptionsWithoutDuplicates = _.uniqBy(allOptions, "value");

	return allOptionsWithoutDuplicates;
}
