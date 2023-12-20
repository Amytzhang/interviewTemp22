(function() {
    "use strict"
    /**检测是否为函数 */
    var isFunction = function isFunction(obj) {
            return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function"
        }
    //关于onfulfilled/onrejected执行返回值r的处理
    var resolvePromise = function resolvePromise(promise,r,resolve,reject){
        if(promise == r) throw new TypeError('chaining cycle detected for promise #<Promise>')
        if(r!==null&&/^(object|function)$/.test(typeof r)){
            var then;
            try{
                then = r.then
            }catch(err) {
                reject(err)
            }
            if(typeof then ==='function') {
                var called =false
                // 是promise实例r.then()
               try {
                then.call(r,function onfulfilled(y){
                    if(called) return;
                    called = true
                    resolvePromise(promise,y,resolve,reject)
                },function onrejected(r){
                    if(called) return;
                    called = true
                    reject(r)
                })
               } catch(err){
                if(called) return;
                called = true   
                reject(err)
               }
                return ;
            }
            return;
        }
        resolve(r)

    }
    // 验证是否为promise实例
    var isPromise = function isPromise(r) {
        if(r!==null&&/^(object|function)$/.test(typeof r)){
            var then;
            try{
                then = r.then
            }catch(err) {
                return false
            }
            if(typeof then ==='function') {
               return true
            }
        }
        return false;
    }
        /**核心部分 */
    function Promise(executor) {
        //保证executor必须是一个函数
        if (!isFunction(executor)) throw new TypeError('executor is not a function')
            // 保证promise是被new执行的 【不考虑兼容：new.target】console.log(new.target)
            /**"use strict"  普通函数执行 this ->undefined  call也无法改变实例  Promise(function() {})--->报错undefined is not a promise*/
        if (!(this instanceof Promise)) throw new TypeError("undefined is not a promise")

        let self = this
        self.state = "pending"
        self.result = undefined;
        // onfulfilled/onrejected存放到指定容器中
        self.onfulfilledCallback = [];
        self.onrejectedCallback = []
            //修改实例状态
            function change (state, result) {
            //状态更改一次不再更改
            if (self.state !== 'pending') return;
            self.state = state
            self.result = result
                // 修改完状态后，把之前存储在容器中的指定方法拿来执行【异步微任务】
            setTimeout(function() {
                var callbacks = state === "fulfilled" ? self.onfulfilledCallback : self.onrejectedCallback;
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](self.result)
                }
            })

        }
        try {
            executor(function resolve(value) {
                change('fulfilled', value)
            }, function reject(value) {
                change('rejected', value)
            })
        } catch (err) {
            //修改实例状态--失败
            change('rejected', err)
        }
    }
    // 原型方法
    Promise.prototype = {
            constructor: Promise,
            then: function then(onfulfilled, onrejected) {
                // 如果onfulfilled,onrejected不传要实现顺延渗透
                if(typeof onfulfilled !=="function"){
                    onfulfilled = function onfulfilled(value) {
                        return value
                    }
                }
                if(typeof onrejected !=="function"){
                    onrejected = function onrejected(reason) {
                        throw reason
                    }
                }
                var self = this;
                //then返回的是一个新的promise实例，其状态由onfulfilled/onrejected返回的状态决定
                var promise = new Promise(function(resolve, reject) {
                    // 根据当前实例的状态做不同的事请
                    // +状态成功：把onfulfilled执行[异步微任务]
                    // +状态失败：把onrejected执行[异步微任务]
                    // +不知状态：把onfulfilled/onrejected存到指定容器中
                    switch (self.state) {
                        case "fulfilled":
                            setTimeout(function() {
                                try {
                                    var r = onfulfilled(self.result)
                                    resolvePromise(promise,r,resolve,reject)
                                } catch (err) {
                                    reject(err)
                                }
                            })
                            break;
                        case 'rejected':
                            setTimeout(function() {
                                try {
                                    var r = onrejected(self.result)
                                    resolvePromise(promise,r,resolve,reject)
                                } catch (err) {
                                    reject(err)
                                }
                            })
                            break;
                        default:
                            self.onfulfilledCallback.push(function(value) {
                                try {
                                    var r = onfulfilled(value)
                                    resolvePromise(promise,r,resolve,reject)
                                } catch (err) {
                                    reject(err)
                                }
                            });
                            self.onrejectedCallback.push(function(reason) {
                               
                                try {
                                    var r = onrejected(reason)
                                    resolvePromise(promise,r,resolve,reject)
                                } catch (err) {
                                    reject(err)
                                }
                            })
                    }
                })
                return promise

            },
            catch: function promiseCatch(onrejected) {
                return this.then(null,onrejected)
            },
            // finally
        }
        // 静态私有属性方法
    Promise.resolve = function resolve(value) {
        return new Promise(function(resolve){
            resolve(value)
        })
    };
    Promise.reject = function reject(reason) {
        return new Promise(function(_,reject){
            reject(reason)
        })
    };
    Promise.all = function all(promises) {
        if(!/^\[object Array\]$/.test(object.prototype.toString.call(promises))) throw new TypeError('promises is not a array')
        var n=0,values=[];

        return new Promise(function(resolve,reject){
            for(var i=0;i<promises.length;i++) {
                (function(i){
                    var promise = promises[i]
                    if(!isPromise(promise)) {
                     promise = Promise.resolve(promise)
                    }
                    promise.then(function onfulfilled(value) {
                        n++;
                        values[i] = value
                        if(n>=promises.length) resolve(values)
                    },function onrejected(reason){
                        reject(reason)
                    })
                })(i)
            }
        })
    }
        /**暴露API */
        if (typeof module === 'object' && typeof module.exports === "object") module.exports = Promise;
})()