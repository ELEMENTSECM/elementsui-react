import * as React from 'react';
import { Breadcrumb } from 'elementsui-react';

/**Breadcrumb default */
export default class BreadcrumbDefault extends React.Component {
	constructor(props) {
		super(props);
		this.state = { label: 'Default Breadcrumb' };
		this.items = [
			{ text: 'Files', key: 'Files', onClick: this.onBreadcrumbItemClicked },
			{
				text: 'This is page 1',
				key: 'f1',
				onClick: this.onBreadcrumbItemClicked
			},
			{ text: 'This is page 2', key: 'f2', onClick: this.onBreadcrumbItemClicked },
			{ text: 'This is page 3', key: 'f3', onClick: this.onBreadcrumbItemClicked },
			{ text: 'This is page 4', key: 'f4', onClick: this.onBreadcrumbItemClicked },
			{
				text: 'This is folder 5',
				key: 'f5',
				onClick: this.onBreadcrumbItemClicked,
				isCurrentItem: true
			}
		];
	}

	onBreadcrumbItemClicked() {
		console.log('######## ' + this.text);
	}
	render() {
		return <Breadcrumb ariaLabel="Default Breadcrumb" maxDisplayedItems={6} items={this.items} />;
	}
}
