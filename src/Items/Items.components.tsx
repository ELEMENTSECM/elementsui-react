import styled from "styled-components";
import { Well } from "react-bootstrap";

export const ItemsContainer = styled(Well)`
	padding: 2px;
	min-height: 26px;
	background-color: #f8f8f8;

	> ul.eui-items__list {
		max-height: 105px;
		overflow-y: auto;
		display: block;
		padding: 0;
		box-sizing: border-box;
		list-style: none;
		margin: 0;
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;

		> li.eui-items__list__item {
			margin: 0 0 1px 3px;
			padding: 0 6px 0 3px;
			float: left;
			border-radius: 1px;
			border: 1px solid #cccaca;
			outline: solid 1px transparent;
			background-color: #f1eeee;
			text-shadow: 0 0 3px #fffefe;
			color: #333;
			cursor: default;

			&:hover {
				background-color: #fbfbfb;
				border: 1px solid #c3c2c2;
				cursor: pointer;
			}

			> button.eui-items__list__item__remove {
				color: #676767;
				padding: 0 1px;
				margin-right: 3px;
				cursor: pointer;
				display: inline-block;
				font-weight: bold;
				background: none;
				border: none;

				&:hover {
					transform: scale(1.2);
					color: #560404;
				}

				&:focus {
					outline: none;
				}
			}
		}
	}
`;
