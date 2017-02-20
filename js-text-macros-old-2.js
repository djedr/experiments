// 1. gather macro definitions
        let lastEndIndex = 0;
        while ((matches = macroDefRegExp.exec(source))) {
            const macroName = matches[1];
            const startIndex = matches.index;

            let index = startIndex + matches[0].length;
            const args = matchParens(source, index, '(', ')');
            let body;

            // macro is a value
            if (args === null) {
                throw Error('Not implemented! macroDefRegex would have to be changed!');
            // macro is a function
            } else {
                index = eatSpace(source, args.index);
                body = matchParens(source, index, '{', '}');
                index = eatSpace(source, body.index);
            }

            macros[macroName] = eval(`(function (${args.match}) {${body.match}})`);

            // delete macro definition from source:
            defined += source.slice(lastEndIndex, startIndex);
            lastEndIndex = index;
        }

        defined += source.slice(lastEndIndex);

let substituted = '';
        lastEndIndex = 0;
        // 2. perform substitutions
        while ((matches = macroInvRegExp.exec(defined))) {
            const macroName = matches[1];
            const startIndex = matches.index;

            let index = startIndex + matches[0].length;
            const args = matchParens(defined, index, '(', ')');
            index = args.index;

            const macroValue = eval(`macros[macroName](${args.match})`);

            substituted += defined.slice(lastEndIndex, startIndex) + macroValue;
            lastEndIndex = index;
        }

        substituted += defined.slice(lastEndIndex);
