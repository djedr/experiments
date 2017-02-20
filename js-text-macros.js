'use strict';
const fs = require('fs');
const callable = require('../github/callable-js');

// 2 passes:
// 1st: collect definitions
// 2nd: perform substitutions

// index is the index of the opening paren
function matchParens(source, index, open, close) {
    let count = 1, match = '';

    if (source[index] !== open) return null;

    // this works on multiple lines
    // so we slice source and not line
    for (let i = index + 1; i < source.length; ++i) {
        let ch = source[i];

        if (ch === close) --count;
        else if (ch === open) ++count;

        if (count === 0) {
            index = i + 1;
            // returned index is the index of closing paren
            // match is the stuff between parens, excluding themselves
            return { index, match };
        }

        // doesn't include outer ( and ):
        match += ch;
    }

    return null;
}

// returns index of the first nonspace character
function eatSpace(source, index) {
    for (let i = index; i < source.length; ++i) {
        let ch = source[i];
        if (ch.search(/\S/)) return i + 1;
    }
    return index;
}

function applyRegex(source, regExp, cb) {
    let matches, result = '';
    let lastEndIndex = 0;
    while ((matches = regExp.exec(source))) {
        const macroName = matches[1];
        const startIndex = matches.index;

        let index = startIndex + matches[0].length;

        let x = cb(source, index, macroName);
        result += source.slice(lastEndIndex, startIndex) + x.value;

        lastEndIndex = x.index;
    }

    result += source.slice(lastEndIndex);
    return result;
}

const self = callable({args: 'fileName', body: c=> [
    _=> fs.readFile(c.fileName, 'utf-8', c.next), // c.try instead of c.next
    (err, source) => {
        if (err) throw err;
        let macros = [];

        // TODO: the @ should be parametrizable
        const macroDefRegExp = /^\s*@\s*function\s+([a-zA-Z_$]*)\s*/gmu;
        const macroInvRegExp = /@\s*([a-zA-Z_$]*)\s*/gmu;

        let defined = applyRegex(source, macroDefRegExp, (source, index, macroName) => {
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
            return { index, value: '' };
        });

        let substituted = applyRegex(defined, macroInvRegExp, (source, index, macroName) => {
            const args = matchParens(source, index, '(', ')');

            // macro is a value
            if (args === null) {
                throw Error('Not implemented!');
            // macro is a function
            } else {
                index = args.index;
            }


            return { index, value: eval(`macros[macroName](${args.match})`) };
        });

        console.log(substituted);
   }
]});

self('js-text-macros.test.2.js');
