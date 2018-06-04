import * as React from 'react';

export interface LoginModules {
	Id?: string;
	LicenseName?: string;
	Name?: string;
	TenantRequired?: boolean;
	VisibleInSelector?: boolean;
}

export interface LoginTenants {
	Id?: string;
	Description?: string;
}

export interface LoginPaths {
	applicationPath: string;
	baseUrl: string;
}

export interface LoginProps {
	/**
	 * Locale (en, nb, etc.)
	 */
	locale?: string;
	/**
	 * List of available modules
	 */
	modules?: LoginModules[];
	/**
	 * List of available tenants
	 */
	tenants?: LoginTenants[];
	/**
	 * Elements module Id
	 */
	moduleId?: string;
	/**
	 * If tenant needs to be reset
	 */
	resetTenant?: boolean;
	/**
	 * Application base paths
	 */
	paths: LoginPaths;
	/**
	 * Redux actions
	 */
	actions?: Object;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const Login: React.SFC<LoginProps>;

export default Login;
