import * as React from "react";
import { KeyMap } from "react-hotkeys";
import { find, isNil, isEmpty, takeWhile, partial, first, last } from "lodash";

export const keyMap: KeyMap = {
	down: "down",
	up: "up",
	left: "left",
	right: "right",
	pageDown: "pagedown",
	pageUp: "pageup",
	top: "home",
	bottom: "end"
} as const;

type NextItem = (start: HTMLElement, itemsPerRow: number) => HTMLElement | undefined;
type StepItem = (start: HTMLElement) => HTMLElement | undefined;

const currentItem = (list: HTMLElement | null) =>
	find(
		list?.children,
		x => x === document.activeElement || x.contains(document.activeElement)
	) as HTMLElement;
const itemsPerRow = (list: HTMLElement | null) => {
	if (isEmpty(list?.children)) {
		return 0;
	} else {
		const top = list?.children?.[0]?.getBoundingClientRect().top;
		return takeWhile(list?.children, child => child.getBoundingClientRect().top === top).length;
	}
};

const next = (step: StepItem, stepCount: number, start: HTMLElement) => {
	let remained = stepCount;
	let cursor = start;
	while (remained-- > 0) {
		const next = step(cursor);
		if (isNil(next)) {
			return cursor;
		} else if (remained === 0) {
			return next;
		} else {
			cursor = next!;
		}
	}
};

const stepForward: StepItem = x => x?.nextElementSibling as HTMLElement;
const stepBackward: StepItem = x => x?.previousElementSibling as HTMLElement;

export const handlers = (listRef: React.RefObject<HTMLElement>, { pageSize = 3 }) => {
	const navigate = (nextItem: NextItem) => (e?: KeyboardEvent) => {
		const item = nextItem(currentItem(listRef.current), itemsPerRow(listRef.current));
		if (item) {
			item.focus();
			e?.stopPropagation();
			e?.preventDefault();
		}
	};

	const left = navigate((start, itemsPerRow) => (itemsPerRow > 1 ? stepBackward(start) : undefined));
	const right = navigate((start, itemsPerRow) => (itemsPerRow > 1 ? stepForward(start) : undefined));
	const up = navigate((start, itemsPerRow) => next(stepBackward, itemsPerRow, start));
	const down = navigate((start, itemsPerRow) => next(stepForward, itemsPerRow, start));
	const pageDown = navigate(partial(next, stepForward, pageSize));
	const pageUp = navigate(partial(next, stepBackward, pageSize));
	const top = navigate(() => first(listRef.current?.children) as HTMLElement);
	const bottom = navigate(() => last(listRef.current?.children) as HTMLElement);

	return {
		left,
		right,
		up,
		down,
		pageDown,
		pageUp,
		top,
		bottom
	};
};
