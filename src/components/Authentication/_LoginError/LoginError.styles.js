export const styles = props => {
	const { className } = props;

	return {
		root: [
			'ms-LoginError',
			{
				width: '100%',
				margin: 0,
				padding: 10,
				transition: 'all .5s ease'
			},
			className
		]
	};
};
