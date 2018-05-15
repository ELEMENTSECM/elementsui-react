import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './docs/Docs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import '../node_modules/highlight.js/styles/github-gist.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import '../public/favicon.ico';
initializeIcons(undefined, { disableWarnings: true });

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
