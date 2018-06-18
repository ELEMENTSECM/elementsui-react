import * as React from 'react';
import PropTypes from 'prop-types';
import { styles } from './InfiniteList.styles';
import { classNamesFunction, customizable, styled } from 'office-ui-fabric-react/lib/Utilities';
import Spinner from '../../Indicators/Spinner';
import { IntlProvider, FormattedMessage } from 'react-intl';
import nls from './InfiniteList.nls.json';

/** InfiniteList example */
class InfiniteListComponent extends React.Component {
	static getDerivedStateFromProps(props, state) {
		if (props.dataLength === state.dataLength) return null;

		return {
			dataLength: props.dataLength,
			showLoader: false,
			actionTriggered: false,
			pullToRefreshThresholdBreached: false
		};
	}

	constructor(props) {
		super();
		this.state = {
			dataLength: props.dataLength,
			showLoader: false,
			lastScrollTop: 0,
			actionTriggered: false,
			pullToRefreshThresholdBreached: false
		};

		this.startY = 0;
		this.currentY = 0;
		this.dragging = false;
		this.maxPullDownDistance = 0;

		this.throttledOnScrollListener = this.throttle(this.onScrollListener, 150);
		this.classNames = classNamesFunction()(styles, props);
	}

	componentDidMount() {
		this._scrollableNode = this.getScrollableTarget();
		this.el = this.props.height ? this._infScroll : this._scrollableNode || window;
		this.el.addEventListener('scroll', this.throttledOnScrollListener);

		if (
			typeof this.props.initialScrollY === 'number' &&
			this.el.scrollHeight > this.props.initialScrollY
		) {
			this.el.scrollTo(0, this.props.initialScrollY);
		}

		if (this.props.pullDownToRefresh) {
			this.el.addEventListener('touchstart', this.onStart);
			this.el.addEventListener('touchmove', this.onMove);
			this.el.addEventListener('touchend', this.onEnd);

			this.el.addEventListener('mousedown', this.onStart);
			this.el.addEventListener('mousemove', this.onMove);
			this.el.addEventListener('mouseup', this.onEnd);

			this.maxPullDownDistance = this._pullDown.firstChild.getBoundingClientRect().height;
			this.forceUpdate();

			if (typeof this.props.refreshFunction !== 'function') {
				throw new Error(
					`Mandatory prop "refreshFunction" missing.
					Pull Down To Refresh functionality will not work
					as expected.`
				);
			}
		}
	}

	componentWillUnmount() {
		this.el.removeEventListener('scroll', this.throttledOnScrollListener);

		if (this.props.pullDownToRefresh) {
			this.el.removeEventListener('touchstart', this.onStart);
			this.el.removeEventListener('touchmove', this.onMove);
			this.el.removeEventListener('touchend', this.onEnd);

			this.el.removeEventListener('mousedown', this.onStart);
			this.el.removeEventListener('mousemove', this.onMove);
			this.el.removeEventListener('mouseup', this.onEnd);
		}
	}

	getScrollableTarget = () => {
		if (this.props.scrollableTarget instanceof HTMLElement) return this.props.scrollableTarget;
		if (typeof this.props.scrollableTarget === 'string') {
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

		this._infScroll.style.willChange = 'transform';
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

		this._infScroll.style.overflow = 'visible';
		this._infScroll.style.transform = `translate3d(0px, ${this.currentY - this.startY}px, 0px)`;
	};

	onEnd = evt => {
		this.startY = 0;
		this.currentY = 0;

		this.dragging = false;

		if (this.state.pullToRefreshThresholdBreached) {
			this.props.refreshFunction && this.props.refreshFunction();
		}

		requestAnimationFrame(() => {
			if (this._infScroll) {
				this._infScroll.style.overflow = 'auto';
				this._infScroll.style.transform = 'none';
				this._infScroll.style.willChange = 'none';
			}
		});
	};

	isElementAtBottom(target, scrollThreshold = 0.8) {
		const clientHeight =
			target === document.body || target === document.documentElement
				? window.screen.availHeight
				: target.clientHeight;

		return target.scrollTop + clientHeight >= scrollThreshold * target.scrollHeight;
	}

	onScrollListener = event => {
		if (typeof this.props.onScroll === 'function') {
			setTimeout(() => this.props.onScroll(event), 0);
		}

		let target =
			this.props.height || this._scrollableNode
				? event.target
				: document.documentElement.scrollTop
					? document.documentElement
					: document.body;

		if (this.state.actionTriggered) return;

		let atBottom = this.isElementAtBottom(target, this.props.scrollThreshold);

		if (atBottom && this.props.hasMore) {
			this.setState(ps => ({ ...ps, actionTriggered: true, showLoader: true }));
			this.props.next();
		}
		this.setState(ps => ({ ...ps, lastScrollTop: target.scrollTop }));
	};

	throttle = (fn, threshhold, scope) => {
		threshhold || (threshhold = 250);
		let last, deferTimer;
		return function() {
			const context = scope || this;

			const now = +new Date(),
				args = arguments;
			if (last && now < last + threshhold) {
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function() {
					last = now;
					fn.apply(context, args);
				}, threshhold);
			} else {
				last = now;
				fn.apply(context, args);
			}
		};
	};

	render() {
		const style = {
			height: this.props.height || 'auto'
		};
		const hasChildren = this.props.hasChildren || !!(this.props.children && this.props.children.length);

		const outerDivStyle = this.props.pullDownToRefresh && this.props.height ? { overflow: 'auto' } : {};
		const { root, pulldown, list, pulldownHandle } = this.classNames;
		return (
			<IntlProvider locale={this.props.locale} messages={nls[this.props.locale]}>
				<div style={outerDivStyle} className={root}>
					<div ref={infScroll => (this._infScroll = infScroll)} style={style}>
						{this.props.pullDownToRefresh && (
							<div className={pulldown} ref={pullDown => (this._pullDown = pullDown)}>
								<div
									className={pulldownHandle}
									style={{ top: -1 * this.maxPullDownDistance }}>
									{!this.state.pullToRefreshThresholdBreached && (
										<h3>
											<FormattedMessage id="pullDownToRefresh" />
										</h3>
									)}
									{this.state.pullToRefreshThresholdBreached && (
										<h3>
											<FormattedMessage id="releaseToRefresh" />
										</h3>
									)}
								</div>
							</div>
						)}
						<ul className={list}>{this.props.children}</ul>
						{!this.state.showLoader && !hasChildren && this.props.hasMore && <Spinner />}
						{this.state.showLoader && this.props.hasMore && <Spinner />}
						{!this.props.hasMore && this.props.endMessage}
					</div>
				</div>
			</IntlProvider>
		);
	}
}

export const InfiniteList = InfiniteListComponent;

InfiniteList.propTypes = {
	/** Locale (en, nb, etc.) */
	locale: PropTypes.string,
	/** A function which must be called after reaching the bottom. It must trigger some sort of action which fetches the next data. The data is passed as children to the InfiniteList component and the data should contain previous items too. e.g. Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6]. */
	next: PropTypes.func,
	/** It tells the InfiniteList component on whether to call next function on reaching the bottom and shows an endMessage to the user */
	hasMore: PropTypes.bool,
	/** The data items which you need to scroll. */
	children: PropTypes.node,
	/** A threshold value after that the InfiniteList will call next. By default it's 0.8. It means the next will be called when the user comes below 80% of the total height. */
	scrollThreshold: PropTypes.number,
	/** This message is shown to the user when he has seen all the records which means he's at the bottom and hasMore is false */
	endMessage: PropTypes.node,
	/** Optional, give only if you want to have a fixed height scrolling content */
	height: PropTypes.number,
	/** Optional, reference to a (parent) DOM element that is already providing overflow scrollbars to the InfiniteList component. You should provide the id of the DOM node preferably. */
	scrollableTarget: PropTypes.node,
	/** Children is by default assumed to be of type array and it's length is used to determine if loader needs to be shown or not, if your children is not an array, specify this prop to tell if your items are 0 or more. */
	hasChildren: PropTypes.bool,
	/** To enable Pull Down to Refresh feature */
	pullDownToRefresh: PropTypes.bool,
	/** Any JSX that you want to show the user */
	pullDownToRefreshContent: PropTypes.node,
	/** Any JSX that you want to show the user */
	releaseToRefreshContent: PropTypes.node,
	/** Minimum distance the user needs to pull down to trigger the refresh */
	pullDownToRefreshThreshold: PropTypes.number,
	/** This function will be called, it should return the fresh data that you want to show the user */
	refreshFunction: PropTypes.func,
	/** A function that will listen to the scroll event on the scrolling container. Note that the scroll event is throttled, so you may not receive as many events as you would expect. */
	onScroll: PropTypes.func,
	/** Set the length of the data.This will unlock the subsequent calls to next. */
	dataLength: PropTypes.number.isRequired,
	/** User-defined styling */
	styles: PropTypes.func
};

InfiniteListComponent.propTypes = {
	/** Locale (en, nb, etc.) */
	locale: PropTypes.string.isRequired,
	/** A function which must be called after reaching the bottom. It must trigger some sort of action which fetches the next data. The data is passed as children to the InfiniteList component and the data should contain previous items too. e.g. Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6]. */
	next: PropTypes.func,
	/** It tells the InfiniteList component on whether to call next function on reaching the bottom and shows an endMessage to the user */
	hasMore: PropTypes.bool,
	/** The data items which you need to scroll. */
	children: PropTypes.node,
	/** A threshold value after that the InfiniteList will call next. By default it's 0.8. It means the next will be called when the user comes below 80% of the total height. */
	scrollThreshold: PropTypes.number,
	/** This message is shown to the user when he has seen all the records which means he's at the bottom and hasMore is false */
	endMessage: PropTypes.node,
	/** Optional, give only if you want to have a fixed height scrolling content */
	height: PropTypes.number,
	/** Optional, reference to a (parent) DOM element that is already providing overflow scrollbars to the InfiniteList component. You should provide the id of the DOM node preferably. */
	scrollableTarget: PropTypes.node,
	/** Children is by default assumed to be of type array and it's length is used to determine if loader needs to be shown or not, if your children is not an array, specify this prop to tell if your items are 0 or more. */
	hasChildren: PropTypes.bool,
	/** To enable Pull Down to Refresh feature */
	pullDownToRefresh: PropTypes.bool,
	/** Any JSX that you want to show the user */
	pullDownToRefreshContent: PropTypes.node,
	/** Any JSX that you want to show the user */
	releaseToRefreshContent: PropTypes.node,
	/** Minimum distance the user needs to pull down to trigger the refresh */
	pullDownToRefreshThreshold: PropTypes.number,
	/** This function will be called, it should return the fresh data that you want to show the user */
	refreshFunction: PropTypes.func,
	/** A function that will listen to the scroll event on the scrolling container. Note that the scroll event is throttled, so you may not receive as many events as you would expect. */
	onScroll: PropTypes.func,
	/** Set the length of the data.This will unlock the subsequent calls to next. */
	dataLength: PropTypes.number.isRequired,
	/** User-defined styling */
	styles: PropTypes.func
};

export default styled(customizable('InfiniteList', ['theme'])(InfiniteList), styles);
