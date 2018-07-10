const path = require('path');
const generator = require('react-to-typescript-definitions');
const chokidar = require('chokidar');
const utils = require('../bin/utils');
const exec = require('child_process').exec;
const chalk = require('chalk');

const components = path.join(__dirname, '../src', 'components');

const enableWatchMode = process.argv.slice(2) === '--watch';

let moduleExports = [];

if (enableWatchMode) {
	chokidar.watch([components]).on('change', function(event, path) {
		generateTypings(components);
		addInitializeIcons();
	});
} else {
	generateTypings(components);
	addInitializeIcons();
}

function generateTypings(folder) {
	return utils
		.getDirectories(folder)
		.filter(x => !x.startsWith('_'))
		.map(x => {
			const children = generateTypings(path.join(folder, x));

			if (!children || children.length === 0) {
				const filePath = path.join(folder, x, x + '.js');
				exec(`react2dts --file ${filePath} --module-name ${x}`, (error, stdout, stderr) => {
					if (error !== null) {
						console.log(chalk.red(`exec error: ${error}`));
					}

					let res = `import * as React from 'react';

${stdout
						.replace(/.*declare module '\w+'\s*{\s*import \* as React from 'react';\s*/, '')
						.replace(/.*export default \w+;/, '')
						.replace('export const', 'declare const')
						.slice(0, -6)}`;
					if (res.indexOf('declare const') !== -1) {
						res += `export default ${x};`;
					}
					const relPath = folder.substring(folder.indexOf('components') + 11, folder.length);

					utils.writeFile(path.join(folder, x, 'index.d.ts'), res);
					moduleExports.push(`export { default as ${x}, ${x}Props } from './${relPath}/${x}';
`);
					utils.writeFile(path.join(components, 'index.d.ts'), moduleExports.sort().join(''));
				});
			}
		});
}

function addInitializeIcons() {
	moduleExports.push(`export { initializeIcons } from "office-ui-fabric-react/lib/Icons";`);
	moduleExports.push(`export { addLocaleData } from 'react-intl';`);
	moduleExports.push(`export { default as en } from 'react-intl/locale-data/en';`);
	moduleExports.push(`export { default as nb } from 'react-intl/locale-data/nb';`);
	moduleExports.push(`export { default as nn } from 'react-intl/locale-data/nn';`);
	moduleExports.push(`export { default as sv } from 'react-intl/locale-data/sv';`);
	moduleExports.push(
		`export { Alert as BSAlert, Badge as BSBadge, Breadcrumb as BSBreadcrumb, Button as BSButton, ButtonGroup as BSButtonGroup, ButtonToolbar as BSButtonToolbar, DropdownButton as BSDropdownButton, ToggleButtonGroup as BSToggleButtonGroup, Carousel as BSCarousel, SplitButton as BSSplitButton, MenuItem as BSMenuItem, Clearfix as BSClearfix, FormGroup as BSFormGroup, ControlLabel as BSControlLabel, FormControl as BSFormControl, HelpBlock as BSHelpBlock, Glyphicon as BSGlyphicon, Image as BSImage, Thumbnail as BSThumbnail, Jumbotron as BSJumbotron, Label as BSLabel, ListGroup as BSListGroup, ListGroupItem as BSListGroupItem, Modal as BSModal, Nav as BSNav, NavItem as BSNavItem, NavDropdown as BSNavDropdown, Navbar as BSNavbar, Overlay as BSOverlay, Tooltip as BSTooltip, PageHeader as BSPageHeader, Pager as BSPager, Panel as BSPanel, Popover as BSPopover, ProgressBar as BSProgressBar, Table as BSTable, Tabs as BSTabs, Tab as BSTab, OverlayTrigger as BSOverlayTrigger, Well as BSWell, Grid as BSGrid, Row as BSRow, Col as BSCol, Media as BSMedia, InputGroup as BSInputGroup, InputGroupAddon as BSInputGroupAddon } from 'react-bootstrap';`
	);
	utils.writeFile(path.join(components, 'index.d.ts'), moduleExports.join(''));
}
