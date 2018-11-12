import * as React from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import extend from "lodash";

const defaultConfig = {
	toolbar: [
		[
			"Font",
			"FontSize",
			"Bold",
			"Italic",
			"Underline",
			"-",
			"NumberedList",
			"BulletedList",
			"-",
			"Outdent",
			"Indent",
			"-",
			"JustifyLeft",
			"JustifyCenter",
			"JustifyRight",
			"JustifyBlock",
			"-",
			"Link",
			"base64image",
			"Maximize",
			"Preview"
		]
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
	removePlugins: "elementspath",
	extraPlugins: "base64image,pastefromword",
	allowedContent: true,
	resize_enabled: false,
	forcePasteAsPlainText: false,
	contentsCss: "../../Content/style.css",
	applyInitialStyle: true,
	bodyClass: "",
	startupFocus: false,
	disableNativeSpellChecker: false
};

class RichText extends React.PureComponent {
	static defaultProps = {
		config: {}
	};

	init = editor => {
		const { config } = this.props;
		this.editor = editor;
		if (config.applyInitialStyle) {
			this.editor.on(
				"selectionChange",
				event => {
					const initialStyle = new CKEDITOR.style({
						element: "span",
						styles: {
							"font-family": "Calibri, Tahoma, sans-serif",
							"font-size": "11pt"
						}
					});

					if (!editor.getData() && !initialStyle.checkActive(event.data.path)) {
						editor.applyStyle(initialStyle);
					}
				},
				null,
				null,
				100
			);
			this.editor.on(
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
				this.editor.on("instanceReady", () => {
					prependContentWithLines(editor, settings.prependLines);
				});
			}
		}
	};

	onChange = () => {
		const data = this.editor.getData();
		this.props.onChange && this.props.onChange(data);
	};

	render() {
		const config = extend(defaultConfig, this.props.config);
		return <CKEditor editor={ClassicEditor} config={config} onInit={this.init} onChange={this.onChange} />;
	}
}

RichText.propTypes = {
	config: PropTypes.object,
	onChange: PropTypes.func
};

export default RichText;
