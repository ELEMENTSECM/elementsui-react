import React from 'react';
import PropTypes from 'prop-types';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import prism from 'react-syntax-highlighter/styles/prism/prism';

class CodeExample extends React.Component {
	componentDidMount() {
		registerLanguage('jsx', jsx);
	}

	render() {
		return (
			<SyntaxHighlighter language="javascript" style={prism}>
				{this.props.children}
			</SyntaxHighlighter>
		);
	}
}

CodeExample.propTypes = {
	children: PropTypes.string.isRequired
};

export default CodeExample;
