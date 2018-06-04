import * as React from 'react';
import Persona from 'elementsui-react/Content/Persona';

/** Styled persona: the styles defined in getStyles prop will be merged with the existing ones */
export default function PersonaStyled() {
	const getStyles = () => {
		return {
			root: {
				background: '#2d8498'
			},
			primaryText: {
				color: '#fff'
			},
			secondaryText: {
				color: '#fff'
			}
		};
	};

	const persona = {
		imageUrl: 'https://www.meme-arsenal.com/memes/818dab40d4bfe8f9f602852e5ddfbc09.jpg',
		primaryText: 'Annie Lindqvist',
		secondaryText: 'Software Engineer',
		getStyles
	};
	return <Persona {...persona} />;
}
