export const styles = props => {
	const { className } = props;

	return {
		root: [
			{
				backgroundColor: 'rgba(29,62,70,.69)',
				boxShadow:
					'0 12px 13px -15px rgba(0,0,0,.42), 0 3px 20px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2)',
				borderRadius: 2,
				position: 'relative',
				width: 'auto',
				margin: 10,
				boxSizing: 'border-box',
				padding: 20
			},
			className
		]
	};
};
