import React from 'react';

const config = {
	paths: {
		applicationPath: '',
		absoluteUrl: 'http://127.0.0.1:5000/AuthenticationCallback',
		baseUrl: 'http://127.0.0.1:5000',
		devAppRoot: 'http://127.0.0.1:5000/App',
		releaseAppRoot: 'http://127.0.0.1:5000/App_Build',
		appRoot: 'http://127.0.0.1:5000/App'
	},
	loginCallbackName: 'loginCallback',
	defaultLocale: 'en-US',
	version: '1.7.0.0',
	versionShort: '1.7.0',
	versionInformational: '1.7.0-vNext',
	build: '',
	debugMode: true,
	modules: {
		recordmanagement: {
			Id: 'rm',
			Name: 'Record Management',
			LicenseName: 'CaseManagement',
			VisibleInSelector: true,
			TenantRequired: true
		},
		meetingmodule: {
			Id: 'mm',
			Name: 'Meeting Module',
			LicenseName: 'MeetingManagement',
			VisibleInSelector: true,
			TenantRequired: true
		},
		systemAdministration: {
			Id: 'sa',
			Name: 'System administration',
			LicenseName: 'SystemAdministration',
			VisibleInSelector: true,
			TenantRequired: true
		},
		ebuildingcase: {
			Id: 'eb',
			Name: 'eBuildingCase',
			LicenseName: 'eConstructionmanagement',
			VisibleInSelector: true,
			TenantRequired: true
		},
		All: [
			{
				Id: 'rm',
				Name: 'Record Management',
				LicenseName: 'CaseManagement',
				VisibleInSelector: true,
				TenantRequired: true
			},
			{
				Id: 'mm',
				Name: 'Meeting Module',
				LicenseName: 'MeetingManagement',
				VisibleInSelector: true,
				TenantRequired: true
			},
			{
				Id: 'sa',
				Name: 'System administration',
				LicenseName: 'SystemAdministration',
				VisibleInSelector: true,
				TenantRequired: true
			},
			{
				Id: 'eb',
				Name: 'eBuildingCase',
				LicenseName: 'eConstructionmanagement',
				VisibleInSelector: true,
				TenantRequired: true
			}
		]
	}
};
const callbackFunctionName = config.loginCallbackName;

const AuthCallback = () => {
	if (window.opener && window.opener[callbackFunctionName]) {
		// window.opener is typically present on redirect after manual login
		window.opener[callbackFunctionName](window.location.hash);
		window.close();
	} else if (window.parent && window.parent[callbackFunctionName]) {
		// window.parent is typically present on redirect inside hidden iframe after background (automatic) login
		window.parent[callbackFunctionName](window.location.hash);
	} else {
		return (
			<React.Fragment>
				<h1>Ephorte Elements login reverse redirect failed</h1>
				<p>
					Ensure that the Identity Token Provider (IDP) and Ephorte Element are in the same{' '}
					<a href="https://technet.microsoft.com/en-us/library/dd361896.aspx">security zone</a> if
					you are using Internet Explorer.
				</p>
			</React.Fragment>
		);
	}

	return;
};

export default AuthCallback;
