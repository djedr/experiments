str = `
    const x = 5;
    function y(a, b) {
        return a + b;
    }
    @text-macro hello() {
        return '5';
    }

    let b = (z) => {
        return z + @hello();
    };

    @text-macro hi() {
        return a + b;
    }
`;

re = /^\s*@\s*text-macro\s+(\S*)\s*/gmu;

console.log(str.match(re));
console.log(re.exec(str));
