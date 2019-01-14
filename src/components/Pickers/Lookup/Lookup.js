import * as React from "react";
import PropTypes from "prop-types";
import Select from "react-select/lib/Select";
import { components } from "react-select";
import find from "lodash/find";
import some from "lodash/some";
import findIndex from "lodash/findIndex";
import debounce from "lodash/debounce";
import flatten from "lodash/flatten";
import LookupDialog from "../LookupDialog";
import { isArray } from "util";
import onClickOutside from "react-onclickoutside";
import classNames from "classnames";

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
		pageSize: 10,
		delay: 300,
		idSelector: x => x.Id,
		options: null,
		isMulti: false,
		isClearable: true,
		allowSearchWithEmptyFilter: true,
		menuPlacement: "bottom",
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
			placeholder: () => ({
				display: "none"
			}),
			menuPortal: base => ({ ...base, zIndex: 9999 }),
			menu: base => ({ ...base, position: "relative" }),
			indicatorsContainer: (base, state) => ({
				...base,
				":before": state.isDisabled && {
					font: "normal normal normal 14px/1 FontAwesome",
					content: `"\\f023"`
				}
			})
		}
	};

	activeValue = null;
	selectRef = React.createRef();

	get initialOptionsCache() {
		return {
			"": {
				isLoading: false,
				options: this.props.options || [],
				values: this.props.fullObjectValue && this.props.value,
				hasMore: true
			}
		};
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

		if (this.props.alwaysRefresh || (this.props.allowSearchWithEmptyFilter && !some(optionsCache[""].options))) {
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
		const { search, optionsCache } = this.state;
		const currentOptions = optionsCache[search] || initialCache;

		if (currentOptions.isLoading || !currentOptions.hasMore) {
			return;
		}

		await this.setState(prevState => ({
			search,
			optionsCache: {
				...prevState.optionsCache,
				[search]: {
					...currentOptions,
					isLoading: true
				}
			}
		}));

		try {
			let results = await this.load(search, currentOptions.options);
			if (!results.options) {
				results.options = [];
			}
			const hasMore = results.options.length > 0;
			await this.setState(prevState => ({
				optionsCache: {
					...prevState.optionsCache,
					[search]: {
						...currentOptions,
						options: currentOptions.options.concat(results.options),
						values:
							this.props.fullObjectValue &&
							(currentOptions.values ? results.values.concat(currentOptions.values) : results.values),
						hasMore: !!hasMore,
						isLoading: false
					}
				}
			}));
		} catch (e) {
			await this.setState(prevState => ({
				optionsCache: {
					...prevState.optionsCache,
					[search]: {
						...currentOptions,
						isLoading: false
					}
				}
			}));
		}
	}

	load(inputValue, previousOptions) {
		const { queryProvider, pageSize, resultsFilter, renderOption, idSelector, errorMessage } = this.props;
		return new Promise((resolve, reject) => {
			queryProvider(inputValue)
				.withQuery({ includeMetadata: false })
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
		const { search, optionsCache } = this.state;
		const { fullObjectValue, onChange, idSelector, isMulti, value: lookupValues } = this.props;
		const currentOptions = optionsCache[search] || initialCache;
		if (fullObjectValue) {
			if (!isMulti) {
				meta.value =
					option &&
					(option.custom
						? option.fullObjectValue
						: option.value && find(currentOptions.values, x => idSelector(x) === option.value));
			} else {
				const availableValues = currentOptions.values
					? currentOptions.values.concat(lookupValues)
					: lookupValues;
				meta.value = some(option)
					? option.reduce((values, o) => {
							if (o.custom) {
								return [ ...values, o.fullObjectValue ];
							}

							const value = find(availableValues, x => idSelector(x) === o.value);
							return value ? [ ...values, value ] : values;
						}, [])
					: [];
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
		const rect = e && e.target && e.target.parentElement.getBoundingClientRect();
		if (!this.state.optionsCache[this.state.search] || !some(this.state.optionsCache[this.state.search].options)) {
			await this.loadOptions();
		}

		const { search, optionsCache } = this.state;
		const { fullObjectValue, idSelector } = this.props;
		const currentOptions = optionsCache[search] || initialCache;
		let option = labelProps ? labelProps.data : this.activeValue;
		if (!option) {
			return;
		}

		const value = fullObjectValue
			? option.custom ? option.fullObjectValue : find(currentOptions.values, x => idSelector(x) === option.value)
			: this.stripOptions(option);

		this.togglePopup(rect, value);
	};

	mapValue = () => {
		const { isMulti, value: initialValue, renderOption, idSelector } = this.props;
		if (initialValue && renderOption) {
			return !isMulti
				? {
						label: initialValue.label || renderOption(initialValue),
						value: initialValue.value || idSelector(initialValue)
					}
				: initialValue.map(x => ({
						label: x.label || renderOption(x),
						value: x.value || idSelector(x)
					}));
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
		if (multiValueProps.isFocused) {
			this.activeValue = multiValueProps.data;
		}

		return (
			<components.MultiValue
				{...multiValueProps}
				className={classNames("multi-value", {
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
				onClick={onClick}
				style={{ border: "none", background: "rgb(230, 230, 230)" }}
				aria-haspopup="dialog"
				tabIndex={-1}
			>
				{labelProps.data.label}
			</button>
		);
	};

	onKeyDown = e => {
		const eventKey = e.key;
		switch (eventKey) {
			case "Enter":
				e.preventDefault();
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
		const { allowSearchWithEmptyFilter } = this.props;
		let renderers = {
			MultiValueLabel: this.MultiValueLabel,
			MultiValueContainer: this.MultiValueContainer,
			MultiValue: this.MultiValue
		};

		if (!allowSearchWithEmptyFilter) {
			renderers.DropdownIndicator = null;
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
			popup: Popup,
			isDraggable,
			id,
			disabled,
			ariaLabel,
			ariaLabelledBy,
			inputId,
			allowSearchWithEmptyFilter
		} = this.props;
		const { search, optionsCache, menuIsOpen, customOptions } = this.state;
		const currentOptions = optionsCache[search] || initialCache;
		const ExtendedLookupDialog = onClickOutside(LookupDialog);

		const options = currentOptions.options.concat(customOptions);
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
					isLoading={currentOptions.isLoading}
					options={options}
					ref={this.selectRef}
					onChange={this.onChange}
					placeholder={placeholder}
					className={className}
					isMulti={isMulti}
					styles={styles}
					theme={theme}
					menuPortalTarget={document.body}
					isClearable={isClearable}
					menuPlacement={menuPlacement}
					noOptionsMessage={noOptionsMessage}
					loadingMessage={loadingMessage}
					components={this.customComponentRenderers}
					openMenuOnClick={allowSearchWithEmptyFilter && !isMulti}
					openMenuOnFocus={allowSearchWithEmptyFilter && !isMulti}
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
	value: PropTypes.oneOfType([
		PropTypes.shape({ value: PropTypes.any, label: PropTypes.string }),
		PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })),
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.object
	]),
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
	allowSearchWithEmptyFilter: PropTypes.bool
};

export default Lookup;
