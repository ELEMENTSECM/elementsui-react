const path = require("path");
const utils = require("../bin/utils");

const components = path.join(__dirname, "../src", "components");
const indexPath = path.join(components, "index.js");
const exportStrings = [];
getExportStrings(components);
exportStrings.push(`export { initializeIcons } from 'office-ui-fabric-react/lib/Icons';`);
exportStrings.push(`export { addLocaleData } from 'react-intl';`);
exportStrings.push(`export { default as en } from 'react-intl/locale-data/en';`);
exportStrings.push(`export { default as nb } from 'react-intl/locale-data/nb';`);
exportStrings.push(`export { default as nn } from 'react-intl/locale-data/nn';`);
exportStrings.push(`export { default as sv } from 'react-intl/locale-data/sv';`);
exportStrings.push(
	`export { Alert as BSAlert, Badge as BSBadge, Breadcrumb as BSBreadcrumb, Button as BSButton, ButtonGroup as BSButtonGroup, ButtonToolbar as BSButtonToolbar, DropdownButton as BSDropdownButton, ToggleButtonGroup as BSToggleButtonGroup, Carousel as BSCarousel, SplitButton as BSSplitButton, MenuItem as BSMenuItem, Clearfix as BSClearfix, FormGroup as BSFormGroup, ControlLabel as BSControlLabel, FormControl as BSFormControl, HelpBlock as BSHelpBlock, Glyphicon as BSGlyphicon, Image as BSImage, Thumbnail as BSThumbnail, Jumbotron as BSJumbotron, Label as BSLabel, ListGroup as BSListGroup, ListGroupItem as BSListGroupItem, Modal as BSModal, Nav as BSNav, NavItem as BSNavItem, NavDropdown as BSNavDropdown, Navbar as BSNavbar, Overlay as BSOverlay, Tooltip as BSTooltip, PageHeader as BSPageHeader, Pager as BSPager, Panel as BSPanel, Popover as BSPopover, ProgressBar as BSProgressBar, Table as BSTable, Tabs as BSTabs, Tab as BSTab, OverlayTrigger as BSOverlayTrigger, Well as BSWell, Grid as BSGrid, Row as BSRow, Col as BSCol, Media as BSMedia, InputGroup as BSInputGroup, InputGroupAddon as BSInputGroupAddon, Checkbox as BSCheckbox, Dropdown as BSDropdown } from 'react-bootstrap';`
);
utils.writeFile(indexPath, exportStrings.join("\r"));

function getExportStrings(filePath, relativePath = ".") {
	return utils.getDirectories(filePath).filter((x) => !x.startsWith("_")).map((x) => {
		const children = getExportStrings(path.join(filePath, x), path.join(relativePath, x));

		if (!children || children.length === 0) {
			exportStrings.push(`export { default as ${x} } from './${utils.join(relativePath, x)}';`);
		}
	});
}
