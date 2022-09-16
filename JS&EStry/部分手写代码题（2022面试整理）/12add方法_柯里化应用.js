//add(1)(2)(3)() = 6    add(1,2,3)(4)()=10
function add(...args) {
    let allArgs = [...args]
    return function fn(...newArgs) {
        if (newArgs.length) {
            allArgs = [...allArgs, ...newArgs]
            return fn
        } else {
            if (!allArgs.length) return;
            return allArgs.reduce((pre, curr) => pre + curr)
        }

    }
}


let all = add(1)(2)(3)()
let all2 = add(1, 2, 3)(4)()
console.log(all, all2)