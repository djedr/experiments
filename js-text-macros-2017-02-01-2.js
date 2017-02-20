'use strict';
'use strict';

const fs = require('fs');
const callable = require('../github/callable-js');

// matchParens should accept a callback on no match; default callback is throw
// async macros, which return promises should work

// meta-macros like define transform the generator program

let trigger = '@';
let triggerEscape = '!';

let outputGeneratorSource = `
    let outputString = '';
`;

const isExpression = callable('value', c => [
    _ => match({
        source: c.value,
        index: 0,
        pattern: word('function', 'var', 'const', 'let'),
        onMatch: () => {
            c.return(true);
        }
    });
]);

// takes source and transforms all @{X} into `X`
const stringifyCode(source) => {
    let savedIndex = 0;
    let index = 0;
    let output = '';

    for (let index = 0; index < source.length; ++index) {
        let ch = source[index];

        if (ch === trigger) {
            // get code string into value
            let { value, index } = matchParens(source, index + 1, '{', '}', () => {
                throw SyntaxError('No match for {...}!');
                // todo: other possibilities, like @function
                // also, wrap it in callable
            });

            // possibly do macro substitiution recursively here

            output += source.slice(savedIndex, index) + '`' + value + '`';

            savedIndex = index + 1;
        }
    }

    output += source.slice(savedIndex);

    return output;
}

const generateSourceGenerator = callable('source', c => [
    source => {
        let savedIndex = 0;
        let index = 0;

        for (let index = 0; index < source.length; ++index) {
            let ch = source[index];

            if (ch === trigger) {
                if (source[index + 1] === triggerEscape) {
                    index += 1;
                    outputGeneratorSource += trigger;
                    continue;
                }

                // get macro body into value
                let { value, index } = matchParens(source, index + 1, '{', '}', () => {
                    throw SyntaxError('No match for {...}!');
                    // todo: other possibilities, like @function
                    // also, wrap it in callable
                });

                // replace @{X} with `X` in macro body
                value = stringifyCode(value);

                let sourceSlice = source.slice(savedIndex, index);

                isExpression(value, is => {
                    if (is) {
                        outputGeneratorSource += `
                            outputString += '${sourceSlice}' + ${value};
                        `;
                    } else {
                        outputGeneratorSource += `
                            outputString += '${sourceSlice}';
                            ${value}
                        `;
                    }
                });

                savedIndex = index + 1;
            }
        }

         outputGeneratorSource += `
            outputString += '${sourceSlice}';`;
        `;

        console.log(outputGeneratorSource);
    }
]);


self('js-text-macros.test.2.js');


