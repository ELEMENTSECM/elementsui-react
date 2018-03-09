import React from 'react';

const NoMatch = ({ location }) => (
	<div>
		<p>
			Ooops! You're not supposed to be here
			<span role="img" aria-label="taco">
				😥
			</span>
		</p>
	</div>
);

export default NoMatch;
