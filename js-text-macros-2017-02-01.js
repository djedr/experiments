in macro scope:

@{code} // `code`
@code // `code`

in normal scope:

@{...} // in-place macro -- inside it is an expression executed at macrotime


macro processor should generate a program which transforms the original source
and then execute it

jstpp
JSTPP
JavaScript Text Preprocessor

JuStA

define
ifdef
ifndef
undef

const undefun = () => '';

const undef = (macro) => {
    if (typeof macro === 'function') {
        macro = undefun;
    } else if (macro !== undefined) {
        macro = '';
    }

    return '';
};

const defined = (macro) => {
    return macro === undefun || macro === '' || macro === undefined;
};

const $if = ...;

const $ifdef = (...args) => {
    for (const [prev, curr] of partition(args, 2)) {
        if (defined(prev)) {
            return curr;
        }
    }
};

or just transform ifs to that
@{$ifdef(m, @{
    ...
}, $elif(m2), @{
    ...
}, $else, @{
    ...
})}
