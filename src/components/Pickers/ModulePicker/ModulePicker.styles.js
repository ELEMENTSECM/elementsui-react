export const styles = props => {
	const { className } = props;

	return {
		root: ['ms-ModulePicker', {}, className],
		list: [
			{
				listStyleType: 'none',
				display: 'flex',
				flexWrap: 'wrap',
				padding: 0,
				margin: 0
			}
		],
		listItem: [
			{
				margin: 0,
				background: 'transparent',
				flexGrow: 1,
				minWidth: '50%',
				overflow: 'hidden',
				textAlign: 'center',
				boxSizing: 'border-box',
				selectors: {
					':hover': {
						background: 'transparent',
						transition:
							'transform .4s cubic-bezier(0,.78,.48,1.26),box-shadow .7s cubic-bezier(0,.88,.68,1.22)',
						transform: 'translate(0,-2px)'
					}
				}
			}
		],
		radio: [
			{
				position: 'absolute',
				opacity: 0
			}
		],
		moduleItem: [
			{
				display: 'block',
				position: 'relative',
				cursor: 'pointer',
				transition: 'all .25s linear',
				fontWeight: 400,
				marginBottom: 0,
				textAlign: 'center'
			}
		],
		moduleIcon: [
			{
				display: 'inline-block',
				padding: '6px 8px'
			}
		],
		thumbnail: [
			{
				borderWidth: 1,
				borderStyle: 'solid',
				padding: '13% 10% 10%',
				margin: '4%',
				position: 'relative',
				overflow: 'hidden',
				borderRadius: 2,
				transition: 'all .3s',
				display: 'block',
				boxSizing: 'border-box',
				cursor: 'pointer',
				//lineHeight: 1.42857143,
				selectors: {
					':hover': {
						transition:
							'transform .4s cubic-bezier(0,.78,.48,1.26),box-shadow .7s cubic-bezier(0,.88,.68,1.22)',
						boxShadow:
							'0 12px 13px -15px rgba(0,0,0,.42), 0 3px 20px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2)'
					}
				}
			}
		],
		thumbnailDefault: [
			{
				color: '#333',
				background: '#fff',
				borderColor: '#ddd'
			}
		],
		thumbnailSelected: [
			{
				color: '#fff',
				background: '#5cb85c',
				borderColor: '#4cae4c'
			}
		],
		moduleName: [
			{
				textOverflow: 'ellipsis',
				overflow: 'hidden',
				padding: '5px 0 4px',
				display: 'block'
			}
		]
	};
};
