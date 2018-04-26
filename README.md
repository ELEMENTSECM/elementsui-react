[![Build Status](https://travis-ci.org/EVRYAS/elementsui-react.svg?branch=master)](https://travis-ci.org/EVRYAS/elementsui-react)
[![Coverage Status](https://coveralls.io/repos/github/EVRYAS/elementsui-react/badge.svg?branch=master)](https://coveralls.io/github/EVRYAS/elementsui-react?branch=master)

# ElementsUI React Components

A library of React components for the Elements family.

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

To apply custom styling to any component you should implement 'getStyles' function

```javascript
const getStyles = props => {
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
	getStyles={getStyles}
/>
```

# Docs

[Component documentation](https://evryas.github.io/elementsui-react/)
