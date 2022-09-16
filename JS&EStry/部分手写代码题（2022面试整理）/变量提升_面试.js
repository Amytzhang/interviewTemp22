function Foo() {
    getName = function() {
        console.log(1)
    }
    return this
}
Foo.getName = function() {
    console.log(2)
}
Foo.prototype.getName = function() {
    console.log(3)
}
var getName = function() {
    console.log(4)
}

function getName() {
    console.log(5)
}

Foo.getName() //2
getName() //4
    // Foo().getName() //1
    //函数提升要比变量提升的优先级高一些，且不会被变量声明覆盖，但会被变量赋值后覆盖，同名时
getName() //4
new Foo.getName() //2
new Foo().getName() //3
new new Foo().getName() //3


var name = 'World';
(function() {
    console.log('1', name)
    if (typeof name === 'undefined') {
        var name = 'Jack'
        console.log('Goodbye' + name)
    } else {
        console.log(name)
    }
})()





showName();

function showName() {
    console.log(1)
}
var showName = function() {
    console.log(2)
}
showName()