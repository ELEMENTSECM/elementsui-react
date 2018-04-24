import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { loadTheme, AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import PropTypes from 'prop-types';

function withTheme(WrappedComponent, palette) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			loadTheme({
				palette
			});
		}

		render() {
			return (
				<Fabric>
					<WrappedComponent {...this.props} />
				</Fabric>
			);
		}
	};
}

withTheme.propTypes = {
	/**
	 * Color code for themeDarker.
	 */
	themeDarker: PropTypes.string,
	/**
	 * Color code for themeDark.
	 */
	themeDark: PropTypes.string,
	/**
	 * Color code for themeDarkAlt.
	 */
	themeDarkAlt: PropTypes.string,
	/**
	 * Color code for themePrimary.
	 */
	themePrimary: PropTypes.string,
	/**
	 * Color code for themeSecondary.
	 */
	themeSecondary: PropTypes.string,
	/**
	 * Color code for themeTertiary.
	 */
	themeTertiary: PropTypes.string,
	/**
	 * Color code for themeLight.
	 */
	themeLight: PropTypes.string,
	/**
	 * Color code for themeLighter.
	 */
	themeLighter: PropTypes.string,
	/**
	 * Color code for themeLighterAlt.
	 */
	themeLighterAlt: PropTypes.string,
	/**
	 * Color code for the strongest color, which is black in the default theme. This is a very light color in inverted themes.
	 */
	black: PropTypes.string,
	/**
	 * Color code for blackTranslucent40.
	 */
	blackTranslucent40: PropTypes.string,
	/**
	 * Color code for neutralDark.
	 */
	neutralDark: PropTypes.string,
	/**
	 * Color code for neutralPrimary.
	 */
	neutralPrimary: PropTypes.string,
	/**
	 * Color code for neutralPrimaryAlt.
	 */
	neutralPrimaryAlt: PropTypes.string,
	/**
	 * Color code for neutralSecondary.
	 */
	neutralSecondary: PropTypes.string,
	/**
	 * Color code for neutralTertiary.
	 */
	neutralTertiary: PropTypes.string,
	/**
	 * Color code for neutralTertiaryAlt.
	 */
	neutralTertiaryAlt: PropTypes.string,
	/**
	 * Color code for neutralQuaternary.
	 */
	neutralQuaternary: PropTypes.string,
	/**
	 * Color code for neutralQuaternaryAlt.
	 */
	neutralQuaternaryAlt: PropTypes.string,
	/**
	 * Color code for neutralLight.
	 */
	neutralLight: PropTypes.string,
	/**
	 * Color code for neutralLighter.
	 */
	neutralLighter: PropTypes.string,
	/**
	 * Color code for neutralLighterAlt.
	 */
	neutralLighterAlt: PropTypes.string,
	/**
	 * Color code for the accent.
	 */
	accent: PropTypes.string,
	/**
	 * Color code for the softest color, which is white in the default theme. This is a very dark color in dark themes.
	 * This is the page background.
	 */
	white: PropTypes.string,
	/**
	 * Color code for whiteTranslucent40
	 */
	whiteTranslucent40: PropTypes.string,
	/**
	 * Color code for yellow.
	 */
	yellow: PropTypes.string,
	/**
	 * Color code for yellowLight.
	 */
	yellowLight: PropTypes.string,
	/**
	 * Color code for orange.
	 */
	orange: PropTypes.string,
	/**
	 * Color code for orangeLight.
	 */
	orangeLight: PropTypes.string,
	/**
	 * Color code for orangeLighter.
	 */
	orangeLighter: PropTypes.string,
	/**
	 * Color code for redDark.
	 */
	redDark: PropTypes.string,
	/**
	 * Color code for red.
	 */
	red: PropTypes.string,
	/**
	 * Color code for magentaDark.
	 */
	magentaDark: PropTypes.string,
	/**
	 * Color code for magenta.
	 */
	magenta: PropTypes.string,
	/**
	 * Color code for magentaLight.
	 */
	magentaLight: PropTypes.string,
	/**
	 * Color code for purpleDark.
	 */
	purpleDark: PropTypes.string,
	/**
	 * Color code for purple.
	 */
	purple: PropTypes.string,
	/**
	 * Color code for purpleLight.
	 */
	purpleLight: PropTypes.string,
	/**
	 * Color code for blueDark.
	 */
	blueDark: PropTypes.string,
	/**
	 * Color code for blueMid.
	 */
	blueMid: PropTypes.string,
	/**
	 * Color code for blue.
	 */
	blue: PropTypes.string,
	/**
	 * Color code for blueLight.
	 */
	blueLight: PropTypes.string,
	/**
	 * Color code for tealDark.
	 */
	tealDark: PropTypes.string,
	/**
	 * Color code for teal.
	 */
	teal: PropTypes.string,
	/**
	 * Color code for tealLight.
	 */
	tealLight: PropTypes.string,
	/**
	 * Color code for greenDark.
	 */
	greenDark: PropTypes.string,
	/**
	 * Color code for green.
	 */
	green: PropTypes.string,
	/**
	 * Color code for greenLight.
	 */
	greenLight: PropTypes.string
};

export default withTheme;
