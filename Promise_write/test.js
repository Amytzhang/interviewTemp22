let p1 = Promise.reject(0);
let p3 = Promise.resolve(1000)
let p2 = p1.then(null
    /**顺延渗透
     * value => {console.log('成功', value)}
     */
    , null /* reason => {console.log('失败', reason)}*/ );
p2.then(value => {
    console.log('成功', value)
}, reason => {
    console.log('失败', reason)
})
Promise.reject(111).then(value => {
    console.log('成功', value)
}).catch(reason => {
    // 顺延渗透
    //.catch(onrejected) ==>.then(null,onrejected)
    console.log('失败', reason)
})
Promise.reject(121).then(value => {
    console.log('成功', value)
}).then(null, reason => {
    //.catch(onrejected) ==>.then(null,onrejected)
    console.log('失败', reason)
}).finally(() => {
    console.log('finally2')
})
p3.then(value => {
    console.log('finally3', value)
})