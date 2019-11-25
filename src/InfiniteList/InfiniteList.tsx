import * as React from "react";
import { throttle } from "lodash";
import { BarLoader } from "react-spinners";
import styled from "styled-components";
import InfiniteListItem from "./InfiniteListItem";
import { HotKeys } from "react-hotkeys";
import { keyMap, handlers } from "./keyboardNavigation";

export interface InfiniteListProps {
	/** DOM element's id attribute */
	id?: string;
	/** A function which must be called after reaching the bottom. It must trigger some sort of action which fetches the next data. The data is passed as children to the InfiniteList component and the data should contain previous items too. e.g. Initial data = [1; 2; 3] and then next load of data should be [1; 2; 3; 4; 5; 6]. */
	next?: () => void;
	/** It tells the InfiniteList component on whether to call next function on reaching the bottom and shows an endMessage to the user */
	hasMore?: boolean;
	/** This message is shown to the user when he has seen all the records which means he's at the bottom and hasMore is false */
	endMessage?: React.ReactNode;
	/** Optional; give only if you want to have a fixed height scrolling content */
	height?: string | number;
	/** Optional; reference to a (parent) DOM element that is already providing overflow scrollbars to the InfiniteList component. You should provide the id of the DOM node preferably. */
	scrollableTarget?: React.ReactNode;
	/** Children is by default assumed to be of type array and it's length is used to determine if loader needs to be shown or not; if your children is not an array; specify this prop to tell if your items are 0 or more. */
	hasChildren?: boolean;
	/** A function that will listen to the scroll event on the scrolling container. Note that the scroll event is throttled; so you may not receive as many events as you would expect. */
	onScroll?: (event?: any) => void;
	/** Set the length of the data.This will unlock the subsequent calls to next. */
	dataLength: number;
	/** Root div class name */
	className?: string;
	/** List class name */
	listClassName?: string;
	/** Spinner color in a form accepted in CSS stylesheet */
	spinnerColor?: string;
	/** HTML element tag that will rendered for this item. Default: <li> */
	tag?: keyof JSX.IntrinsicElements;
	/** Enable keyboard navigation. False by default. */
	keyboardNavigationEnabled?: boolean;
	/** Number of items to skip when navigating  */
	keyboardNavigationPageSize?: number;
}

type State = {
	dataLength: number;
	showLoader: boolean;
	lastScrollTop: number;
	actionTriggered: boolean;
};

const Root = styled.div`
	overflow: hidden;
`; // Establish new Block Formatting Context

const List = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const InfiniteListContainer = styled.div`
	overflow: auto;
	-webkit-overflow-scrolling: touch;
`;

export default class InfiniteList extends React.Component<InfiniteListProps, State> {
	static Item = InfiniteListItem;

	private el;
	private _infScroll;
	private _scrollableNode;
	private listRef = React.createRef<HTMLUListElement>();
	private keyboardHandlers;

	static defaultProps: Partial<InfiniteListProps> = {
		spinnerColor: "#2180c0",
		keyboardNavigationEnabled: false,
		keyboardNavigationPageSize: 3
	};

	constructor(props: InfiniteListProps) {
		super(props);
		this.state = {
			dataLength: props.dataLength,
			showLoader: false,
			lastScrollTop: 0,
			actionTriggered: false
		};

		this.keyboardHandlers = props.keyboardNavigationEnabled ? handlers(this.listRef, { pageSize: this.props.keyboardNavigationPageSize }) : null;
	}

	getScrollableTarget = () => {
		if (this.props.scrollableTarget instanceof HTMLElement) return this.props.scrollableTarget;
		if (typeof this.props.scrollableTarget === "string") {
			return document.getElementById(this.props.scrollableTarget);
		}
		if (this.props.scrollableTarget === null) {
			console.warn(
				`You are trying to pass scrollableTarget but it is null. This might happen because the element may not have been added to DOM yet.`
			);
		}
		return null;
	};

	isElementAtBottom(target) {
		const clientHeight =
			target === document.body || target === document.documentElement
				? window.screen.availHeight
				: target.clientHeight;

		return target.scrollHeight - target.scrollTop === clientHeight;
	}

	onScrollListener = event => {
		setTimeout(() => this.props.onScroll && this.props.onScroll(event), 0);

		const target =
			this.props.height || this._scrollableNode
				? event.target
				: document.documentElement!.scrollTop
				? document.documentElement
				: document.body;

		if (this.state.actionTriggered) return;

		const atBottom = this.isElementAtBottom(target);

		if (atBottom && this.props.hasMore && this.props.dataLength) {
			this.setState(ps => ({ ...ps, actionTriggered: true, showLoader: true }));
			this.props.next && this.props.next();
		}
		this.setState(ps => ({ ...ps, lastScrollTop: target.scrollTop }));
	};

	private throttledOnScrollListener = throttle(this.onScrollListener, 150);

	static getDerivedStateFromProps(props, state) {
		if (props.dataLength === state.dataLength) return null;

		return {
			dataLength: props.dataLength,
			showLoader: false,
			actionTriggered: false
		};
	}

	componentDidMount() {
		this._scrollableNode = this.getScrollableTarget();
		this.el = this.props.height ? this._infScroll : this._scrollableNode || window;
		this.el.addEventListener("scroll", this.throttledOnScrollListener);
	}

	componentWillUnmount() {
		this.el.removeEventListener("scroll", this.throttledOnScrollListener);
	}

	render() {
		const style = {
			height: this.props.height || "auto"
		};

		const hasChildren =
			this.props.hasChildren ||
			!!(this.props.children && (this.props.children as React.ReactNodeArray).length);

		const loading =
			(!this.state.showLoader && !hasChildren && this.props.hasMore) ||
			(this.state.showLoader && this.props.hasMore);

		return (
			<Root style={style}>
				<BarLoader
					width={100}
					widthUnit="%"
					height={4}
					heightUnit="px"
					color={this.props.spinnerColor}
					loading={loading}
				/>
				<InfiniteListContainer
					style={{ ...style }}
					className={this.props.className}
					ref={infScroll => (this._infScroll = infScroll)}
				>
					<HotKeys keyMap={keyMap} handlers={this.keyboardHandlers}>
						<List
							ref={this.listRef}
							as={this.props.tag}
							className={this.props.listClassName}
							role="list"
						>
							{this.props.children}
						</List>
					</HotKeys>

					{!this.props.hasMore && this.props.endMessage}
				</InfiniteListContainer>
			</Root>
		);
	}
}
