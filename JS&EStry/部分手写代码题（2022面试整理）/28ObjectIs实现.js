// Object.is不会转换彼此比较的两个值的类型，与===相似
// 不同点：
// 1.NaN 在===中是不相等的，而在Object.is中是相等的
// 2.+0和-0在===中是相等的，在objec.is中是不相等的

Object.is = function(x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y
    }
    return x !== y && y !== y

}