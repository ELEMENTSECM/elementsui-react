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
		id: "richText",
		config: {},
		scriptUrl: "https://cdn.ckeditor.com/4.7.3/standard/ckeditor.js",
		throttle: 500
	};

	static editorInstances = {};

	componentDidUpdate() {
		if (
			RichText.editorInstances[this.props.id] &&
			RichText.editorInstances[this.props.id].getData().trim() !== this.props.value
		) {
			RichText.editorInstances[this.props.id].setData(this.props.value);
		}
	}

	componentDidMount() {
		this.mounted = true;
		if (!window.CKEDITOR) {
			loadScript(this.props.scriptUrl, this.onLoad);
		} else {
			this.onLoad();
		}
	}

	componentWillUnmount() {
		this.mounted = false;
		if (RichText.editorInstances[this.props.id]) {
			RichText.editorInstances[this.props.id].removeAllListeners();
			RichText.editorInstances[this.props.id].destroy();
		}
	}

	onChange = () => {
		const data = RichText.editorInstances[this.props.id].getData().trim();
		if (data !== this.props.value) {
			this.props.events["change"](data);
		}
	};

	onLoad = () => {
		const { id, config, value, events } = this.props;
		if (!this.mounted) return;

		if (!window.CKEDITOR) {
			console.error("CKEditor not found");
			return;
		}

		RichText.editorInstances[id] = window.CKEDITOR.appendTo(
			ReactDOM.findDOMNode(this),
			extend(defaultConfig, config),
			value
		);

		//Register listener for custom events if any
		for (var event in events) {
			var eventHandler = events[event];
			if (event === "change") {
				RichText.editorInstances[id].on(event, throttle(this.onChange, this.props.throttle));
			} else {
				RichText.editorInstances[id].on(event, eventHandler);
			}
		}

		if (config.applyInitialStyle) {
			RichText.editorInstances[id].on(
				"selectionChange",
				event => {
					const initialStyle = new window.CKEDITOR.style({
						element: "span",
						styles: {
							"font-family": "Calibri, Tahoma, sans-serif",
							"font-size": "11pt"
						}
					});

					if (!RichText.editorInstances[id].getData() && !initialStyle.checkActive(event.data.path)) {
						RichText.editorInstances[id].applyStyle(initialStyle);
					}
				},
				null,
				null,
				100
			);
		}

		RichText.editorInstances[id].on(
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
			RichText.editorInstances[id].on("instanceReady", () => {
				prependContentWithLines();
			});
		}
	};

	prependContentWithLines() {
		const prependText = new Array(this.props.config.prependLines + 1).join("\n");

		RichText.editorInstances[this.props.id].focus();

		const range = RichText.editorInstances[this.props.id].createRange();
		range.moveToElementEditablePosition(range.root, false);
		RichText.editorInstances[this.props.id].insertText(prependText);

		RichText.editorInstances[this.props.id].getSelection().selectRanges([ range ]);
	}

	render() {
		const { id, className } = this.props;
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
