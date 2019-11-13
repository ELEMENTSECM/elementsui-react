import * as React from "react";
import { throttle } from "lodash";
import { BarLoader } from "react-spinners";
import { nls } from "./InfiniteList.nls";
import styled from "styled-components";
import InfiniteListItem from "./InfiniteListItem";

export interface InfiniteListProps {
	/** DOM element's id attribute */
	id?: string;
	/** Locale (en; nb; etc.) */
	locale?: string;
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
	/** To enable Pull Down to Refresh feature */
	pullDownToRefresh?: boolean;
	/** Any JSX that you want to show the user */
	pullDownToRefreshContent?: React.ReactNode;
	/** Any JSX that you want to show the user */
	releaseToRefreshContent?: React.ReactNode;
	/** Minimum distance the user needs to pull down to trigger the refresh */
	pullDownToRefreshThreshold?: number;
	/** This function will be called; it should return the fresh data that you want to show the user */
	refreshFunction?: () => void;
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
}

type State = {
	dataLength: number;
	showLoader: boolean;
	lastScrollTop: number;
	actionTriggered: boolean;
	pullToRefreshThresholdBreached: boolean;
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

const PullDown = styled.div`
	position: relative;
	& > div {
		position: absolute;
		left: 0;
		right: 0;
	}
`;

export default class InfiniteList extends React.Component<InfiniteListProps, State> {
	static Item = InfiniteListItem;

	private startY = 0;
	private currentY = 0;
	private dragging = false;
	private maxPullDownDistance = 0;
	private el;
	private _infScroll;
	private _scrollableNode;
	private _pullDown;
	private translations;

	static defaultProps: Partial<InfiniteListProps> = {
		spinnerColor: "#2180c0"
	};

	constructor(props) {
		super(props);
		this.state = {
			dataLength: props.dataLength,
			showLoader: false,
			lastScrollTop: 0,
			actionTriggered: false,
			pullToRefreshThresholdBreached: false
		};

		this.translations = nls[props.locale || "nb"];
	}

	getScrollableTarget = () => {
		if (this.props.scrollableTarget instanceof HTMLElement) return this.props.scrollableTarget;
		if (typeof this.props.scrollableTarget === "string") {
			return document.getElementById(this.props.scrollableTarget);
		}
		if (this.props.scrollableTarget === null) {
			console.warn(`You are trying to pass scrollableTarget but it is null. This might
			happen because the element may not have been added to DOM yet.`);
		}
		return null;
	};

	onStart = evt => {
		if (this.state.lastScrollTop) return;

		this.dragging = true;
		this.startY = evt.pageY || evt.touches[0].pageY;
		this.currentY = this.startY;

		this._infScroll.style.willChange = "transform";
		this._infScroll.style.transition = `transform 0.2s cubic-bezier(0,0,0.31,1)`;
	};

	onMove = evt => {
		if (!this.dragging) return;
		this.currentY = evt.pageY || evt.touches[0].pageY;

		if (this.currentY < this.startY) return;

		const threshold = this.props.pullDownToRefreshThreshold || 100;
		if (this.currentY - this.startY >= threshold) {
			this.setState(ps => ({
				...ps,
				pullToRefreshThresholdBreached: true
			}));
		}

		if (this.currentY - this.startY > this.maxPullDownDistance * 1.5) return;

		this._infScroll.style.overflow = "visible";
		this._infScroll.style.transform = `translate3d(0px, ${this.currentY - this.startY}px, 0px)`;
	};

	onEnd = _evt => {
		this.startY = 0;
		this.currentY = 0;

		this.dragging = false;

		if (this.state.pullToRefreshThresholdBreached) {
			this.props.refreshFunction && this.props.refreshFunction();
		}

		requestAnimationFrame(() => {
			if (this._infScroll) {
				this._infScroll.style.overflow = "auto";
				this._infScroll.style.transform = "none";
				this._infScroll.style.willChange = "none";
			}
		});
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
			actionTriggered: false,
			pullToRefreshThresholdBreached: false
		};
	}

	componentDidMount() {
		this._scrollableNode = this.getScrollableTarget();
		this.el = this.props.height ? this._infScroll : this._scrollableNode || window;
		this.el.addEventListener("scroll", this.throttledOnScrollListener);

		if (this.props.pullDownToRefresh) {
			this.el.addEventListener("touchstart", this.onStart);
			this.el.addEventListener("touchmove", this.onMove);
			this.el.addEventListener("touchend", this.onEnd);

			this.el.addEventListener("mousedown", this.onStart);
			this.el.addEventListener("mousemove", this.onMove);
			this.el.addEventListener("mouseup", this.onEnd);

			this.maxPullDownDistance = this._pullDown.firstChild.getBoundingClientRect().height;
			this.forceUpdate();

			if (typeof this.props.refreshFunction !== "function") {
				throw new Error(
					`Mandatory prop "refreshFunction" missing.
					Pull Down To Refresh functionality will not work
					as expected.`
				);
			}
		}
	}

	componentWillUnmount() {
		this.el.removeEventListener("scroll", this.throttledOnScrollListener);

		if (this.props.pullDownToRefresh) {
			this.el.removeEventListener("touchstart", this.onStart);
			this.el.removeEventListener("touchmove", this.onMove);
			this.el.removeEventListener("touchend", this.onEnd);

			this.el.removeEventListener("mousedown", this.onStart);
			this.el.removeEventListener("mousemove", this.onMove);
			this.el.removeEventListener("mouseup", this.onEnd);
		}
	}

	render() {
		const style = {
			height: this.props.height || "auto"
		};

		const hasChildren =
			this.props.hasChildren ||
			!!(this.props.children && (this.props.children as React.ReactNodeArray).length);

		const outerDivStyle = this.props.pullDownToRefresh && this.props.height ? { overflow: "auto" } : {};

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
					color="#2180c0"
					loading={loading}
				/>
				<InfiniteListContainer
					style={{ ...style, ...outerDivStyle }}
					className={this.props.className}
					ref={infScroll => (this._infScroll = infScroll)}
				>
					{this.props.pullDownToRefresh && (
						<PullDown ref={pullDown => (this._pullDown = pullDown)}>
							<div
								style={{
									top: -1 * this.maxPullDownDistance
								}}
							>
								{!this.state.pullToRefreshThresholdBreached && (
									<h3>{this.translations.pullDownToRefresh}</h3>
								)}
								{this.state.pullToRefreshThresholdBreached && (
									<h3>{this.translations.releaseToRefresh}</h3>
								)}
							</div>
						</PullDown>
					)}
					<List as={this.props.tag} className={this.props.listClassName} role="list">
						{this.props.children}
					</List>
					{!this.props.hasMore && this.props.endMessage}
				</InfiniteListContainer>
			</Root>
		);
	}
}
