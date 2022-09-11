function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x + 2;
}

function fn3(x) {
    return x + 3;
}

function fn4(x) {
    return x + 4;
}

function compose(...fn) {
    console.log('内部：', fn)
    if (!fn.length) return (v) => v;
    if (fn.length === 1) return fn[0];
    return fn.reduce((pre, current) => (...args) => pre(current(...args)))
}
console.log(compose(fn1, fn2, fn3, fn4))
const a = compose(fn1, fn2, fn3, fn4) // 1+4+3+2+1

console.log(a(1))