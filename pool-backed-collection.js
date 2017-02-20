board = {
	first: [],
	second: [],
	isFirstCurrent: true
}

let Board = {
	pool: [[], []],
	i: 0;
	current: 0,
	make: () => {
		Board.current = (current + 1) % pool.length;
		Board.i = 0;
		return Board;
	},
	push: (element) => {
		Board.pool[current][i] = element;
		Board.i += 1;
	},
	map: (f) => {
		Board.make();
		// this should be more general
		return forBasedInPlaceMap(Board.pool[current], f);
	}
};

function forBasedInPlaceMap(collection, f) {
	for (let i = 0; i < collection.length; ++i) {
		const element = collection[i];
		// if element is a collection (or object?) -- patch map to modify it in place
		if (Array.isArray(element)) { // or object
			const patchedElement = element;
			patchedElement.map = (g) => forBasedInPlaceMap(element, g) // recursive
			collection[i] = f(patchedElement);
		} else { // map as usual
			pool[current][i] = f(element);
		}
	}
	
	return collection;
}
