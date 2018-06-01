export const getStyles = props => {
	const { size, className } = props;

	return {
		root: [
			'ModuleIcon',
			{
				width: size,
				height: size
			},
			className
		]
	};
};
