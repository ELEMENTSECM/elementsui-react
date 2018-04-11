import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TenantSelector from '../_TenantSelector';
import v1 from 'uuid/v1';
import moment from 'moment';
import Promise from 'promise';

/** You may find Login component's usage example in elements-starter-template */
export default class Login extends Component {
	static defaultProps = {
		labels: {
			login: 'Log in',
			logout: 'Log out',
			selectTenant: 'Select tenant',
			loggedInAs: 'You are logged in as'
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			tenants: null,
			isSpinnerVisible: false
		};
	}

	get tenantConfig() {
		const data = window.localStorage.getItem('elementsConfig') || '{}';
		return JSON.parse(data);
	}

	set tenantConfig(config) {
		window.localStorage.setItem('elementsConfig', JSON.stringify(config));
	}

	componentWillMount() {
		this.setState({
			isSpinnerVisible: true
		});
		if (!this.props.currentAccessToken) {
			this.getConfigServerData();
		}
	}

	render() {
		return (
			<TenantSelector
				isSpinnerVisible={this.state.isSpinnerVisible}
				tenants={this.state.tenants}
				handleLoginClick={this.props.actions.loginAsync}
				handleLogoutClick={this.handleLogoutClick}
				name={this.props.name}
				onChange={this.handleTenantChange}
				isLoggedIn={!!this.props.currentAccessToken}
				labels={this.props.labels}
			/>
		);
	}

	async getConfigServerData() {
		const requestInit = {
			method: 'POST',
			headers: { Authorization: this.props.appConfig.configServerAuth },
			body: this.props.appConfig.configServerReq
		};

		const response = await fetch(
			`${this.props.appConfig.configServerUrl}/api/config/config/path`,
			requestInit
		);
		const json = await response.json();

		const list = [];
		Object.keys(json).map(tenant => {
			const tenantObj = json[tenant];
			if (tenantObj._id != null) {
				list.push(tenantObj);
			}
		});

		this.setState({
			tenants: list,
			isSpinnerVisible: false
		});
	}

	handleLogoutClick = () => {
		this.props.actions.logout();
		JWT.removeCurrentAccessToken();
		if (this.props.currentIdToken) {
			window.location.href = this.createLogoutLink(this.props.currentIdToken);
		}
	};

	handleTenantChange = value => {
		this.tenantConfig = value;
	};

	login() {
		const nonce = v1();
		const promise = this.loginShared(nonce);
		this.popupwindow(this.createOIDCAuthLink(nonce), 'Authentication', 1024, 768);
		return promise;
	}

	backgroundLogin() {
		if (!this.tenantConfig || !this.tenantConfig._id) {
			return Promise.reject('No tenant config');
		}

		const nonce = v1();
		const promise = this.loginShared(nonce);
		const authRequestUrl = this.createOIDCAuthLink(nonce, 'none');
		document.getElementById('background-login').setAttribute('src', authRequestUrl);
		return promise;
	}

	createLogoutLink(token) {
		return `${this.tenantConfig.elements.Authentication_BaseUrl}/${
			this.tenantConfig._id
		}/connect/endsession?id_token_hint=${token}&post_logout_redirect_uri=${encodeURI(
			this.props.appConfig.baseUri
		)}`;
	}

	loginShared(nonce) {
		return new Promise((resolve, reject) => {
			window['authcallback'] = hash => {
				try {
					const authProperties = this.hashToMap(hash);
					const error = authProperties['error'];
					if (error) {
						console.error(error);
					} else {
						const idToken = new JWT(authProperties['id_token']);
						const accessToken = new JWT(authProperties['access_token']);
						const idTokenValidationResult = idToken.validate(
							this.props.appConfig.idpClient,
							nonce
						);
						const accessTokenValidationResult = accessToken.validate();
						if (!idTokenValidationResult.isValid) {
							reject('IdToken validation failed: \r\n' + idTokenValidationResult.errorsString);
						} else if (!accessTokenValidationResult.isValid) {
							reject(
								'AccessToken validation failed: \r\n' +
									accessTokenValidationResult.errorsString
							);
						} else {
							JWT.setCurrentAccessToken(accessToken);
							resolve({
								idToken: idToken.tokenStr,
								accessToken: accessToken.tokenStr,
								name: accessToken.body['name']
							});
						}
					}
				} catch (error) {
					console.error(error);
				}
			};
		});
	}

	popupwindow(url, title, width, height) {
		const y = window.top.outerHeight / 2 + window.top.screenY - height / 2;
		const x = window.top.outerWidth / 2 + window.top.screenX - width / 2;
		const newwindow = window.open(
			url,
			title,
			'width=' + width + ', height=' + height + ', top=' + y + ', left=' + x
		);
		if (newwindow && window.focus) {
			newwindow.focus();
		}
	}

	createOIDCAuthLink(nonce, prompt) {
		const state = JSON.stringify({
			deepLink: '',
			database: this.tenantConfig._id
		});

		return (
			this.tenantConfig.elements.Authentication_BaseUrl +
			'/' +
			this.tenantConfig._id +
			'/connect/authorize?' +
			'client_id=' +
			this.props.appConfig.idpClient +
			'&response_type=' +
			encodeURIComponent('id_token token') +
			'&scope=' +
			encodeURIComponent('openid email') +
			'&state=' +
			btoa(state).replace(/=/g, '') +
			'&nonce=' +
			nonce +
			'&prompt=' +
			prompt +
			'&redirect_uri=' +
			encodeURIComponent(this.props.appConfig.idpRedirectUri)
		);
	}

	static hashToMap(hash) {
		hash = hash.substring(hash.indexOf('#') + 1);
		return this.parseQueryString(hash);
	}

	static parseQueryString(queryString = null) {
		if (queryString == null) {
			queryString = window.location.search.substring(1);
		}

		const params = new Map();

		const queries = queryString.split('&');

		queries.forEach(indexQuery => {
			const indexPair = indexQuery.split('=');

			const queryKey = decodeURIComponent(indexPair[0]);
			const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : '');

			params[queryKey] = queryValue;
		});

		return params;
	}
}

Login.propTypes = {
	/** ConfigServer settings */
	appConfig: PropTypes.shape({
		configServerUrl: PropTypes.string.isRequired,
		configServerAuth: PropTypes.string.isRequired,
		configServerReq: PropTypes.string.isRequired,
		idpClient: PropTypes.string.isRequired,
		baseUri: PropTypes.string.isRequired,
		idpRedirectUri: PropTypes.string.isRequired,
		extSystemName: PropTypes.string.isRequired
	}).isRequired,
	/** Current ID token */
	currentIdToken: PropTypes.string,
	/** Current access token */
	currentAccessToken: PropTypes.string,
	/** Logged in person's name */
	name: PropTypes.string,
	/** Redux actions */
	actions: PropTypes.object,
	/** Labels */
	labels: PropTypes.shape({
		/** Log in button label */
		login: PropTypes.string,
		/** Log out button label */
		logout: PropTypes.string,
		/** Select tenant label */
		selectTenant: PropTypes.string,
		/** Logged in label */
		loggedInAs: PropTypes.string
	})
};

class JWT {
	now = () => moment();
	tokenStr;
	header;
	body;
	sign;
	expirationDateTime;

	constructor(tokenStr) {
		this.tokenStr = tokenStr;
		if (tokenStr === 'nulltoken') {
			return;
		}

		if (!this.tokenStr) {
			throw new Error('Token was empty');
		}
		const parts = this.tokenStr.split('.');
		if (parts && parts.length !== 3) {
			throw new Error('Token did not consist of 3 parts, but consisted of ' + parts.length + ' parts');
		}

		this.header = JSON.parse(atob(parts[0]));
		this.body = JSON.parse(this.b64DecodeUnicode(parts[1]));
		this.sign = parts[2];
		this.expirationDateTime = new Date(this.body.exp * 1000); // shortening the expiration to give a slight buffer margin.
	}

	b64DecodeUnicode(str) {
		return decodeURIComponent(
			Array.prototype.map
				.call(atob(str), function(c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
	}

	validate(clientId = null, nonce = null) {
		const errors = [];

		if (this.header.typ !== 'JWT') {
			errors.push(`Token header 'typ' was '${this.header.typ}' but expected 'JWT'`);
		}

		if (nonce && this.body.nonce !== nonce) {
			errors.push(`Token body 'nonce' was '${this.body.nonce}' but expected '" + nonce`);
		}

		if (clientId && this.body.aud !== clientId) {
			errors.push(`Token body 'aud' was '${this.body.aud}' but expected '${clientId}'`);
		}

		if (this.isExpired) {
			errors.push('Token expired');
		}

		return {
			errors,
			errorsString: errors.join('\r\n'),
			isValid: errors.length < 1 /*!_.some(errors)*/
		};
	}

	get isValid() {
		return !this.isExpired;
	}

	get isExpired() {
		return new Date() > this.expirationDateTime;
	}

	static currentAccessToken;

	static getCurrentAccessToken() {
		if (JWT.currentAccessToken == null) {
			const data = window.localStorage.getItem('elementsAccessToken');
			if (data != null) {
				JWT.currentAccessToken = new JWT(data);
			}
		}
		return JWT.currentAccessToken;
	}

	static setCurrentAccessToken(token) {
		JWT.currentAccessToken = token;
		window.localStorage.setItem('elementsAccessToken', token.tokenStr);
	}

	static removeCurrentAccessToken() {
		JWT.currentAccessToken = null;
		window.localStorage.removeItem('elementsAccessToken');
	}
}
