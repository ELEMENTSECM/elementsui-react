import * as React from "react";
import PropTypes from "prop-types";
import Select from "react-select/lib/Select";

const initialCache = {
	options: [],
	hasMore: true,
	isLoading: false
};

class Lookup extends React.Component {
	static defaultProps = {
		pageSize: 10,
		delay: 300,
		idSelector: (x) => x.Id,
		selectRef: () => {},
		options: null,
		isMulti: false
	};
	constructor(props) {
		super(props);

		const initialOptionsCache = props.options
			? {
					"": {
						isLoading: false,
						options: props.options,
						hasMore: true
					}
				}
			: {};

		this.state = {
			search: "",
			optionsCache: initialOptionsCache,
			menuIsOpen: false,
			value: null
		};
	}

	onMenuClose = () => {
		this.setState({
			search: "",
			menuIsOpen: false
		});
	};

	onMenuOpen = async () => {
		await this.setState({
			menuIsOpen: true
		});

		const { optionsCache } = this.state;

		if (!optionsCache[""]) {
			await this.loadOptions();
		}
	};

	onInputChange = async (search) => {
		await this.setState({
			search
		});

		const { optionsCache } = this.state;

		if (!optionsCache[search]) {
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

	onChange = (value) => {
		const { onChange } = this.props;
		this.setState({ value });
		onChange && onChange(value);
	};

	async loadOptions() {
		const { search, optionsCache } = this.state;

		const currentOptions = optionsCache[search] || initialCache;

		if (currentOptions.isLoading || !currentOptions.hasMore) {
			return;
		}

		await this.setState((prevState) => ({
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
			let options = await this.load(search, currentOptions.options);
			if (!options) {
				options = [];
			}
			const hasMore = options.length > 0;
			await this.setState((prevState) => ({
				optionsCache: {
					...prevState.optionsCache,
					[search]: {
						...currentOptions,
						options: currentOptions.options.concat(options),
						hasMore: !!hasMore,
						isLoading: false
					}
				}
			}));
		} catch (e) {
			await this.setState((prevState) => ({
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
				.take(pageSize)
				.skip(previousOptions ? previousOptions.length : 0)
				.fetchRawCollection()
				.then((results) => (resultsFilter ? results.value.filter(resultsFilter) : results.value))
				.then((results) =>
					resolve(
						results.map((x) => ({
							value: idSelector(x),
							label: renderOption(x),
							isFixed: true
						}))
					)
				)
				.catch(() => reject(errorMessage));
		});
	}

	render() {
		const { selectRef, placeholder, className, isMulti } = this.props;
		const { search, optionsCache, menuIsOpen, value } = this.state;
		const currentOptions = optionsCache[search] || initialCache;

		return (
			<Select
				value={value}
				inputValue={search}
				menuIsOpen={menuIsOpen}
				onMenuClose={this.onMenuClose}
				onMenuOpen={this.onMenuOpen}
				onInputChange={this.onInputChange}
				onMenuScrollToBottom={this.onMenuScrollToBottom}
				isLoading={currentOptions.isLoading}
				options={currentOptions.options}
				ref={selectRef}
				onChange={this.onChange}
				loadOptions={this.loadOptions}
				placeholder={placeholder}
				className={className}
				isMulti={isMulti}
			/>
		);
	}
}

Lookup.propTypes = {
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
	renderOption: PropTypes.func.isRequired,
	/**
		 * Used to retrieve a key from entity record, by default uses Entity.key property (that in turn returns Id)
		 */
	idSelector: PropTypes.func,
	/**
		 * Function that returns odata query for provied search term
		 */
	queryProvider: PropTypes.func.isRequired,
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
	 * Reference to select element
	 */
	selectRef: PropTypes.func,
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
	isMulti: PropTypes.bool
};

export default Lookup;
