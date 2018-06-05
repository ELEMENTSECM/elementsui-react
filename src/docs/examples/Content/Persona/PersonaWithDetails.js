import * as React from 'react';
import Persona from 'elementsui-react/Content/Persona';

/** Persona with secondary text */
export default function PersonaWithDetails() {
	const persona = {
		imageUrl: 'https://www.meme-arsenal.com/memes/818dab40d4bfe8f9f602852e5ddfbc09.jpg',
		text: 'Annie Lindqvist',
		secondaryText: 'Software Engineer'
	};
	return <Persona {...persona} />;
}
