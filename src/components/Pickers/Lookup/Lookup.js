import * as React from "react";
import PropTypes from "prop-types";
import Select from "react-select/lib/Select";
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
import LookupDialog from "../LookupDialog";
import { isArray } from "util";
import onClickOutside from "react-onclickoutside";

const ExtendedLookupDialog = onClickOutside(LookupDialog);
const initialCache = {
	options: [],
	hasMore: true,
	isLoading: false
};

function memoizeLastSingleValueReturn(returnFunc, compareByFunc) {
	return function memoized(...args) {
		const val = returnFunc(...args);
		if (isArray(val)) {
			delete memoized.val;
			return val;
		} else if (compareByFunc(memoized.val) === compareByFunc(val)) {
			return memoized.val;
		} else {
			memoized.val = val;
			return val;
		}
	};
}

// replace selected option in Options array
// with memorized selected object
// to make them equal by reference
// (only for a single value lookup)
function adjustOptionsAndSelected(selectedOption, options) {
	if (selectedOption && !isArray(selectedOption)) {
		const valueIndex = findIndex(options, o => o.value === selectedOption.value);
		if (valueIndex > -1) {
			options[valueIndex] = selectedOption;
		} else {
			options.unshift(selectedOption);
		}
	}
}

class Lookup extends React.PureComponent {
	static defaultProps = {
		pageSize: 30,
		delay: 300,
		idSelector: x => x.Id,
		options: null,
		isMulti: false,
		isClearable: true,
		allowSearchWithEmptyFilter: true,
		openMenuOnFocus: false,
		menuPlacement: "bottom",
		placeholder: "",
		styles: {
			control: (base, state) => {
				let border, boxShadow;
				if (state.isFocused) {
					border = "1px solid #66afe9;";
					boxShadow = "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);";
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
	selectRef = React.createRef();

	get initialOptionsCache() {
		const { options, fullObjectValue, multiAsString, value } = this.props;

		return {
			"": {
				isLoading: false,
				options: options || [],
				values: fullObjectValue && !multiAsString && value ? value : [],
				hasMore: true
			}
		};
	}

	get allOptionValues() {
		return flatten(map(this.state.optionsCache, search => search.values)).concat(this.props.specialOptionValues);
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
			popupVisible: false,
			customOptions: []
		};

		this.onMenuOpen = debounce(this.onMenuOpen, 0);
		this.mapValue = memoizeLastSingleValueReturn(this.mapValue, o => o && o.value);
	}

	componentDidMount() {
		if (this.props.initMultiString) {
			this.initMultiStringValues();
		}
	}

	initMultiStringValues() {
		const { queryProvider, multiStringIdFilterString, includeMetadata } = this.props;

		if (!isEmpty(multiStringIdFilterString)) {
			queryProvider("")
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
		await this.setState({
			menuIsOpen: true,
			popupVisible: false,
			optionsCache: this.props.alwaysRefresh ? this.initialOptionsCache : this.state.optionsCache
		});

		const { optionsCache } = this.state;

		if (this.props.allowSearchWithEmptyFilter && (this.props.alwaysRefresh || !some(optionsCache[""].options))) {
			await this.loadOptions();
		}
	};

	onInputChange = async search => {
		await this.setState({
			search,
			customOptions: this.props.customOptions ? this.getCustomOptions(search) : []
		});

		const { optionsCache } = this.state;
		const shouldLoadOptions = !optionsCache[search] && (search || this.props.allowSearchWithEmptyFilter);
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
			const hasMore = results.options.length > 0;
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

	load(inputValue, previousOptions) {
		const {
			queryProvider,
			pageSize,
			resultsFilter,
			renderOption,
			idSelector,
			errorMessage,
			includeMetadata
		} = this.props;
		return new Promise((resolve, reject) => {
			queryProvider(inputValue)
				.withQuery({ includeMetadata })
				.take(pageSize)
				.skip(previousOptions ? previousOptions.length : 0)
				.fetchCollection()
				.then(results => (resultsFilter ? results.value.filter(resultsFilter) : results.value))
				.then(results =>
					resolve({
						options: results.map(x => ({
							value: idSelector(x),
							label: renderOption(x)
						})),
						values: results
					})
				)
				.catch(() => reject(errorMessage));
		});
	}

	onChange = (option, meta) => {
		const {
			fullObjectValue,
			onChange,
			idSelector,
			isMulti,
			value: lookupValues,
			multiAsString,
			delimiter
		} = this.props;
		if (fullObjectValue) {
			if (!isMulti) {
				meta.value =
					option &&
					(option.custom
						? option.fullObjectValue
						: !isNil(option.value) &&
							find(this.currentOptions.values, x => idSelector(x) === option.value));
			} else {
				const availableValues = this.currentOptions.values
					? this.currentOptions.values.concat(lookupValues)
					: lookupValues;
				if (!multiAsString) {
					meta.value = some(option)
						? option.reduce((values, o) => {
								if (o.custom) {
									return [ ...values, o.fullObjectValue ];
								}

								const value = find(availableValues, x => idSelector(x) === o.value);
								return value ? [ ...values, value ] : values;
							}, [])
						: [];
				} else {
					meta.value = (option || []).map(o => o.value).join(delimiter);
				}
			}
		}

		onChange && onChange(this.stripOptions(option), meta);
	};

	stripOptions = option => {
		if (!option) {
			return option;
		} else {
			return isArray(option)
				? option.map(({ label, value }) => ({ label, value }))
				: { label: option.label, value: option.value };
		}
	};

	togglePopup = async (rect, popupValue) => {
		if (!this.state.popupVisible && popupValue) {
			this.props.onChange &&
				this.props.onChange(null, {
					action: "update-value",
					value: popupValue
				});
		}

		this.setState(
			ps => ({
				...ps,
				popupVisible: !ps.popupVisible,
				popupPosition: rect && {
					x: rect.left,
					y: rect.bottom
				},
				popupValue,
				menuIsOpen: false
			}),
			() => {
				if (!this.state.popupVisible) {
					this.selectRef.current.focus();
				}
			}
		);
	};

	onMultiValueLabelClick = labelProps => async e => {
		if (!this.props.popup) {
			return;
		}
		const rect = e && e.target && e.target.parentElement.getBoundingClientRect();
		const availableValues = _(this.state.optionsCache)
			.values()
			.flatMap(x => x.values)
			.uniqBy(this.props.idSelector)
			.value();

		if (!_.some(availableValues)) {
			await this.loadOptions();
		}

		const { fullObjectValue, idSelector } = this.props;
		let option = labelProps ? labelProps.data : this.activeValue;
		if (!option) {
			return;
		}

		const value = fullObjectValue
			? option.custom ? option.fullObjectValue : find(availableValues, x => idSelector(x) === option.value)
			: this.stripOptions(option);

		this.togglePopup(rect, value);
	};

	mapValue = () => {
		const {
			isMulti,
			value: initialValue,
			renderOption,
			renderSelection,
			idSelector,
			multiAsString,
			delimiter
		} = this.props;
		const renderFn = renderSelection || renderOption;
		if (initialValue && renderFn) {
			if (!isMulti) {
				return {
					label: initialValue.label || renderFn(initialValue),
					value: initialValue.value || idSelector(initialValue)
				};
			}

			if (!multiAsString) {
				return initialValue.map(x => ({
					label: x.label || renderFn(x),
					value: x.value || idSelector(x)
				}));
			}

			return initialValue
				? initialValue.split(delimiter).map(o => {
						let current = find(
							this.allOptionValues,
							v => v && idSelector(v) && idSelector(v).toString() === o
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
			const { idSelector, renderOption, customOptions, fullObjectValue } = this.props;
			const customValues = customOptions(search.trim());

			return customValues
				? flatten([ customValues ]).map(x => ({
						value: idSelector(x),
						label: renderOption(x),
						custom: true,
						fullObjectValue: fullObjectValue && x
					}))
				: [];
		}
	};

	MultiValueContainer = containerProps => (
		<div className="multivalue-container" role="region" aria-labelledby={this.props.ariaLabelledBy}>
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
				? find(this.allOptionValues, x => x && idSelector(x) === multiValueProps.data.value)
				: multiValueProps.data.value;
			classes = classNames(selectionBindings(value));
		}

		return (
			<components.MultiValue
				{...multiValueProps}
				className={classNames("multi-value", classes, {
					active: multiValueProps.isFocused && (this.state.focused || this.state.popupVisible)
				})}
			/>
		);
	};

	MultiValueLabel = labelProps => {
		const onClick = this.onMultiValueLabelClick(labelProps);
		return (
			<button
				type="button"
				className="multi-value-button"
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
			? find(this.allOptionValues, x => x && idSelector(x) === optionProps.data.value)
			: optionProps.data.value;
		const classes = classNames(optionBindings(value));
		return <components.Option {...optionProps} className={classes} />;
	};

	onKeyDown = e => {
		const eventKey = e.key;
		switch (eventKey) {
			case "Enter":
				if (!this.state.menuIsOpen) {
					e.preventDefault();
				}
				return this.onMultiValueLabelClick()(e);
			case "ArrowLeft":
			case "ArrowRight":
				return this.setState({ menuIsOpen: false });
			case "Escape":
				if (this.state.popupVisible) {
					this.setState({ popupVisible: false });
				}
				break;
			default:
				break;
		}
	};

	setFocus = () => this.setState(ps => ({ focused: !ps.focused }));

	get customComponentRenderers() {
		const { allowSearchWithEmptyFilter, optionBindings, components } = this.props;
		let renderers = {
			MultiValueLabel: this.MultiValueLabel,
			MultiValueContainer: this.MultiValueContainer,
			MultiValue: this.MultiValue
		};

		if (!allowSearchWithEmptyFilter) {
			renderers.DropdownIndicator = null;
		}

		if (optionBindings) {
			renderers.Option = this.Option;
		}
		return { ...renderers, ...components };
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
			popup: Popup,
			isDraggable,
			id,
			disabled,
			ariaLabel,
			ariaLabelledBy,
			inputId,
			allowSearchWithEmptyFilter,
			openMenuOnFocus,
			menuPortalTarget,
			dragHandle,
			draggablePortalTarget
		} = this.props;
		const { search, menuIsOpen, customOptions } = this.state;

		const options = this.currentOptions.options.concat(customOptions);
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
					className={className}
					isMulti={isMulti}
					styles={styles}
					theme={theme}
					isClearable={isClearable}
					menuPlacement={menuPlacement}
					menuPortalTarget={menuPortalTarget}
					noOptionsMessage={noOptionsMessage}
					loadingMessage={loadingMessage}
					components={this.customComponentRenderers}
					openMenuOnClick={allowSearchWithEmptyFilter && !isMulti}
					openMenuOnFocus={openMenuOnFocus}
					isDisabled={disabled}
					tabSelectsValue={false}
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledBy}
					className="lookup"
				/>
				{this.state.popupVisible && (
					<ExtendedLookupDialog
						close={this.togglePopup}
						position={this.state.popupPosition}
						isDraggable={isDraggable}
						dragHandle={dragHandle}
						portalTarget={draggablePortalTarget}
						ariaLabelledBy={ariaLabelledBy}
					>
						<Popup value={this.state.popupValue} onSubmit={this.togglePopup} />
					</ExtendedLookupDialog>
				)}
			</React.Fragment>
		);
	}
}

Lookup.propTypes = {
	/**
	 * The id to set on the SelectContainer component
	 */
	id: PropTypes.string,
	/**
	 * The id of the search input
	 */
	inputId: PropTypes.string,
	/**
	 * Initial value
	 */
	value: PropTypes.any,
	/**
	 * If true, the box will be unselectable, can be changed on the fly
	 */
	disabled: PropTypes.bool,
	/**
	 * Callback executed when a value has been selected
	 */
	onChange: PropTypes.func,
	/**
	 * Renders text for each search result line
	 */
	renderOption: PropTypes.func,
	/**
	 * Renders text of selected option
	 */
	renderSelection: PropTypes.func,
	/**
	 * Used to retrieve a key from entity record, by default uses Entity.key property (that in turn returns Id)
	 */
	idSelector: PropTypes.func,
	/**
	 * Function that returns odata query for provied search term
	 */
	queryProvider: PropTypes.func,
	/**
	 * Used to filter result set before rendering dropdown
	 */
	resultsFilter: PropTypes.func,
	/**
	 * Scroll pagination. 20 by default
	 */
	pageSize: PropTypes.number,
	/**
	 * Throttle delay, 300 ms by default
	 */
	delay: PropTypes.number,
	/**
	 * A custom error message otherwise the general error message will be used
	 */
	errorMessage: PropTypes.string,
	/**
	 * Lookup options
	 */
	options: PropTypes.arrayOf(PropTypes.object),
	/**
	 * Placeholder
	 */
	placeholder: PropTypes.string,
	/**
	 * Root element's class name
	 */
	className: PropTypes.string,
	/**
	 * Allow the user to select multiple values
	 */
	isMulti: PropTypes.bool,
	/**
	 * Custom styles
	 */
	styles: PropTypes.shape({
		clearIndicator: PropTypes.func,
		container: PropTypes.func,
		control: PropTypes.func,
		dropdownIndicator: PropTypes.func,
		group: PropTypes.func,
		groupHeading: PropTypes.func,
		indicatorsContainer: PropTypes.func,
		indicatorsSeparator: PropTypes.func,
		input: PropTypes.func,
		loadingIndicator: PropTypes.func,
		loadingMessage: PropTypes.func,
		menu: PropTypes.func,
		menuPortal: PropTypes.func,
		menuList: PropTypes.func,
		multiValue: PropTypes.func,
		multiValueLabel: PropTypes.func,
		multiValueRemove: PropTypes.func,
		noOptionsMessage: PropTypes.func,
		option: PropTypes.func,
		placeholder: PropTypes.func,
		singleValue: PropTypes.func,
		valueContainer: PropTypes.func
	}),
	/**
	 * Theme override
	 */
	theme: PropTypes.func,
	/**
	 * Value can be cleared
	 */
	isClearable: PropTypes.bool,
	/**
	 * Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.
	 */
	menuPlacement: PropTypes.oneOf([ "bottom", "top", "auto" ]),
	/**
	 * Whether the menu should use a portal, and where it should attach
	 */
	menuPortalTarget: PropTypes.object,
	/**
	 * Text to display when there are no options
	 */
	noOptionsMessage: PropTypes.oneOfType([ PropTypes.func, PropTypes.exact(null) ]),
	/**
	 * Async: Text to display when loading options
	 */
	loadingMessage: PropTypes.oneOfType([ PropTypes.func, PropTypes.exact(null) ]),
	/**
	 * Include full object value
	 */
	fullObjectValue: PropTypes.bool,
	/**
	 * JSX elements to be rendered as draggable dialog when option is clicked
	 */
	popup: PropTypes.func,
	/**
	 * Is popup draggable
	 */
	isDraggable: PropTypes.bool,
	/**
	 * Draggable handle selector 
	 */
	dragHandle: PropTypes.string,
	/**
	 * Draggable dialog portal target Id
	 */
	draggablePortalTarget: PropTypes.string,
	/**
	 * Always fetch values when menu opens
	 */
	alwaysRefresh: PropTypes.bool,
	/**
	 * Function that returns one or many records that will be appened to the result list
	 */
	customOptions: PropTypes.func,
	/** Aria label */
	ariaLabel: PropTypes.string,
	/** 
	 * Labelled by Id
	 * */
	ariaLabelledBy: PropTypes.string,
	/** 
	 * Labels
	*/
	labels: PropTypes.shape({
		/**
		 * Delete button label
		 */
		delete: PropTypes.string
	}),
	/**
	 * Allows search for values without filtering text
	 */
	allowSearchWithEmptyFilter: PropTypes.bool,
	/**
	 * Should multi lookup return values as delimiter-separated string
	 */
	multiAsString: PropTypes.bool,
	/**
	 * Delimiter used if format is enabled. Set to ";" by default
	 */
	delimiter: PropTypes.string,
	/**
	 * Conditional css classes for option
	 */
	optionBindings: PropTypes.func,
	/**
	 * Conditional css classes for selection
	 */
	selectionBindings: PropTypes.func,
	/**
	 * Multi string lookup should initialize from ids string
	 */
	initMultiString: PropTypes.bool,
	/**
	 * Id field names filter query for initializing multi string lookup
	 */
	multiStringIdFilterString: PropTypes.string,
	/**
	 * List of custom options for a lookup
	 */
	specialOptionValues: PropTypes.array,
	/**
	 * Allows control of whether the menu is opened when the Select is focused
	 */
	openMenuOnFocus: PropTypes.bool,
	/**
	 * This complex object includes all the compositional components that are used in react-select.
	 * If you wish to overwrite a component, pass in an object with the appropriate namespace.
	 */
	components: PropTypes.object,
	/**
	 * Include metadata odata property
	 */
	includeMetadata: PropTypes.bool
};

export default Lookup;
