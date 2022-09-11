var a = {
    name: 'aaa'
}
var b = a;
b.name = '111'
b = { name: 'bbb' }
console.log(a.name, b.name)
var c = a
c.name = "ccc"
console.log(a.name)
var name = 'cat'

function getName() {
    // console.log(name)
    console.log(this.name)
        //  return name
}
var getNameB = {
    name: 'B',
    getName1: function() {
        console.log(this.name)
        return this.name
    }
}
console.log(getNameB.getName1())