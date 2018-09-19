import { css } from "react-emotion";

export const styles = {
	InfiniteList: css`
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	`,
	pulldown: css`position: relative;`,
	pulldownHandle: css`
		position: absolute;
		,: 0;
		right: 0;
	`
};
