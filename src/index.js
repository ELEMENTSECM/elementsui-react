import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './docs/Docs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import nb from 'react-intl/locale-data/nb';
import nn from 'react-intl/locale-data/nn';
import sv from 'react-intl/locale-data/sv';
initializeIcons(undefined, { disableWarnings: true });
addLocaleData([...en, ...nb, ...nn, ...sv]);
ReactDOM.render(
	<Router basename={process.env.PUBLIC_URL}>
		<div>
			<Docs />
		</div>
	</Router>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}

registerServiceWorker();
