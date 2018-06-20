import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TenantSelector from '../_TenantSelector';
import { v1 } from 'uuid';
import moment from 'moment';
import Promise from 'promise';
import Button from '../../Inputs/Button';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import Spinner from '../../Indicators/Spinner';
import Box from '../../Surfaces/Box';
import { styles } from './Login.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import oData from 'odatajs/lib/odata';
import BackgroundLoginFrame from '../_BackgroundLoginFrame';
import ModulePicker from '../../Pickers/ModulePicker';
import LoginError from '../_LoginError';
import { IntlProvider, FormattedMessage } from 'react-intl';
import json from './Login.nls.json';

/** You may find Login component's usage example in elements-starter-template */
class LoginComponent extends Component {
	static stage = {
		background: 'background',
		tenant: 'tenant',
		module: 'module'
	};

	static errorType = {
		background: 'backgroundLoginFailed',
		noModules: 'noModule',
		noLicense: 'noModuleLicense',
		loginPopupBlocked: 'loginPopupBlocked'
	};
	constructor(props) {
		super(props);

		this.state = {
			isSpinnerVisible: false,
			tenantId: null,
			moduleId: null,
			authenticationConfig: null,
			ncoreConfig: null,
			backgroundLoginSource: '',
			stage: Login.stage.tenant,
			isManualLogin: false,
			error: null,
			userInfo: null,
			licenses: [],
			modules: [],
			licensedModules: true,
			tokens: null,
			locale: this.props.locale
		};

		this.classNames = classNamesFunction()(styles, props);
	}

	get defaultAuthenticationProvider() {
		return Login.storeProvider !== null
			? Login.storeProvider
			: (this.state.authenticationConfig && this.state.authenticationConfig.defaultProvider) || '';
	}

	get loginCallbackName() {
		return this.state.authenticationConfig
			? this.state.authenticationConfig.loginCallbackName
			: window['elements'].constants.loginCallbackName;
	}

	refresh(tenantId) {
		this.setState(ps => ({ ...ps, authenticationConfig: null }));
		if (!tenantId) {
			return;
		}
		const requestInit = {
			method: 'GET',
			headers: { Accept: 'application/json, */*' }
		};
		const self = this;
		return fetch(`${this.props.paths.applicationPath}/${tenantId}/GetStartupConfig`, requestInit)
			.then(response => response.json())
			.then(config =>
				self.setState(ps => ({
					...ps,
					authenticationConfig: config.authConfig,
					ncoreConfig: config.ncoreConfig,
					isSpinnerVisible: false
				}))
			);
	}

	loginShared(nonce) {
		const self = this;
		return new Promise((resolve, reject) => {
			window[self.loginCallbackName] = hash => {
				try {
					const authProperties = Login.hashToMap(hash);
					const error = authProperties['error'];
					const { tokenRefreshBufferSeconds, clientId } = self.state.authenticationConfig;
					if (error) {
						reject(error);
					} else {
						const idToken = new JWT(authProperties['id_token'], tokenRefreshBufferSeconds);
						const accessToken = new JWT(
							authProperties['access_token'],
							tokenRefreshBufferSeconds
						);
						const idTokenValidationResult = idToken.validate(clientId, nonce);
						const accessTokenValidationResult = accessToken.validate();
						if (!idTokenValidationResult.isValid) {
							reject('IdToken validation failed: \r\n' + idTokenValidationResult.errorsString);
						} else if (!accessTokenValidationResult.isValid) {
							reject(
								'AccessToken validation failed: \r\n' +
									accessTokenValidationResult.errorsString
							);
						} else {
							resolve({
								authenticationProvider: self.defaultAuthenticationProvider,
								accessToken: accessToken,
								idToken: idToken
							});
						}
					}
				} catch (error) {
					reject(error);
				}
			};
		});
	}

	tryBackgroundLogin() {
		return this.backgroundLogin(this.state.tenantId, this.defaultAuthenticationProvider).catch(error => {
			if (this.state.stage === Login.stage.background) {
				// 'login_required' and 'interaction_required' are known error codes that just indicate that the user need to perform a login.
				// This is not considered an error condition, but part of normal flow.
				const isBackgroundError = error === 'login_required' || error === 'interaction_required';

				this.setState(ps => ({
					...ps,
					stage: Login.stage.tenant,
					isManualLogin: true,
					error: isBackgroundError
						? null
						: {
								type: Login.errorType.background,
								text: error
						  }
				}));
			}
		});
	}

	backgroundLogin(tenantId, authenticationProvider) {
		const nonce = v1();
		const backgroundLoginSource = this.createOIDCAuthLink(
			tenantId,
			nonce,
			'none',
			authenticationProvider
		);
		this.setState(ps => ({ ...ps, backgroundLoginSource }));
		const promise = this.loginShared(nonce);
		const ms = this.state.authenticationConfig.backgroundLoginTimeoutSeconds;

		const timeout = new Promise((resolve, reject) => {
			let id = setTimeout(() => {
				clearTimeout(id);
				reject(
					`Background login timed out. Ensure that the Identity Token Provider (IdP) is correctly configured in the IdP.`
				);
			}, ms * 1000);
		});

		return Promise.race([promise, timeout]);
	}

	refreshAuthConfig() {
		this.setState({ error: null });
		if (this.state.tenantId) {
			this.setState(ps => ({ ...ps, isSpinnerVisible: true }));
			this.refresh(this.state.tenantId);
		}
	}

	createOIDCAuthLink(database, nonce, prompt = '', authenticationProvider = '') {
		const { templatedBaseUrl, clientId, authenticationCallback } = this.state.authenticationConfig;
		const state = JSON.stringify({
			deepLink: '',
			database: database
		});
		return `${templatedBaseUrl.replace('{database}', database)}/authorize?client_id=${encodeURIComponent(
			clientId
		)}&redirect_uri=${encodeURIComponent(
			'http://localhost:3000/AuthCallback'
		)}&response_type=${encodeURIComponent('id_token token')}&scope=${encodeURIComponent(
			'openid email'
		)}&state=${btoa(state).replace(
			/=/g,
			''
		)}&nonce=${nonce}&prompt=${prompt}&acr_values=idp:${authenticationProvider}`;
	}

	getModuleLicenses(accessTokenStr) {
		const self = this;
		return this.odataRequest('Licenses', this.state.tenantId, accessTokenStr)
			.then(licenses => {
				const modules = self.props.modules.filter(
					m => licenses.filter(license => license.ModuleName === m.LicenseName).length > 0
				);

				if (modules.filter(m => m && m.Id === self.props.moduleId).length > 0) {
					self.setState(ps => ({ ...ps, moduleId: self.props.moduleId }), () => self.enterModule());
					return;
				}

				const licensedModules = modules.length > 0;

				self.setState(ps => ({
					...ps,
					licenses,
					modules,
					licensedModules,
					error: !licensedModules
						? {
								type: Login.errorType.noModules
						  }
						: null,
					stage: Login.stage.module
				}));
			})
			.done();
	}

	getUserInfo(accessTokenStr) {
		return this.odataRequest('Context', this.state.tenantId, accessTokenStr, 'CurrentUserInfo')
			.then(userInfo => this.setState(ps => ({ ...ps, userInfo })))
			.done();
	}

	odataRequest(uri, tenantId, accessTokenStr, expand, method) {
		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json;odata.metadata=full',
			Authorization: `Bearer ${accessTokenStr}`
		};

		const host = btoa(window.location.hostname);
		let absoluteUrl = `${this.state.ncoreConfig.odata.endpoint}/${uri}?`;
		if (expand) {
			absoluteUrl += `$expand=${expand}&`;
		}
		const auth = [
			'host=' + host,
			'database=' + encodeURIComponent(tenantId),
			'externalSystemName=Elements',
			'token=' + accessTokenStr
		];
		absoluteUrl += auth.join('&');

		return new Promise(resolve => {
			oData.request(
				{
					requestUri: absoluteUrl,
					method: method || 'GET',
					headers: headers
				},
				responseData => {
					resolve(expand ? responseData[expand] : responseData.value);
				}
			);
		});
	}

	storeTenantId() {
		localStorage.setItem('tenantId', this.state.tenantId);
	}

	enterModule() {
		if (!this.state.moduleId) {
			return;
		}

		window.location.href = `${this.props.paths.applicationPath}/${this.state.moduleId}/${
			this.state.tenantId
		}`;
	}

	popupwindow(url, title, width, height) {
		const y = window.top.outerHeight / 2 + window.top.screenY - height / 2;
		const x = window.top.outerWidth / 2 + window.top.screenX - width / 2;
		const newwindow = window.open(
			url,
			title,
			'width=' + width + ', height=' + height + ', top=' + y + ', left=' + x
		);

		if (!newwindow) {
			this.setState(ps => ({
				...ps,
				isSpinnerVisible: false,
				error: { type: Login.errorType.loginPopupBlocked }
			}));
			return;
		}

		if (window.focus) {
			newwindow.focus();
		}

		const that = this;
		let pollTimer = window.setInterval(() => {
			if (newwindow.closed) {
				window.clearInterval(pollTimer);
				that.setState(ps => ({ ...ps, isSpinnerVisible: false }));
			}
		}, 200);
	}

	back() {
		this.setState((ps, currentProps) => ({
			...ps,
			stage: Login.stage.tenant,
			moduleId: currentProps.moduleId
		}));
	}

	openLoginPopup(authenticationProvider = '') {
		this.setState(
			ps => ({ ...ps, isSpinnerVisible: true, error: null }),
			() => {
				Login.storeProvider = authenticationProvider;
				const nonce = v1();
				const databaseName = this.state.tenantId;
				const promise = this.loginShared(nonce);
				this.popupwindow(
					this.createOIDCAuthLink(databaseName, nonce, '', authenticationProvider),
					'Authentication',
					1024,
					768
				);
				promise.then(x => this.onLoginSucceed(x, authenticationProvider)).done();
			}
		);
	}

	onLoginSucceed(loginResult, authenticationProvider) {
		this.setState(ps => ({
			...ps,
			tokens: {
				accessToken: loginResult.accessToken,
				idToken: loginResult.idToken,
				authenticationProvider: authenticationProvider
			}
		}));

		this.storeTenantId();
		this.getUserInfo(loginResult.accessToken.tokenStr);
		this.getModuleLicenses(loginResult.accessToken.tokenStr);
	}

	clickPopupLoginWithDefaultProvider = () => {
		this.props.actions && this.props.actions.login && this.props.actions.login();
		this.openLoginPopup(this.defaultAuthenticationProvider);
	};

	clickPopupLogin = () => {
		this.props.actions && this.props.actions.login && this.props.actions.login();
		this.isManualLogin = true;
		this.openLoginPopup();
	};

	logout = () => {
		Login.storeProvider = null;

		const logoutEndpoint = `${this.state.authenticationConfig.templatedBaseUrl.replace(
			'{database}',
			this.state.tenantId
		)}/endsession?id_token_hint=${
			this.state.tokens.accessToken.tokenStr
		}&post_logout_redirect_uri=${encodeURI(this.props.paths.baseUrl)}`;

		window.location.href = logoutEndpoint;
	};

	componentDidMount() {
		this.initialize();
	}

	initialize() {
		const self = this;
		const tenantId = localStorage.getItem('tenantId');
		if (tenantId) {
			if (this.props.resetTenant) {
				localStorage.removeItem('tenantId');
			} else {
				this.setState(
					ps => ({
						...ps,
						tenantId,
						stage: Login.stage.background,
						isSpinnerVisible: true
					}),
					() => {
						self.refresh(self.state.tenantId).then(() => {
							self.tryBackgroundLogin().then(x => {
								if (!self.state.isManualLogin) {
									self.getUserInfo(x.accessToken.tokenStr);
									self.getModuleLicenses(x.accessToken.tokenStr);
									this.setState(ps => ({
										...ps,
										tokens: {
											accessToken: x.accessToken,
											idToken: x.idToken
										},
										error: null
									}));
								}

								this.setState(ps => ({
									...ps,
									isSpinnerVisible: false
								}));
							});
						});
					}
				);
			}
		}
	}

	goBack = () => {
		this.setState(ps => ({ ...ps, stage: Login.stage.tenant, error: null }));
	};

	onLanguageChange = newLangCode => {
		this.setState(ps => ({ ...ps, locale: newLangCode }));
	};

	render() {
		const {
			root,
			content,
			main,
			header,
			frame,
			loginButton,
			loginLabel,
			buttonContainer,
			spinner,
			wrapper
		} = this.classNames;
		return (
			<IntlProvider locale={this.state.locale} messages={json[this.state.locale]}>
				<div className={wrapper}>
					<div className={root}>
						<div className={content}>
							<Box className={header}>
								<TenantSelector
									selectedTenant={this.state.tenantId}
									tenants={this.props.tenants}
									currentUserName={this.state.userInfo && this.state.userInfo.Name}
									onChange={t => this.handleTenantChange(t)}
									isLoggedIn={this.state.stage === Login.stage.module}
									goBack={() => this.goBack()}
									logout={() => this.logout()}
									defaultLanguage={this.props.locale}
									onLanguageChange={code => this.onLanguageChange(code)}
								/>
							</Box>
							<Box className={main}>
								<div>
									{!this.state.isSpinnerVisible ? (
										this.state.stage === Login.stage.tenant ||
										this.state.stage === Login.stage.background ? (
											<div className={buttonContainer}>
												<Button
													className={loginButton}
													disabled={!this.state.tenantId}
													onClick={() => this.clickPopupLoginWithDefaultProvider()}>
													<FormattedMessage id="login" />
												</Button>
												<ActionButton
													className={loginLabel}
													disabled={!this.state.tenantId}
													onClick={() => this.clickPopupLogin()}>
													<FormattedMessage id="loginDifferentUser" />
												</ActionButton>
											</div>
										) : (
											<ModulePicker
												modules={this.state.modules}
												tenantId={this.state.tenantId}
												applicationPath={this.props.paths.applicationPath}
											/>
										)
									) : (
										<Spinner className={spinner} />
									)}
								</div>
							</Box>
						</div>
						<BackgroundLoginFrame source={this.state.backgroundLoginSource} className={frame} />
						{this.state.error ? (
							<LoginError type={this.state.error.type}>{this.state.error.text}</LoginError>
						) : (
							''
						)}
					</div>
				</div>
			</IntlProvider>
		);
	}

	handleTenantChange = value => {
		this.setState(ps => ({ ...ps, tenantId: value }), this.refreshAuthConfig);
	};

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

	static set storeProvider(provider) {
		localStorage.setItem('provider', provider);
	}

	static get storeProvider() {
		return localStorage.getItem('provider');
	}
}

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
			isValid: errors.length < 1
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

export const Login = LoginComponent;

Login.propTypes = {
	/** Locale (en, nb, etc.) */
	locale: PropTypes.string,
	/** List of available modules */
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.string,
			LicenseName: PropTypes.string,
			Name: PropTypes.string,
			TenantRequired: PropTypes.bool,
			VisibleInSelector: PropTypes.bool
		})
	),
	/** List of available tenants */
	tenants: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.string,
			Description: PropTypes.string
		})
	),
	/** Elements module Id */
	moduleId: PropTypes.string,
	/** If tenant needs to be reset */
	resetTenant: PropTypes.bool,
	/** Application base paths */
	paths: PropTypes.shape({
		/** Elements application path */
		applicationPath: PropTypes.string.isRequired,
		/**ncore base url */
		baseUrl: PropTypes.string.isRequired
	}).isRequired,
	/** Redux actions */
	actions: PropTypes.object,
	/** User-defined styling */
	styles: PropTypes.func
};

LoginComponent.propTypes = {
	/** Locale (en, nb, etc.) */
	locale: PropTypes.string,
	/** List of available modules */
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.string,
			LicenseName: PropTypes.string,
			Name: PropTypes.string,
			TenantRequired: PropTypes.bool,
			VisibleInSelector: PropTypes.bool
		})
	),
	/** List of available tenants */
	tenants: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.string,
			Description: PropTypes.string
		})
	),
	/** Elements module Id */
	moduleId: PropTypes.string,
	/** If tenant needs to be reset */
	resetTenant: PropTypes.bool,
	/** Application base paths */
	paths: PropTypes.shape({
		/** Elements application path */
		applicationPath: PropTypes.string.isRequired,
		/**ncore base url */
		baseUrl: PropTypes.string.isRequired
	}).isRequired,
	/** Redux actions */
	actions: PropTypes.object,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('Login', ['theme'])(Login), styles);
