import * as React from "react";
import styled from "styled-components";

export interface InfiniteListItemProps {
	/** List item class name */
	className?: string;
	/** HTML element tag that will rendered for this item. Default: <li> */
	tag?: keyof JSX.IntrinsicElements;
	/** Any data that will be passed as event payload that could help identify the item */
	itemId?: any;
	/** onFocus event handler */
	onFocus?: (index?: number) => void;
	/** onClick event handler */
	onClick?: (index?: number) => void;
	/** onKeyDown event handler */
	onKeyDown?: (e: any, index?: number) => void;
	/** Tabindex*/
	tabIndex?: number;
}

const ListItem = styled.li`
	overflow: hidden;
	position: relative;
`;

const InfiniteListItem: React.SFC<InfiniteListItemProps> = ({
	children,
	className,
	tag,
	onFocus,
	onClick,
	onKeyDown,
	itemId,
	tabIndex = 0
}) => {
	const onFocusCallback = React.useCallback(() => onFocus?.(itemId), [onFocus, itemId]);
	const onClickCallback = React.useCallback(() => onClick?.(itemId), [onClick, itemId]);
	const onKeyDownCallback = React.useCallback((e) => onKeyDown?.(e, itemId), [onKeyDown, itemId]);
	return (
		<ListItem as={tag} tabIndex={tabIndex} className={className} role="listitem" onFocus={onFocusCallback} onClick={onClickCallback} onKeyDown={onKeyDownCallback}>
			{children}
		</ListItem>
	);
};

export default React.memo<React.PropsWithChildren<InfiniteListItemProps>>(InfiniteListItem);
