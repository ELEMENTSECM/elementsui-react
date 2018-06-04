export const getStyles = props => {
	const { className, size } = props;

	return {
		root: [
			'ModuleIcon',
			{
				height: size
			},
			className
		]
	};
};
