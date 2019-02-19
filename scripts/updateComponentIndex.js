const path = require("path");
const utils = require("../bin/utils");

const components = path.join(__dirname, "../src", "components");
const indexPath = path.join(components, "index.js");
const exportStrings = [];
getExportStrings(components);
exportStrings.push(`export { addLocaleData } from 'react-intl';`);
exportStrings.push(`export { default as en } from 'react-intl/locale-data/en';`);
exportStrings.push(`export { default as nb } from 'react-intl/locale-data/nb';`);
exportStrings.push(`export { default as nn } from 'react-intl/locale-data/nn';`);
exportStrings.push(`export { default as sv } from 'react-intl/locale-data/sv';`);

utils.writeFile(indexPath, exportStrings.join("\r"));

function getExportStrings(filePath, relativePath = ".") {
	return utils.getDirectories(filePath).filter(x => !x.startsWith("_")).map(x => {
		const children = getExportStrings(path.join(filePath, x), path.join(relativePath, x));

		if (!children || children.length === 0) {
			exportStrings.push(`export { default as ${x} } from './${utils.join(relativePath, x)}';`);
		}
	});
}
