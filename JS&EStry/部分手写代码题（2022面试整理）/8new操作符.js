//手写new操作符

//1.创建一个全新的对象
//2. 将创建的对象的 __proto__ 指向 构造函数的 prototype
//3. 执行构造函数并将 this 执行新创建的对象
//4.return结果
function myNew(fn, ...args) {
    // Object.create(proto) 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）
    // proto   null或除基本类型包装对象以外的对象,如果不是这几类值，会抛出异常
    // TypeError: Object prototype may only be an Object or null: undefined
    let obj = Object.create(fn.prototype)
    let res = fn.call(obj, ...args)
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res
    }
    return obj
}
let a = function() {};
myNew(a)

function myNew2(fn, ...args) {
    var obj = new Object()
    obj.__proto__ = fn.prototype
    let res = fn.call(obj, ...args)
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res
    }
    return obj
}