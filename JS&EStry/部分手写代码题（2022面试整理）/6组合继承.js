//js继承方法
function parent(name) {
    this.name = name;
    this.say = () => {
        console.log('say')
    }
}
parent.prototype.play = () => {
    console.log('play')
}

function children(name) {
    parent.call(this)
    this.name = name
}
children.prototype = Object.create(parent.prototype);
children.prototype.constructor = children;

let child = new children('111')

console.log(child.name)
child.say()
child.play()
console.log(children.prototype)