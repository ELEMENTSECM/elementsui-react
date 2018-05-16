import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './docs/Docs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
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
