let p1 = new Promise((resolve, reject) => {
    resolve(100)
    reject(0)
});
let p2 = p1.then(value => {
        console.log('成功', value)
        return Promise.resolve(Promise.reject(00))
    }, reason => {
        console.log('失败', reason)
    })
    // queueMicrotask(function(){
    //   //创建异步的微任务
    //   //不兼容：我们可以创建异步的宏任务来代替异步的微任务
    // });