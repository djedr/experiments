#define TEXT_COLOR #fff
#define css(x) #x
#define css2(x) `x`
#define INVOKE(macro, ...) macro(__VA_ARGS__)
#define $f(macro, ...) macro(__VA_ARGS__)
#define $v(m) m

TEXT_COLOR
INVOKE(css, TEXT_COLOR)
$v(TEXT_COLOR)
$f(css, TEXT_COLOR)
css2(TEXT_COLOR)

@function CSS(val) {
    return `'${val}'`;
}
