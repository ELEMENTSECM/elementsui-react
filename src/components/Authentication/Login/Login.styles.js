export const styles = props => {
	const { className } = props;

	return {
		root: [
			'modal-dialog',
			{
				padding: 0
			},
			className
		],
		wrapper: [
			{
				background: '#ebf0eb',
				position: 'fixed',
				display: 'block',
				overflow: 'auto',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: 1000
			}
		],
		content: [],
		main: [
			'modal-content',
			{
				minHeight: 400,
				border: 'none'
			},
			className
		],
		header: [{ minHeight: 81 }],
		buttonContainer: [
			{
				display: 'block',
				float: 'left',
				width: '100%',
				transition: 'all .5s ease',
				padding: '160px 0 0'
			}
		],
		loginButton: [
			'button-primary',
			{
				padding: '20px 25px',
				width: '80%',
				margin: '0 10%',
				borderRadius: 2,
				overflow: 'hidden',
				transition: 'all .2s',
				backgroundImage: 'linear-gradient(to bottom,#6eb76e 0,#61ad61 100%)',
				color: '#fff',
				selectors: {
					':hover': {
						color: '#ffffff',
						outline: 0,
						borderColor: '#4cae4c',
						transform: 'translate(0,-2px)',
						boxShadow:
							'0 12px 13px -15px rgba(0,0,0,.15), 0 3px 20px 0 rgba(0,0,0,.09), 0 8px 10px -5px rgba(0,0,0,.15)'
					}
				}
			}
		],
		loginLabel: [
			{
				margin: '5px auto',
				color: '#fff',
				display: 'block',
				selectors: {
					':hover': {
						color: '#fff !important',
						textDecoration: 'underline'
					}
				}
			}
		],
		spinner: [
			{
				position: 'absolute',
				left: '46%',
				top: '46%'
			}
		]
	};
};
