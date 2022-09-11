(function() {
    //自定义事件池
    let listeners = {};
    //校验处理
    const checkName = name => {
        if (typeof name !== 'string') throw new TypeError('name is not a string!')
    }
    const checkFunc = func => {
            if (typeof func !== 'function') throw new TypeError('func is not a function!')
        }
        //向事件池中加入方法
    const on = function on(name, func) {
        checkName(name);
        checkFunc(func);

        if (!listeners.hasOwnPrototype(name)) {
            listeners.name = []
        } else {
            let arr = listeners[name]
                //有相同的func要去重
            if (arr.indexOf(func) != -1) return;
            arr.push(func)
        }
    };
    //从事件池中移除方法
    const off = function off(name, func) {
        checkName(name);
        checkFunc(func);
        let arr = listeners[name];
        if (!arr) return;
        // 删除
        // 方法1：重新赋值
        listeners[name] = arr.filter(item => item != func)
            // 方法2：
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            if (item == func) {
                //原数组结构会造成数据塌陷问题
                // arr.splice(i,1)
                arr[i] = null
                break;
            }
        }
    };
    // 通知指定事件池中的方法执行
    const emit = function emit(name, ...params) {
        checkName(name);
        let arr = listeners[name];
        if (!arr) return;
        //通知集合中的每个方法执行
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
                // 解决数据塌陷问题判断
            if (item == null) {
                // 移除null,处理移除后下标问题
                arr.splice(i, 1)
                i--;
                continue;
            }
            item(...params)
        }

    };
    //暴露API
    Window.$sub = {
        on,
        off,
        emit
    }
})();
/**测试*/
setTimeout(() => {
    $sub.emit('AA', 10, 20);
    setTimeout(() => {
        $sub.emit('AA', 100, 200);
    }, 200)
}, 2000)
const fn1 = (x, y) => {
    console.log('fn1', x, y)
}
const fn2 = (x, y) => {
    console.log('fn2', x, y)
        //第一次执行到FN2时候从事件池中移除fn1/fn2
    $sub.off('AA', fn1);
    $sub.off('AA', fn2);
}
const fn3 = (x, y) => {
    console.log('fn3', x, y)
}
const fn4 = () => { console.log('fn4') };
const fn5 = () => { console.log('fn5') };
$sub.on('AA', fn1)
$sub.on('AA', fn2)
$sub.on('AA', fn3)
$sub.on('AA', fn1)
$sub.on('AA', fn4)
$sub.on('AA', fn5)