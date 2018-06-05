export const styles = props => {
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
