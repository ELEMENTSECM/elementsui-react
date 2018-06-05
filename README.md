[![Build Status](https://travis-ci.org/EVRYAS/elementsui-react.svg?branch=master)](https://travis-ci.org/EVRYAS/elementsui-react)
[![Coverage Status](https://coveralls.io/repos/github/EVRYAS/elementsui-react/badge.svg?branch=master)](https://coveralls.io/github/EVRYAS/elementsui-react?branch=master)

# ElementsUI React Components

A library of React components for the Elements family.

# Docs

[Component documentation](https://evryas.github.io/elementsui-react/)

## Install

```bash
yarn add elementsui-react
```

...or install globally to use CLI functionality:

```bash
yarn global add elementsui-react
```

## Scaffolding with CLI tool

CLI tool gives the possibility to quickly scaffold the common building blocks of your React application (stateful and stateless components, containers, complete stores with all the necessary types, actions and reducers, backend controllers) with basic tests for each item.

If the tool is used for the first time in the current project you will be asked to configure the paths to the application folders. elementsui.config.json file will be created in the project's root.

1.  Install elementsui-react globally.
2.  Type `elementsui-react create` to initiate the scaffolding process.
3.  Choose what do you want to create.
4.  Choose language (ES6 and Typescript are supported).
5.  Type name (lowercase).
6.  A new item(s) will be created in a separate folder according to the location set up in the elementsui.config.json file.

## Custom styling

To apply custom styling to any component you should implement 'styles' function

```javascript
const styles = props => {
	const { className, theme, isPrimary } = props;
	const { palette, semanticColors } = theme;

	return {
		root: [
			{
				background: semanticColors.warningHighlight,
				color: palette.themeDark,
				fontStyle: isPrimary ? 'bold' : 'italic'
			},
			className
		]
	};
};
```

...and pass it as component's property:

```jsx
<Button
	htmlId="defaultBtn"
	label="Default button"
	isPrimary={true}
	className="button-primary"
	styles={styles}
/>
```

### Semantic colors

| Property                         | Description                                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bodyBackground                   | The default color for backgrounds.                                                                                                                          |
| bodyText                         | The default color for text.                                                                                                                                 |
| bodyTextChecked                  | Checked text color, e.g. selected menu item text.                                                                                                           |
| bodySubtext                      | De-emphasized text; e.g. metadata, captions, placeholder text.                                                                                              |
| bodyDivider                      | Divider lines; e.g. lines that separate sections in a menu, an \<HR\> element.                                                                              |
| disabledBackground               | The default color for text.                                                                                                                                 |
| disabledText                     | The default color for disabled text on top of disabledBackground; e.g. text in a disabled text field, disabled button text.                                 |
| disabledBodyText                 | The default color for disabled text on the default background (bodyBackground).                                                                             |
| disabledSubtext                  | Disabled de-emphasized text, for use on disabledBackground.                                                                                                 |
| focusBorder                      | The color of the outline around focused controls that don't already have a border; e.g. menu items.                                                         |
| errorText                        | The default color of error text, used on bodyBackground.                                                                                                    |
| warningText                      | The color of text on errorBackground, warningBackground, blockingBackground, or successBackground.                                                          |
| errorBackground                  | The background for errors, if necessary, or highlighting the section of the page where the error is present.                                                |
| blockingBackground               | Background for blocking issues, which is more severe than a warning, but not as bad as an error.                                                            |
| warningBackground                | Background for warning messages.                                                                                                                            |
| warningHighlight                 | Foreground color for warning highlights.                                                                                                                    |
| successBackground                | Background for success.                                                                                                                                     |
| inputBorder                      | The border of a large input control in its resting, state; e.g. the box of dropdown.                                                                        |
| smallInputBorder                 | The border of a small input control in its resting unchecked state; e.g. the box of an unchecked checkbox.                                                  |
| inputBorderHovered               | The border color of a large hovered input control, such as textbox.                                                                                         |
| inputBackground                  | The background color of an input, e.g. textbox background.                                                                                                  |
| inputBackgroundChecked           | The background of a checked control; e.g. checked radio button's dot, checked toggle's background.                                                          |
| inputBackgroundCheckedHovered    | The background of a checked and hovered control; e.g. checked checkbox's background color on hover.                                                         |
| inputForegroundChecked           | The foreground of a checked control; e.g. checked checkbox's checkmark color, checked toggle's thumb color, radio button's background color around the dot. |
| inputFocusBorderAlt              | The alternate focus border color for elements that already have a border; e.g. text field borders on focus.                                                 |
| inputPlaceholderText             | The color of placeholder text.                                                                                                                              |
| buttonBackground                 | Background of a standard button.                                                                                                                            |
| buttonBackgroundHovered          | Background of a hovered standard button.                                                                                                                    |
| buttonBackgroundChecked          | Background of a checked standard button; e.g. bold/italicize/underline text button in toolbar.                                                              |
| buttonBackgroundCheckedHovered   | Background of a checked and hovered standard button; e.g. bold/italicize/underline text button in toolbar.                                                  |
| buttonBorder                     | Border of a standard button.                                                                                                                                |
| buttonText                       | Color of text in a standard button.                                                                                                                         |
| buttonTextHovered                | Color of text in a hovered standard button.                                                                                                                 |
| buttonTextChecked                | Color of text in a checked standard button.                                                                                                                 |
| buttonTextCheckedHovered         | Color of text in a checked and hovered standard button.                                                                                                     |
| menuItemBackgroundHovered        | The background of a hovered menu item.                                                                                                                      |
| menuItemBackgroundChecked        | The background of checked menu item; e.g. a menu item whose submenu is open, a selected dropdown item (deprecated).                                         |
| menuIcon                         | The default colors of icons in menus.                                                                                                                       |
| menuHeader                       | The headers in menus that denote title of a section.                                                                                                        |
| listBackground                   | The background color for the entire list.                                                                                                                   |
| listText                         | The default text color for list item titles and text in column fields.                                                                                      |
| listItemBackgroundHovered        | The background color of a hovered list item.                                                                                                                |
| listItemBackgroundChecked        | The background color of a checked list item.                                                                                                                |
| listItemBackgroundCheckedHovered | The background color of a checked and hovered list item.                                                                                                    |
| listHeaderBackgroundHovered      | The background color for a hovered list header.                                                                                                             |
| listHeaderBackgroundPressed      | The background color for a pressed list header.                                                                                                             |
| link                             | The color of a link.                                                                                                                                        |
| linkHovered                      | The color of a hovered link. Also used when the link is active.                                                                                             |
| listTextColor                    | DEPRECATED use listText instead                                                                                                                             |

### Palette

| Property             | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| themeDarker          | Color code for themeDarker.                                                                                                                   |
| themeDark            | Color code for themeDark.                                                                                                                     |
| themeDarkAlt         | Color code for themeDarkAlt.                                                                                                                  |
| themePrimary         | Color code for themePrimary.                                                                                                                  |
| themeSecondary       | Color code for themeSecondary.                                                                                                                |
| themeTertiary        | Color code for themeTertiary.                                                                                                                 |
| themeLight           | Color code for themeLight.                                                                                                                    |
| themeLighter         | Color code for themeLighter.                                                                                                                  |
| themeLighterAlt      | Color code for themeLighterAlt.                                                                                                               |
| black                | Color code for the strongest color, which is black in the default theme. This is a very light color in inverted themes.                       |
| blackTranslucent40   | Color code for blackTranslucent40.                                                                                                            |
| neutralDark          | Color code for neutralDark.                                                                                                                   |
| neutralPrimary       | Color code for neutralPrimary.                                                                                                                |
| neutralPrimaryAlt    | Color code for neutralPrimaryAlt.                                                                                                             |
| neutralSecondary     | Color code for neutralSecondary.                                                                                                              |
| neutralTertiary      | Color code for neutralTertiary.                                                                                                               |
| neutralTertiaryAlt   | Color code for neutralTertiaryAlt.                                                                                                            |
| neutralQuaternary    | Color code for neutralQuaternary.                                                                                                             |
| neutralQuaternaryAlt | Color code for neutralQuaternaryAlt.                                                                                                          |
| neutralLight         | Color code for neutralLight.                                                                                                                  |
| neutralLighter       | Color code for neutralLighter.                                                                                                                |
| neutralLighterAlt    | Color code for neutralLighterAlt.                                                                                                             |
| accent               | Color code for the accent.                                                                                                                    |
| white                | Color code for the softest color, which is white in the default theme. This is a very dark color in dark themes. This is the page background. |
| whiteTranslucent40   | Color code for whiteTranslucent40                                                                                                             |
| yellow               | Color code for yellow.                                                                                                                        |
| yellowLight          | Color code for yellowLight.                                                                                                                   |
| orange               | Color code for orange.                                                                                                                        |
| orangeLight          | Color code for orangeLight.                                                                                                                   |
| orangeLighter        | Color code for orangeLighter.                                                                                                                 |
| redDark              | Color code for redDark.                                                                                                                       |
| red                  | Color code for red.                                                                                                                           |
| magentaDark          | Color code for magentaDark.                                                                                                                   |
| magenta              | Color code for magenta.                                                                                                                       |
| magentaLight         | Color code for magentaLight.                                                                                                                  |
| purpleDark           | Color code for purpleDark.                                                                                                                    |
| purple               | Color code for purple.                                                                                                                        |
| purpleLight          | Color code for purpleLight.                                                                                                                   |
| blueDark             | Color code for blueDark.                                                                                                                      |
| blueMid              | Color code for blueMid.                                                                                                                       |
| blue                 | Color code for blue.                                                                                                                          |
| blueLight            | Color code for blueLight.                                                                                                                     |
| tealDark             | Color code for tealDark.                                                                                                                      |
| teal                 | Color code for teal.                                                                                                                          |
| tealLight            | Color code for tealLight.                                                                                                                     |
| greenDark            | Color code for greenDark.                                                                                                                     |
| green                | Color code for green.                                                                                                                         |
| greenLight           | Color code for greenLight.                                                                                                                    |
## Contribution
1. Clone the repository
2. Create new feature branch named as 'f_<your_initials>_FeatureDescription'
3. Develop new components using ```elementsui-react create``` scaffolding tool
4. Check if you can reuse any existing components from elementsui-react or office-ui-fabric
5. Add tests and multiple examples of usage
6. Create a pull request with meaningful description
7. Request a new npm version to be published
8. Update "elementsui-react"dependency version in your project
