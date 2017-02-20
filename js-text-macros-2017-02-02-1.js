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

const define = (text) => {


    return '';
};

generate a program, which will generate the output string
execute the program
return the output string`

let outputGeneratorSource = `
    let outputString = ${source.slice(prevChId, chId)};
`;

in source:
    find @
    eat {body}

    in body:
        find @
        eat {text}
        replace @{text} with `text`;

    if body is expr:
        evaluate expr into val
        replace @{body} with val
    else:
        break outputText;
        splice body into outputSource
        resume outputText
