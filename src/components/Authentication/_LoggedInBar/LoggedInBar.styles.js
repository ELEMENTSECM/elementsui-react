export const styles = props => {
	const { className } = props;

	return {
		root: [{}, className],
		logo: [
			{
				marginLeft: 20,
				selectors: {
					'@media (max-width: 768px)': {
						display: 'none'
					}
				}
			}
		],
		logoutLink: [
			{
				position: 'relative',
				float: 'right',
				paddingRight: 10,
				color: '#fff',
				fontSize: 12,
				selectors: {
					':hover': {
						color: '#fff'
					}
				}
			}
		],
		persona: [
			{
				float: 'right'
			}
		],
		backButton: [
			{
				color: '#fff',
				position: 'absolute',
				top: 36,
				left: 15,
				fontSize: 10,
				fontWeight: 'bold',
				cursor: 'pointer',
				transition: 'all .2s ease',
				selectors: {
					':hover': {
						fontSize: 12,
						top: 35
					}
				}
			}
		]
	};
};
