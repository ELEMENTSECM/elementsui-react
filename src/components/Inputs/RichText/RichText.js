import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import extend from "lodash/extend";
import throttle from "lodash/throttle";
import loadScript from "load-script";

const defaultConfig = {
	toolbar: [
		"font",
		"fontSize",
		"bold",
		"italic",
		"underline",
		"-",
		"numberedList",
		"bulletedList",
		"-",
		"outdent",
		"indent",
		"-",
		"justifyLeft",
		"justifyCenter",
		"justifyRight",
		"justifyBlock",
		"-",
		"link",
		"easyImage",
		"maximize",
		"preview"
	],
	fontSize_sizes: [ "8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72" ]
		.map(size => size + "/" + size + "pt")
		.join(";"),
	font_names: [
		"Arial/Arial, Helvetica, sans-serif",
		"Calibri/Calibri, Tahoma, sans-serif",
		"Courier New/Courier New, Courier, monospace",
		"Georgia/Georgia, serif;" + "Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif",
		"Tahoma/Tahoma, Geneva, sans-serif",
		"Times New Roman/Times New Roman, Times, serif",
		"Verdana/Verdana, Geneva, sans-serif"
	].join(";"),
	extraPlugins: "base64image,pastefromword",
	allowedContent: true,
	resize_enabled: false,
	forcePasteAsPlainText: false,
	applyInitialStyle: true,
	bodyClass: "",
	startupFocus: false,
	disableNativeSpellChecker: false
};

class RichText extends React.PureComponent {
	static defaultProps = {
		config: {},
		scriptUrl: "https://cdn.ckeditor.com/4.7.3/standard/ckeditor.js",
		throttle: 500
	};

	static editorInstance;

	static getDerivedStateFromProps(props) {
		if (RichText.editorInstance && RichText.editorInstance.getData().trim() !== props.value) {
			RichText.editorInstance.setData(props.value);
		}

		return null;
	}

	constructor(props) {
		super(props);

		this.state = {
			isScriptLoaded: props.isScriptLoaded
		};
	}

	componentDidMount() {
		if (!this.state.isScriptLoaded) {
			loadScript(this.props.scriptUrl, this.onLoad);
		} else {
			this.onLoad();
		}
	}

	componentWillUnmount() {
		this.unmounting = true;
		if (RichText.editorInstance) {
			RichText.editorInstance.removeAllListeners();
			RichText.editorInstance.destroy();
		}
	}

	onChange = () => {
		const data = RichText.editorInstance.getData().trim();
		if (data !== this.props.value) {
			this.props.events["change"](data);
		}
	};

	onLoad = () => {
		const { config, value, events } = this.props;
		if (this.unmounting) return;

		this.setState({
			isScriptLoaded: true
		});

		if (!window.CKEDITOR) {
			console.error("CKEditor not found");
			return;
		}

		RichText.editorInstance = window.CKEDITOR.appendTo(
			ReactDOM.findDOMNode(this),
			extend(defaultConfig, config),
			value
		);

		//Register listener for custom events if any
		for (var event in events) {
			var eventHandler = events[event];
			if (event === "change") {
				RichText.editorInstance.on(event, throttle(this.onChange, this.props.throttle));
			} else {
				RichText.editorInstance.on(event, eventHandler);
			}
		}

		if (config.applyInitialStyle) {
			RichText.editorInstance.on(
				"selectionChange",
				event => {
					const initialStyle = new window.CKEDITOR.style({
						element: "span",
						styles: {
							"font-family": "Calibri, Tahoma, sans-serif",
							"font-size": "11pt"
						}
					});

					if (!RichText.editorInstance.getData() && !initialStyle.checkActive(event.data.path)) {
						RichText.editorInstance.applyStyle(initialStyle);
					}
				},
				null,
				null,
				100
			);
		}

		RichText.editorInstance.on(
			"toHtml",
			event => {
				// Dirty trick to remove comments from internal style blocks
				const cleanHtml = event.data.dataValue
					.replace(/<style[^>]*>\s*<!--/, "<style>")
					.replace(/-->\s*<\/style>/, "</style>");

				event.data.dataValue = cleanHtml;
			},
			null,
			null,
			1
		);

		if (config.prependLines) {
			RichText.editorInstance.on("instanceReady", () => {
				prependContentWithLines();
			});
		}
	};

	prependContentWithLines() {
		const prependText = new Array(this.props.config.prependLines + 1).join("\n");

		RichText.editorInstance.focus();

		const range = RichText.editorInstance.createRange();
		range.moveToElementEditablePosition(range.root, false);
		RichText.editorInstance.insertText(prependText);

		RichText.editorInstance.getSelection().selectRanges([ range ]);
	}

	render() {
		const { id, className, value } = this.props;
		return <div id={id} className={className} />;
	}
}

RichText.propTypes = {
	/**
	 * Root div's id
	 */
	id: PropTypes.string,
	/**
	 * Current value
	 */
	value: PropTypes.string,
	/**
	 * CKEditor configuration object
	 */
	config: PropTypes.object,
	/**
	 * Event handlers { [eventName: string]: (e) => any }
	 */
	events: PropTypes.object,
	/**
	 * URL of ckeditor.js file. It is loaded from CDN by default.
	 */
	scriptUrl: PropTypes.string,
	/**
	 * Root div's class
	 */
	className: PropTypes.string,
	/**
	 * Throttle delay in milliseconds
	 */
	throttle: PropTypes.number
};

export default RichText;
