import * as React from "react";
import Select from "react-select/base";
import { components } from "react-select";
import classNames from "classnames";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import find from "lodash/find";
import some from "lodash/some";
import findIndex from "lodash/findIndex";
import debounce from "lodash/debounce";
import flatten from "lodash/flatten";
import differenceBy from "lodash/differenceBy";
import size from "lodash/size";
import isEqual from "lodash/isEqual";
import isArray from "lodash/isArray";
import { StylesConfig } from "react-select/src/styles";
import { ThemeConfig } from "react-select/src/theme";
import {
	SelectComponentsConfig,
	SelectComponents
} from "react-select/src/components";
import _ from "lodash";
import { MultiValueGenericProps } from "react-select/src/components/MultiValue";
import { ActionMeta, OptionTypeBase } from "react-select/src/types";

const initialCache = {
	options: [],
	hasMore: true,
	isLoading: false
};

function memoizeLastSingleValueReturn(returnFunc, compareByFunc) {
	return function memoized(...args) {
		const val = returnFunc(...args);
		if (isArray(val)) {
			delete (memoized as any).val;
			return val;
		} else if (compareByFunc((memoized as any).val) === compareByFunc(val)) {
			return (memoized as any).val;
		} else {
			(memoized as any).val = val;
			return val;
		}
	};
}

// replace selected option in Options array
// with memorized selected object
// to make them equal by reference
// (only for a single value lookup)
function adjustOptionsAndSelected(selectedOption, options: any[]) {
	if (selectedOption && !isArray(selectedOption)) {
		const valueIndex = findIndex(
			options,
			o => o.value === selectedOption.value
		);
		if (valueIndex > -1) {
			options[valueIndex] = selectedOption;
		} else {
			options.unshift(selectedOption);
		}
	}
}

export type LookupOption = { value: any; label: string };

export type AllowSameOptionSettings = { uniqueIdFieldName: any, originalIdSelector: (value: any) => any };

export interface LookupProps {
	/**
	 * The id to set on the SelectContainer component
	 */
	id?: string;
	/**
	 * The id of the search input
	 */
	inputId?: string;
	/**
	 * Initial value
	 */
	value?: any;
	/**
	 * If true, the box will be unselectable, can be changed on the fly
	 */
	disabled?: boolean;
	/**
	 * Callback executed when a value has been selected
	 */
	onChange?: (...args: any[]) => any;
	/**
	 * Renders text for each search result line
	 */
	renderOption?: (value: any) => string;
	/**
	 * Renders text of selected option
	 */
	renderSelection?: (value: any) => string;
	/**
	 * Used to retrieve a key from entity record, by default uses Entity.key property (that in turn returns Id)
	 */
	idSelector?: (value: any) => any;
	/**
	 * Function that returns odata query for provided search term
	 */
	queryProvider?: (filter: string) => any;
	/**
	 * Used to filter result set before rendering dropdown
	 */
	resultsFilter?: (value: any) => boolean;
	/**
	 * Scroll pagination. 30 by default
	 */
	pageSize?: number;
	/**
	 * Throttle delay, 300 ms by default
	 */
	delay?: number;
	/**
	 * A custom error message otherwise the general error message will be used
	 */
	errorMessage?: string;
	/**
	 * Lookup options
	 */
	options?: LookupOption[];
	/**
	 * Placeholder
	 */
	placeholder?: string;
	/**
	 * Root element's class name
	 */
	className?: string;
	/**
	 * Allow the user to select multiple values
	 */
	isMulti?: boolean;
	/**
	 * Custom styles
	 */
	styles?: StylesConfig;
	/**
	 * Theme override
	 */
	theme?: ThemeConfig;
	/**
	 * Value can be cleared
	 */
	isClearable?: boolean;
	/**
	 * Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.
	 */
	menuPlacement?: "bottom" | "top" | "auto";
	/**
	 * Whether the menu should use a portal, and where it should attach
	 */
	menuPortalTarget?: HTMLElement;
	/**
	 * Text to display when there are no options
	 */
	noOptionsMessage?: (value?: any) => string | null;
	/**
	 * Async: Text to display when loading options
	 */
	loadingMessage?: (value?: any) => string | null;
	/**
	 * Include full object value
	 */
	fullObjectValue?: boolean;
	/**
	 * The function to be called on value click if multi-value mode is enabled
	 */
	onValueClick?: (target: HTMLElement, value: any) => any;
	/**
	 * The function to be called when user presses Escape key
	 */
	onEscape?: () => any;
	/**
	 * Function that returns one or many records that will be appened to the result list
	 */
	customOptions?: (...args: any[]) => any;
	/** Aria label */
	ariaLabel?: string;
	/**
	 * Labelled by Id
	 * */
	ariaLabelledBy?: string;
	/**
	 * Labels
	 */
	labels?: {
		delete?: string;
	};
	/**
	 * Minimum length of search term to start fetching options
	 */
	minInputLength?: number;
	/**
	 * Should multi lookup return values as delimiter-separated string
	 */
	multiAsString?: boolean;
	/**
	 * Delimiter used if format is enabled. Set to ";" by default
	 */
	delimiter?: string;
	/**
	 * Conditional css classes for option
	 */
	optionBindings?: (value: any) => string[];
	/**
	 * Conditional css classes for selection
	 */
	selectionBindings?: (value: any) => string[];
	/**
	 * Multi string lookup should initialize from ids string
	 */
	initMultiString?: boolean;
	/**
	 * Id field names filter query for initializing multi string lookup
	 */
	multiStringIdFilterString?: string;
	/**
	 * List of custom options for a lookup
	 */
	specialOptionValues?: any[];
	/**
	 * Allows control of whether the menu is opened when the Select is focused
	 */
	openMenuOnFocus?: boolean;
	/**
	 * This complex object includes all the compositional components that are used in react-select.
	 * If you wish to overwrite a component, pass in an object with the appropriate namespace.
	 */
	components?: SelectComponentsConfig<any>;
	/**
	 * Include metadata odata property
	 */
	includeMetadata?: boolean;
	/**
	 * The function that maps lookup values
	 */
	map?: (value: any) => any;
	/**
	 * Id setter for duplicated lookup values functionality.
	 * Make sure that each option and value passed to lookup have unique Id
	 */
	duplicatedValuesIdSetter?: (value: any) => any;
	/**
	 * Should display custom options before search result options
	 */
	displayCustomOptionsOnTop?: boolean;
	/**
	 * When False disables caching of initial options and re-fetches the data everytime the menu is opened.
	 * True by default.
	 */
	cacheInitialOptions?: boolean;

}

type State = {
	search: string;
	optionsCache: {
		[key: string]: {
			isLoading: boolean;
			options: any[];
			values: any;
			hasMore?: boolean;
		};
	};
	menuIsOpen: boolean;
	customOptions: any[];
	queryParams: any;
	focused?: boolean;
};

export default class Lookup extends React.PureComponent<LookupProps, State> {
	static defaultProps = {
		pageSize: 30,
		delay: 300,
		idSelector: x => x.Id,
		options: null,
		isMulti: false,
		isClearable: true,
		minInputLength: 0,
		openMenuOnFocus: false,
		menuPlacement: "bottom",
		placeholder: "",
		cacheInitialOptions: true,
		styles: {
			control: (base, state) => {
				let border, boxShadow;
				if (state.isFocused) {
					border = "1px solid #66afe9;";
					boxShadow =
						"inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);";
				} else {
					border = "1px solid #ccc;";
					boxShadow = "inset 0 1px 1px rgba(0,0,0,.075);";
				}
				return {
					...base,
					minHeight: 34,
					height: "auto",
					border: border,
					borderRadius: 4,
					boxShadow: boxShadow
				};
			},
			menu: base => ({ ...base, zIndex: 9999 }),
			menuPortal: base => ({ ...base, zIndex: 9999 }),
			indicatorsContainer: (base, state) => ({
				...base,
				":before": state.isDisabled && {
					font: "normal normal normal 14px/1 FontAwesome",
					content: `"\\f023"`
				}
			})
		},
		delimiter: ";",
		includeMetadata: false
	};

	activeValue = null;
	selectRef = React.createRef<Select<any>>();

	static filterOption() {
		return true;
	}

	get initialOptionsCache() {
		const { options, fullObjectValue, multiAsString, value } = this.props;

		return {
			"": {
				isLoading: false,
				options: options || [],
				values: fullObjectValue && !multiAsString && value ? value! : [],
				hasMore: true
			}
		};
	}

	get currentQueryParams() {
		const oDataQuery = this.props.queryProvider?.("");
		return oDataQuery?.settings?.params || {};
	}

	get allOptionValues() {
		return flatten(map(this.state.optionsCache, search => search.values))
			.concat(this.props.specialOptionValues)
			.filter(x => x);
	}

	get currentOptions() {
		const { search, optionsCache } = this.state;
		return optionsCache[search] || initialCache;
	}

	constructor(props) {
		super(props);

		this.state = {
			search: "",
			optionsCache: this.initialOptionsCache,
			menuIsOpen: false,
			customOptions: [],
			queryParams: this.currentQueryParams
		};

		this.onMenuOpen = debounce(this.onMenuOpen, 0);
		this.mapValue = memoizeLastSingleValueReturn(
			this.mapValue,
			o => o && o.value
		);
	}

	componentDidMount() {
		if (this.props.initMultiString) {
			this.initMultiStringValues();
		}
	}

	componentDidUpdate() {
		const {
			isMulti,
			multiAsString,
			value,
			fullObjectValue,
			idSelector,
			map: lookupMap
		} = this.props;
		if (isMulti && fullObjectValue && !multiAsString) {
			let newValues =
				value && differenceBy(value, this.allOptionValues || [], idSelector!);
			lookupMap && (newValues = map(newValues, lookupMap));
			some(newValues) &&
				this.setState(prevState => ({
					optionsCache: {
						...prevState.optionsCache,
						[prevState.search]: {
							...prevState.optionsCache[prevState.search],
							values: [...newValues, ...this.currentOptions.values]
						}
					}
				}));
		}
	}

	initMultiStringValues() {
		const {
			queryProvider,
			multiStringIdFilterString,
			includeMetadata
		} = this.props;

		if (!isEmpty(multiStringIdFilterString)) {
			queryProvider?.("")
				.filter(multiStringIdFilterString)
				.withQuery({ includeMetadata })
				.fetchAllPages()
				.then(results => {
					this.setState(prevState => ({
						optionsCache: {
							"": {
								...prevState.optionsCache[""],
								values: results
							}
						}
					}));
				});
		}
	}

	onMenuClose = () => {
		this.setState({
			search: "",
			menuIsOpen: false,
			customOptions: []
		});
	};

	onMenuOpen = async () => {
		if (this.state.menuIsOpen)  {
			return;
		}

		const reloadOptions = !this.props.cacheInitialOptions || !isEqual(
			this.currentQueryParams,
			this.state.queryParams
		);
		await this.setState({
			menuIsOpen: true,
			optionsCache: reloadOptions
				? this.initialOptionsCache
				: this.state.optionsCache
		});

		const { optionsCache } = this.state;

		if (this.props.minInputLength === 0 && !some(optionsCache[""].options)) {
			await this.loadOptions();
		}
	};

	onInputChange = async search => {
		await this.setState({
			search,
			customOptions: this.props.customOptions
				? this.getCustomOptions(search)
				: []
		});

		const { optionsCache } = this.state;
		const shouldLoadOptions =
			!optionsCache[search] && size(search) >= (this.props.minInputLength || 0);
		if (shouldLoadOptions) {
			await this.loadOptions();
		}
	};

	onMenuScrollToBottom = async () => {
		const { search, optionsCache } = this.state;
		const currentOptions = optionsCache[search];

		if (currentOptions) {
			await this.loadOptions();
		}
	};

	async loadOptions() {
		if (!this.props.queryProvider) {
			return;
		}

		const { search } = this.state;

		if (this.currentOptions.isLoading || !this.currentOptions.hasMore) {
			return;
		}

		await this.setState(prevState => ({
			search,
			optionsCache: {
				...prevState.optionsCache,
				[search]: {
					...this.currentOptions,
					isLoading: true
				}
			}
		}));

		try {
			let results = await this.load(search, this.currentOptions.options);
			if (!results.options) {
				results.options = [];
			}
			const hasMore = results.options.length > 0 && results.options.length === this.props.pageSize;
			await this.setState(prevState => ({
				optionsCache: {
					...prevState.optionsCache,
					[search]: {
						...this.currentOptions,
						options: this.currentOptions.options.concat(results.options),
						values:
							this.props.fullObjectValue &&
							(this.currentOptions.values
								? results.values.concat(this.currentOptions.values)
								: results.values),
						hasMore,
						isLoading: false
					}
				}
			}));
		} catch (e) {
			await this.setState(prevState => ({
				optionsCache: {
					...prevState.optionsCache,
					[search]: {
						...this.currentOptions,
						isLoading: false
					}
				}
			}));
		}
	}

	load(
		inputValue,
		previousOptions
	): Promise<{ options: LookupOption[]; values: any[] }> {
		const {
			queryProvider,
			pageSize,
			resultsFilter,
			renderOption,
			idSelector,
			errorMessage,
			includeMetadata,
			fullObjectValue
		} = this.props;
		const oDataQuery = queryProvider!(inputValue);
		return new Promise((resolve, reject) => {
			oDataQuery
				.withQuery({ includeMetadata })
				.take(pageSize)
				.skip(previousOptions ? previousOptions.length : 0)
				.fetchCollection()
				.then(results => {
					this.setState({ queryParams: oDataQuery.settings.params });
					return resultsFilter
						? results.value.filter(resultsFilter)
						: results.value;
				})
				.then(results =>
					resolve({
						options: results.map(x => ({
							value: idSelector!(x),
							label: renderOption!(x) || idSelector!(x),
							fullObjectValue: fullObjectValue && x
						})),
						values: results
					})
				)
				.catch(() => reject(errorMessage));
		});
	}

	onChange = (option: any, meta: ActionMeta<OptionTypeBase> & { value?: any }) => {
		const {
			fullObjectValue,
			onChange,
			idSelector,
			isMulti,
			value: lookupValues,
			multiAsString,
			delimiter,
			map: lookupMap,
			duplicatedValuesIdSetter
		} = this.props;
		if (fullObjectValue) {
			if (!isMulti) {
				meta.value =
					option &&
					(option.custom
						? option.fullObjectValue
						: !isNil(option.value) &&
						  find(
								this.currentOptions.values,
								x => idSelector!(x) === option.value
						  ));
			} else {
				const availableValues = this.currentOptions.values
					? this.currentOptions.values.concat(lookupValues)
					: lookupValues;

				if (!multiAsString) {
					meta.value = some(option)
						? option.reduce((values, o) => {
								if (o.custom) {
									return [...values, o.fullObjectValue];
								}

								const value = find(
									availableValues,
									x => idSelector!(x) === o.value
								);
								return value ? [...values, value] : values;
						  }, [])
						: [];
					lookupMap && (meta.value = map(meta.value, lookupMap));
				} else {
					meta.value = (option || []).map(o => o.value).join(delimiter);
				}
			}
		}

		onChange && onChange(this.stripOptions(option), meta);

		if (duplicatedValuesIdSetter && fullObjectValue) {
			this.adjustOptionsForSameValuesSelection(meta);
		}
	};

	adjustOptionsForSameValuesSelection(meta: ActionMeta<OptionTypeBase> & { value?: any }) {
		const { duplicatedValuesIdSetter, idSelector } = this.props;
		const search = this.state.search;

		if (meta.action === "select-option" && meta.option) {
			const duplicatedOption = _.cloneDeep(meta.option);
			duplicatedValuesIdSetter!(duplicatedOption.fullObjectValue);
			duplicatedOption.value = idSelector!(duplicatedOption.fullObjectValue);

			const optionIndex = _.findIndex(this.currentOptions.options, meta.option);
			const options = [...this.currentOptions.options];
			const values = [...this.currentOptions.values];
			options.splice(optionIndex, 0, duplicatedOption);
			values.splice(optionIndex, 0, duplicatedOption.fullObjectValue);

			this.setState(prevState => ({
				...prevState,
				optionsCache: {
					...prevState.optionsCache,
					[search]: {
						...this.currentOptions,
						options,
						values
					}
				}
			}));
		}

		if (meta.action === "remove-value") {
			_.each(this.state.optionsCache, (cache, searchTerm) => {
				const redundantOption = _.find(
					cache.options,
					option => idSelector!(option.fullObjectValue) === idSelector!(meta.removedValue?.fullObjectValue)
				);
				if (redundantOption) {
					this.setState(prevState => ({
						...prevState,
						optionsCache: {
							...prevState.optionsCache,
							[searchTerm]: {
								...cache,
								options: _.without(cache.options, redundantOption)
							}
						}
					}));
				}
			});
		}
	}

	stripOptions = (option: LookupOption | LookupOption[]) => {
		if (!option) {
			return option;
		} else {
			return isArray(option)
				? option.map(({ label, value }) => ({ label, value }))
				: { label: option.label, value: option.value };
		}
	};

	onMultiValueLabelClick = (
		labelProps?: MultiValueGenericProps<any>
	) => async e => {
		if (!this.props.onValueClick) {
			return;
		}
		e.persist();
		const availableValues = _(this.state.optionsCache)
			.values()
			.flatMap(x => x.values)
			.uniqBy(this.props.idSelector!)
			.value();

		if (!some(availableValues)) {
			await this.loadOptions();
		}

		const { fullObjectValue, idSelector } = this.props;
		let option = labelProps ? labelProps!.data : this.activeValue;
		if (!option) {
			return;
		}

		const value = fullObjectValue
			? option.custom
				? option.fullObjectValue
				: find(availableValues, x => idSelector!(x) === option.value)
			: this.stripOptions(option);

		this.props.onValueClick(e.target, value);
	};

	mapValue = () => {
		const {
			isMulti,
			value: initialValue,
			renderOption,
			renderSelection,
			idSelector,
			multiAsString,
			delimiter,
			fullObjectValue
		} = this.props;
		const renderFn = renderSelection || renderOption;
		if (initialValue && renderFn) {
			if (!isMulti) {
				return {
					label:
						initialValue.label ||
						renderFn(initialValue) ||
						idSelector!(initialValue),
					value: initialValue.value || idSelector!(initialValue)
				};
			}

			if (!multiAsString) {
				return initialValue.map(x => ({
					label: x.label || renderFn(x) || idSelector!(x),
					value: x.value || idSelector!(x),
					fullObjectValue: fullObjectValue && x
				}));
			}

			return initialValue
				? initialValue.split(delimiter).map(o => {
						let current = find(
							this.allOptionValues,
							v => v && idSelector!(v) && idSelector!(v).toString() === o
						);

						return {
							label: current ? renderFn(current) : o,
							value: o
						};
				  })
				: null;
		} else {
			return initialValue;
		}
	};

	getCustomOptions = search => {
		if (!(search && search.trim())) {
			return [];
		} else {
			const {
				idSelector,
				renderOption,
				customOptions,
				fullObjectValue
			} = this.props;
			const customValues = customOptions!(search.trim());

			return customValues
				? flatten([customValues]).map(x => ({
						value: idSelector!(x),
						label: renderOption!(x) || idSelector!(x),
						custom: true,
						fullObjectValue: fullObjectValue && x
				  }))
				: [];
		}
	};

	MultiValueContainer = containerProps => (
		<div
			className="multivalue-container"
			role="region"
			aria-labelledby={this.props.ariaLabelledBy}
		>
			<components.MultiValueContainer {...containerProps} />
		</div>
	);

	MultiValue = multiValueProps => {
		const { selectionBindings, fullObjectValue, idSelector } = this.props;
		let classes = "";

		if (multiValueProps.isFocused) {
			this.activeValue = multiValueProps.data;
		}

		if (selectionBindings) {
			const value = fullObjectValue
				? find(
						this.allOptionValues,
						x => x && idSelector!(x) === multiValueProps.data.value
				  )
				: multiValueProps.data.value;
			classes = classNames(selectionBindings(value));
		}

		return (
			<components.MultiValue
				{...multiValueProps}
				className={classNames("multi-value", classes, {
					active: multiValueProps.isFocused && this.state.focused
				})}
			/>
		);
	};

	MultiValueLabel = (labelProps: MultiValueGenericProps<any>) => {
		const onClick = this.onMultiValueLabelClick(labelProps);
		const { optionBindings } = this.props;
		const classes = optionBindings?.(labelProps.data.value) || [];
		return (
			<button
				type="button"
				className={classNames("multi-value-button", ...classes)}
				onClick={onClick}
				style={{ border: "none", background: "rgb(230, 230, 230)" }}
				aria-haspopup="dialog"
				tabIndex={-1}
			>
				{labelProps.data.label}
			</button>
		);
	};

	Option = optionProps => {
		const { optionBindings, fullObjectValue, idSelector } = this.props;
		const value = fullObjectValue
			? find(
					this.allOptionValues,
					x => x && idSelector!(x) === optionProps.data.value
			  )
			: optionProps.data.value;
		const classes = classNames(optionBindings!(value));
		return <components.Option {...optionProps} className={classes} />;
	};

	onKeyDown = e => {
		const eventKey = e.key;
		switch (eventKey) {
			case "Enter":
				if (this.state.menuIsOpen) {
					this.onMultiValueLabelClick()(e);
				}
				break;
			case "ArrowLeft":
			case "ArrowRight":
				return this.setState({ menuIsOpen: false });
			case "Escape":
				this.props.onEscape && this.props.onEscape();
				break;
			default:
				break;
		}
	};

	setFocus = () => this.setState(ps => ({ focused: !ps.focused }));

	get customComponentRenderers() {
		const { minInputLength, optionBindings, components } = this.props;
		let renderers: Partial<SelectComponents<any>> = {
			MultiValueLabel: this.MultiValueLabel,
			MultiValueContainer: this.MultiValueContainer,
			MultiValue: this.MultiValue,
			...components
		};

		if (minInputLength! > 0) {
			renderers.DropdownIndicator = null;
		}

		if (optionBindings) {
			renderers.Option = this.Option;
		}
		return renderers;
	}

	render() {
		const {
			placeholder,
			className,
			isMulti,
			styles,
			theme,
			isClearable,
			menuPlacement,
			noOptionsMessage,
			loadingMessage,
			id,
			disabled,
			ariaLabel,
			ariaLabelledBy,
			inputId,
			minInputLength,
			openMenuOnFocus,
			menuPortalTarget,
			displayCustomOptionsOnTop,
		} = this.props;
		const { search, menuIsOpen, customOptions } = this.state;

		const options = displayCustomOptionsOnTop ? customOptions.concat(this.currentOptions.options) : this.currentOptions.options.concat(customOptions);
		let valueOption = this.mapValue();

		adjustOptionsAndSelected(valueOption, options);

		return (
			<React.Fragment>
				<Select
					id={id}
					inputId={inputId}
					value={valueOption}
					inputValue={search}
					menuIsOpen={menuIsOpen}
					onFocus={this.setFocus}
					onBlur={this.setFocus}
					onMenuClose={this.onMenuClose}
					onMenuOpen={this.onMenuOpen}
					onKeyDown={this.onKeyDown}
					onInputChange={this.onInputChange}
					onMenuScrollToBottom={this.onMenuScrollToBottom}
					isLoading={this.currentOptions.isLoading}
					options={options}
					ref={this.selectRef}
					onChange={this.onChange}
					placeholder={placeholder}
					className={classNames("lookup", className)}
					isMulti={isMulti}
					styles={styles}
					theme={theme}
					isClearable={isClearable}
					menuPlacement={menuPlacement}
					menuPortalTarget={menuPortalTarget}
					noOptionsMessage={noOptionsMessage}
					loadingMessage={loadingMessage}
					components={this.customComponentRenderers}
					openMenuOnClick={minInputLength === 0 && !isMulti}
					openMenuOnFocus={openMenuOnFocus}
					isDisabled={disabled}
					tabSelectsValue={false}
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledBy}
					filterOption={Lookup.filterOption}
				/>
			</React.Fragment>
		);
	}
}
