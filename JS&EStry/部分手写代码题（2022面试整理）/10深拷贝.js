//深拷贝
function isObject(val) {
    return typeof val === 'object' && val !== null;
}

function deepClone(obj, hash = new WeakMap()) {
    if (!isObject(obj)) return obj;
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    let target = Array.isArray(obj) ? [] : {}
    hash.set(obj, target)
    Reflect.ownKeys(obj).forEach((item) => {
        if (isObject(obj[item])) {
            target[item] = deepClone(obj[item], hash)
        } else {
            target[item] = obj[item]
        }
    })
    return target
}

//test测试
var obj = {
    a: 2,
    b: {
        name: 'bbb'
    }
}
var objCopy = deepClone(obj)
obj.a = '111'
objCopy.c = '222'
console.log(objCopy, obj)