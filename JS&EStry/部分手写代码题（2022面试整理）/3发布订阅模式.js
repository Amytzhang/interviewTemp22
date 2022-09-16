//发布订阅模式 实现方法 on emit once off

class EventEmitter {
    constructor() {
            this.events = {}
        }
        //实现订阅
    on(type, callback) {
            if (!this.events[type]) {
                this.events[type] = [callback]
            } else {
                this.events[type].push(callback)
            }
        }
        //删除订阅
    off(type, callback) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter(item => {
            return item != callback
        })
    }

    //只执行一次订阅事件
    once(type, callback) {
            function fn() {
                callback()
                this.off(type, fn)
            }
            this.on(type, fn)
        }
        //触发事件
    emit(type, ...rest) {
        this.events[type] && this.events[type].forEach(fn => {
            fn.apply(this, rest)
        });
    }
}

const event = new EventEmitter()
event.on('click', (...rest) => {
    console.log(rest)
})
event.emit('click', 1, 2, 3, 4)