/**
 * 观察者模式比发布订阅模式的区别是：
 * 观察者是个对象，对象有update()/返回函数，通知的时候是通知给update方法
 * 发布订阅模式直接加方法，通知给方法执行
 */
class Subject {
    //容器
    observerList = [];
    // 校验观察者模式
    checkObserver(observer) {
        if (observer !== null && /^(object|function)$/.test(typeof observer)) {
            if (typeof observer.update == 'function') {
                return true
            }
        }
        throw new TypeError('Illegal observer');
    }
    add(observer) {
        this.checkObserver(observer)
        let { observerList } = this;
        if (observerList.includes(observer)) return;
        observerList.push(observer)
    };
    remove(observer) {
            this.checkObserver(observer);
            let { observerList } = this;
            this.observerList = observerList.map(item => {
                if (item === observer) return null;
                return item;
            })
        }
        //通知执行
    notify(...params) {
        let { observerList } = this;
        for (let i = 0; i < observerList.length; i++) {
            let item = observerList[i]
            if (item === null) {
                observerList.splice(i, 1)
                i--;
                continue;
            }

            item.update(...params)
        }
    }
}

//定义多个观察者
let observer1 = {
    update(...params) {
        console.log('我是观察者1：', params)
    }
}

class observer {
    update(...params) {
        console.log('我是观察者2：', params)
    }
}

const sub = new Subject;
sub.add(observer1);
sub.add(new observer);
setTimeout(() => {
    sub.notify(100, 200)
}, 1000)