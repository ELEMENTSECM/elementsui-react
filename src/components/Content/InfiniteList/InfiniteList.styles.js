export const styles = props => {
	const { className } = props;

	return {
		root: [
			'InfiniteList',
			{
				overflow: 'auto',
				WebkitOverflowScrolling: 'touch'
			},
			className
		],
		pulldown: [{ position: 'relative' }],
		pulldownHandle: [
			{
				position: 'absolute',
				left: 0,
				right: 0
			}
		],
		list: []
	};
};
