Function.prototype.mycall = function(context, ...args) {
        if (!context || context === null) {
            context = window;
        }
        let fn = Symbol()
        context[fn] = this
        delete fn;
        return context[fn](...args)
    }
    //区别call，参数是数组
Function.prototype.myApply = function(context, args) {
    if (!context || context === null) {
        context = window
    }
    let fn = Symbol()
    context[fn] = this
    delete fn
    return context[fn](...args)
}

//bind返回的结果是一个函数
Function.prototype.myBind = function(context, ...args) {
    if (!context || context === null) {
        context = window
    }
    let fn = Symbol()
    context[fn] = this
    let _this = this
    const result = function(...innerArgs) {
        //此时的this指向result实例  这时候不需要改变this实例
        if (this instanceof _this) {
            this[fn] = _this
                // 合并参数
            this[fn](...[...args, ...innerArgs])
            delete this[fn]
        } else {
            //普通函数调用 直接改变this指向传入的context
            context[fn](...[...args, ...innerArgs])
            delete context[fn]
        }

    }
    result.prototype = Object.create(this.prototype)
    return result
}

//使用
function Preson(name, age) {
    console.log(name)
    console.log(age)
    console.log(this)
}
Preson.prototype.say = function(args) {
    console.log('say' + args)
}

let obj = {
        objName: '测试obj',
        objAge: 12
    }
    //构造函数调用
let binFun = Preson.myBind(obj, '构造函数')
let a = new binFun('传进来的age')
a.say(1)


//普通函数
function normalFun(name, age) {
    console.log('normal:', name)
    console.log('normal:', age)
    console.log(this)
    console.log(this.objName)
    console.log(this.objAge)
}

let bindFunction = normalFun.myBind(obj, '普通函数')
bindFunction('222')