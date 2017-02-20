 let funs = [
        _ => fs.readFile(fileName, 'utf-8', funs[1]),
        (err, source) => {
            if (err) throw err;
            const output = processMacros(source);
            console.log(output);
            onReturn(output);
        }
    ];

@{seq(
    `_ => fs.readFile(fileName, 'utf-8', ${next})`,
    `(err, source) => {
        if (err) throw err;
        const output = processMacros(source);
        console.log(output);
        onReturn(output);
    }`
)}

@{function initSeq() {
    nextCnt = 0;
    next = `funs[${++nextCnt}]`;

    return `const funs = `;
}}

@{function then() {
    next = `funs[${++nextCnt}]`;

    return `,`;
}}

@{initSeq()}
[
    _ => fs.readFile(fileName, 'utf-8', @{next})
    @{then()} (err, source) => {
        if (err) throw err;
        const output = processMacros(source);
        console.log(output);
        onReturn(output);
    }
];

@seqBegin()
_ => fs.readFile(fileName, 'utf-8', @next) @then()
(err, source) => {
    if (err) throw err;
    const output = processMacros(source);
    console.log(output);
    onReturn(output);
}
@seqEnd()
