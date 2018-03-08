import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './docs/Docs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import '../node_modules/highlight.js/styles/github-gist.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<Router>
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
