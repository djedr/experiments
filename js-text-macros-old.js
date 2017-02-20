 // maybe for each char of source instead of line?
            // it has to be aware of current char position and it will process multiple lines at a time
            const lines = source.split('\n');
            for (let i = 0; i < lines.length; ++i) {
                let line = lines[i];

                macroValue = null;

                // macro definition
                if ((matches = /^\s*@\s*text-macro\s+(\S*)\s*/.exec(line))) {
                    const macroName = matches[1];

                    const matchStartIndex = lineStartIndex + matches.index;
                    let matchEndIndex;

                    let macroArgs = '';

                    let macroBody = '';

                    // get args
                    // get body -- similar to args

                    macros[macroName] = eval(`function ${macroArgs} ${macroBody}`);

                    // delete macro definition from source:
                    output += source.slice(lastEnd + 1, matchStartIndex);
                    lastEnd = matchEndIndex + 1;
                    source = source.slice(0, matchStartIndex) + source.slice();
                // macro invocation
                } else if ((matches = /@\s*(\S*)\s*/.exec(line))) {
                    const macroName = matches[1];

                    const invocationStartIndex = lineStartIndex + matches.index;
                    let invocationEndIndex;

                    const nextCharIndex = invocationStartIndex + matches[0].length;
                    let nextChar = source[nextCharIndex];

                    let macroArgs = '';

                    // macro is a function
                    if (nextChar === '(') {
                        const count = 1;

                        // this works on multiple lines
                        // so we slice source and not line
                        for (const ch in source.slice(nextCharIndex + 1)) {
                            if (ch === ')') --count;
                            else if (ch === '(') ++count;
                            //else if (ch === '\n') ++i;

                            if (count === 0) {
                                invocationEndIndex = nextCharIndex + macroArgs.length + 1;
                                break;
                            }

                            // doesn't include outer ( and ):
                            macroArgs += ch;
                        }


                        // or eval(`macros[macroName](${macroArgs})`)
                        macroValue = macros[macroName](JSON.parse('[' + macroArgs + ']'));

                    // macro is a value
                    } else {
                        macroValue = macros[macroName];
                    }

                    // perform substitution
                    source = source.slice(0, invocationStartIndex)
                        + macroValue + source.slice(invocationEndIndex + 1);
                }

                lineStartIndex += line.length + 1;
            }
        }

fs.readTextFile();

for each line in source:
	if (~line.match(/^#text-macro\s+/)) {
		let name = ~match until '(';
		let args = ~match until '{';
		let body = ~eat text until matching '}';

		textMacrosNames.push(name);
		textMacrosTriggers.push(new Regex(name + '\s*\((.*)\)'));
		textMacros[name] = new Function(...(args.split(/\(\),/)), body); //eval('function ' + name + args + body);
	} else {
		for (let ~index, trigger of textMacrosTriggers) {
			if (~line.match(trigger)) {
				// this should respect parens () [] {}, as in macro(a, (b, c, d), e) is an invocation of macro with 3 args
				// so regex is too weak
				matchArgs = ~match[$0].split(',');
				line = line.slice(0, triggerStart) + textMacros[textMacrosNames[index]](~matchArgs) + line.slice(triggerEnd + 1);
			}
		}
		output += line;
	}


let rule = "012345678"

function ruleStrToBin(str) {
	let result = 0;

	for (let c of str) {
		let bit = 1 << Number.parseInt(c, 10);
		result |= bit;
	}

	return "0b" + result.toString(2);
}

console.log(ruleStrToBin(rule));

***

#text-macro ruleStrToBin(str) {
	let result = 0;

	for (let c of str) {
		let bit = 1 << Number.parseInt(c, 10);
		result |= bit;
	}

	return "0b" + result.toString(2);
}
