//js实现一个并发限制的异步调度器scheduler,保证同时运行的任务最多有两个

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')
//输出顺序是2 3 1 4
class Scheduler {
    constructor(limit) {
        this.queue = []
        this.maxCount = limit;
        this.runCount = 0;
    }
    add(time, order) {
        const promiseCreator = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order)
                    resolve()
                }, time)
            })
        }
        this.queue.push(promiseCreator)
    }
    taskStart() {
        for (let i = 0; i < this.maxCount; i++) {
            this.request()
        }
    }
    request() {
        if (!this.queue || !this.queue.length || this.runCount >= this.maxCount) {
            return;
        }
        this.runCount++;
        this.queue.shift()().then(() => {
            this.runCount--;
            this.request()
        })
    }
}

const scheduler = new Scheduler(2);
const addTask = (time, order) => {
    scheduler.add(time, order)
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

scheduler.taskStart()