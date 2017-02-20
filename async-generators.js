async generators

x.next().value(cb)

x.next().then

subscribe ~ addEventListener

let f = fun({...});

let r = f({...});

r.unsubscribe ~ r.return

return ~ cancel ~ complete

x.next(cb); // for async generator

x.next(y, cb); // for yield substitution for async generator

cb = (next) => {
	let { value, done } = next;
}

break ~ loop.return()
x.break() ~ x.return()

return x.break; // break is a getter, so this is an invocation of break

return s.continue;

continue:
	in while -- jumps to condition
	in for -- jumps to update
	in a regular function -- ?
	in a generator -- resets generator?

s.while((loop) => [
	c=> s.i < 3,
	...
]);

s.for((loop) => [
	c=> loop.let('k').in(s.collection),
	// or
	c=> c.let('i', 0).while(_=> c.i < s.collection.length).after(_=> ++c.i),
	// or
	c=> c.let('i', 0).while(_=> c.i < s.collection.length).finally(_=> ++c.i),
	// or
	c=> c.let('c').of(s.collection)
]);

s.loop({
	while: c=> s.i < 3,
	repeat: c=> [
	
	]
}

function *foo(x) {
    var y = x * (yield);
    return y;
}

let foo = fun((c) => [(x) => c.yield(),
	(next) => {
		c.y = c.args[0] * next;
		c.return(y);
	}
]);

let foo = fun({args: 'x', body: c=> [
	x => c.yield(),
	next => {
		c.y = c.x * next;
		c.return(c.y);
	}
]});

let foo = fun('x', c=> [
	c.yield,
	y => c.return(c.x * y)
]);

let foo = fun({args: 'x', body: c=> [
	c.yield,
	next => c.return(c.x * next)
]});
