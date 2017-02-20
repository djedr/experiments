syntax ruleStrToBin = function (ctx) {
	let str = ctx.next().value;	
	let result = 0;
	
	let dummy = #`dummy`.get(0);
	
	let val = str.val();
	
	let str2 = val.toString();
	
	//let x = str.toString();

	for (let c of str2) {
		let bit = 1 << Number.parseInt(c, 10);
		result |= bit;
	}
	
	return #`${dummy.fromNumber(result)}`;
};

syntax ruleStrToBin2 = (ctx) => {
	let next = ctx.next();
	let str = next.value;	
	let result = 0;
	
	let val = str.val();
	
	let dummy = #`dummy`.get(0);
	
	let cache = [];
	let s = JSON.stringify(str, function(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Circular reference found, discard key
				return;
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});

	for (let c of val.toString()) {
		let bit = 1 << Number.parseInt(c, 10);
		result |= bit;
	}
	
	return #`${dummy.fromString(s)}`;
};

let n = ruleStrToBin 0123456780;
console.log(n);
console.log(n.toString(2));

let m = ruleStrToBin2 012345678;
console.log(m.toString(2));

