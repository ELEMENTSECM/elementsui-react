import * as React from 'react';

export interface InfiniteListProps {
	/**
	 * DOM element's id attribute
	 */
	id?: string;
	/**
	 * Locale (en, nb, etc.)
	 */
	locale?: string;
	/**
	 * A function which must be called after reaching the bottom. It must trigger some sort of action which fetches the next data. The data is passed as children to the InfiniteList component and the data should contain previous items too. e.g. Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6].
	 */
	next?: (...args: any[]) => any;
	/**
	 * It tells the InfiniteList component on whether to call next function on reaching the bottom and shows an endMessage to the user
	 */
	hasMore?: boolean;
	/**
	 * The data items which you need to scroll.
	 */
	children?: React.ReactNode;
	/**
	 * This message is shown to the user when he has seen all the records which means he's at the bottom and hasMore is false
	 */
	endMessage?: React.ReactNode;
	/**
	 * Optional, give only if you want to have a fixed height scrolling content
	 */
	height?: number;
	/**
	 * Optional, reference to a (parent) DOM element that is already providing overflow scrollbars to the InfiniteList component. You should provide the id of the DOM node preferably.
	 */
	scrollableTarget?: React.ReactNode;
	/**
	 * Children is by default assumed to be of type array and it's length is used to determine if loader needs to be shown or not, if your children is not an array, specify this prop to tell if your items are 0 or more.
	 */
	hasChildren?: boolean;
	/**
	 * To enable Pull Down to Refresh feature
	 */
	pullDownToRefresh?: boolean;
	/**
	 * Any JSX that you want to show the user
	 */
	pullDownToRefreshContent?: React.ReactNode;
	/**
	 * Any JSX that you want to show the user
	 */
	releaseToRefreshContent?: React.ReactNode;
	/**
	 * Minimum distance the user needs to pull down to trigger the refresh
	 */
	pullDownToRefreshThreshold?: number;
	/**
	 * This function will be called, it should return the fresh data that you want to show the user
	 */
	refreshFunction?: (...args: any[]) => any;
	/**
	 * A function that will listen to the scroll event on the scrolling container. Note that the scroll event is throttled, so you may not receive as many events as you would expect.
	 */
	onScroll?: (...args: any[]) => any;
	/**
	 * Set the length of the data.This will unlock the subsequent calls to next.
	 */
	dataLength: number;
	/**
	 * User-defined styling
	 */
	styles?: (...args: any[]) => any;
}

declare const InfiniteList: React.SFC<InfiniteListProps>;

export default InfiniteList;
