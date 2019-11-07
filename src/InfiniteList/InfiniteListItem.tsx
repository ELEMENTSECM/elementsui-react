import * as React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

export interface InfiniteListItemProps {
	/** onClick event handler */
	onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	/** Item link */
	link?: string;
	/** Icon class name */
	icon?: string;
	/** Icon color */
	iconColor?: string;
	/** List item class name */
	className?: string;
	/** Link className */
	linkClassName?: string;
}

const Li = styled.li`
	overflow: hidden;
	margin-bottom: -1px;
	position: relative;

	&:nth-child(odd) {
		background: #f7f7f7;
	}
`;

const A = styled.a`
	font-size: 1.2em;
	min-height: 49px;
	padding: 15px 20px 4px 37px;
	margin-left: 17px;
	border-radius: 0;
	border-width: 0;
	color: #555;
	display: block;
`;

const I = styled.i`margin-left: -13px;`;

const InfiniteListItem: React.FC<InfiniteListItemProps> = ({
	children,
	onClick,
	link,
	icon,
	iconColor,
	className,
	linkClassName
}) => (
	<Li tabIndex={0} className={className}>
		<A href={link} onClick={onClick} className={linkClassName}>
			<Row>
				<Col xs={1}>
					<I style={iconColor ? { color: iconColor } : {}} className={icon} />
				</Col>
				<Col xs={10}>{children}</Col>
			</Row>
		</A>
	</Li>
);

export default InfiniteListItem;
