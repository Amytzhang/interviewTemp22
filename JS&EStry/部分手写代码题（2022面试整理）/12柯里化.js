function currying(fn, ...args) {
    console.log('fn:', fn, fn.length)
    let allArgs = [...args];
    let length = fn.length; //函数形参的个数
    /**
     * length 是JS函数对象的一个属性值，该值是指 “该函数有多少个必须要传入的参数”，即形参的个数
      形参的数量不包括剩余参数个数，仅包括 “第一个具有默认值之前的参数个数”
      在没有默认值时，fn.length指的是形参的个数，如果有参数有默认值，那么就取第一个具有默认值之前的参数的个数。
     */
    const result = ((...newArgs) => {
        allArgs = [...allArgs, ...newArgs]
        if (allArgs.length === length) {
            return fn(...allArgs)
        } else {
            return result
        }
    })
    return result
}

const a = currying((a, b, c) => a + b + c, 1)
console.log(a)

console.log(a(2, 3))

console.log(a(2, 3, 4))