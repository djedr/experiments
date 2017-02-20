const x = 5;
function y(a, b) {
    return a + b;
}
@{function hello() {
    return '5';
}}

let b = (z) => {
    return z + @{hello()};
};

@{function hi(a, b) {
    return a + b;
}}

@{function include(fileName) {
    const fs = require('fs');

    // either return a promise to be async
    // or require a callback
    return fs.readFileSync(fileName, 'utf-8');
}}

@{function includeCb(fileName, cb) {
    const fs = require('fs');

    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) throw err;
        cb(data);
    });
}}

@{function includeAsync(fileName) {
    return new Promise((res, rej) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) return rej(err);
            return res(data);
        });
    });
}}

/*callable include(c, fileName) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) c.throw(err);
        c.return(data);
    });
}*/

const g = @{hi('m', 'n')};

@{include('sweet-log.js')}

@{function ruleStrToBin(str) {
	let result = 0;

	for (let c of str) {
		let bit = 1 << Number.parseInt(c, 10);
		result |= bit;
	}

	return "0b" + result.toString(2);
}}

@{define(@{function separateSpaces(str) {
    let output = '[';
	let words = str.split(' ').map((w) => {
        if (w[0] === '%') {
            output += w.slice(1);
        } else {
            output += "`" + w + "`";
        }
        output += ', ';
    });
    return output.slice(0, output.length - 2) + ']';
}})}

@{ruleStrToBin('012345678')}

@{separateSpaces('%input -P -o %output')}

@{function destructur({ a, b }) {
    return a + b;
}}

@{destructur({ a: 'h', b: 'i' })};

let ax = { a: 'o', b: 'h' };
@{destructur('ax')}
