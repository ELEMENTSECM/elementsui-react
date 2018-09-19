import { css } from "react-emotion";

export const styles = {
	ListItem: css`
		overflow: hidden;
		margin-bottom: -1px;
		position: relative;
		'&:nth-child(odd)': {
			background: #f7f7f7;
		}
	`,
	link: css`
		font-size: 1.2em;
		min-height: 49px;
		padding: 15px 20px 4px 37px;
		margin-left: 17px;
		border-radius: 0;
		border-width: 0;
		color: #555;
		display: block;
	`,
	icon: css`margin-left: -13px;`
};
