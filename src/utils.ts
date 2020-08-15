export function isDescendant(parent, child) {
	let node = child.parentNode;
	while (node !== null) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

export const keyCodes = {
	esc: 27,
	space: 32,
	enter: 13,
	tab: 9,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
};
