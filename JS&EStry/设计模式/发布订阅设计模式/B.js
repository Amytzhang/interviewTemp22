(function() {
    class Sub {
        //定义实例的私有事件池
        constructor() {
            this.listeners = [];
        };
        //通用方法
        add(func) {
            if (typeof func !== 'function') throw new TypeError('function is not a function!');
            let { listeners } = this; //私有变量 listeners = this.listeners
            if (listeners.includes(func)) return;
            listeners.push(func) //私有变量 listeners 往堆内存添加，改变this.listeners
        };
        remove(func) {
            if (typeof func !== 'function') throw new TypeError('function is not a function!');
            let { listeners } = this; //私有变量 listeners = this.listeners
            /**堆内存 
             * 如果 listeners = listeners.map()=>map不改变原始堆内存,
             * 所以不加this改变的是私有变量，不改变原始堆内存this.listeners
             */
            this.listeners = listeners.map(item => {
                if (item == func) {
                    return null
                }
                return item
            })
        };
        fire(...params) {
            let { listeners } = this;
            for (let i = 0; i < listeners.length; i++) {
                let item = listeners[i]
                if (item == null) {
                    listeners.splice(i, 1);
                    i--;
                    continue;
                }
                item(...params)
            }
        }
    }
    /**暴露API */
    if (typeof window !== 'undefined') window.Sub = Sub;
    if (typeof module == 'object' && typeof module.exports === 'object') module.exports = Sub;
})();
let s1 = new Sub;
/**测试 */
setTimeout(() => {
    s1.fire(10, 20)
    setTimeout(() => {
        s1.fire(100, 200)
    }, 2000)
}, 2000);
const fn1 = (x, y) => {
    console.log('fn1', x, y);
};
const fn2 = (x, y) => {
    console.log('fn2', x, y);
    s1.remove(fn1);
    s1.remove(fn2)
};
const fn3 = (x, y) => console.log('fn3', x, y);
const fn4 = () => console.log('fn4');
const fn5 = () => console.log('fn5');
const fn6 = () => console.log('fn6');


s1.add(fn1);
s1.add(fn2);
s1.add(fn3);
s1.add(fn4);
s1.add(fn5);
s1.add(fn6);