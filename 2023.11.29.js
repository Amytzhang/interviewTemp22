var Foo = function () {
  Foo.a = function(){
    console.log(1)
  }
  this.a = function(){
    console.log(2)
  }
  console.log(this.a)
}

Foo.prototype.a = function () {
  console.log(4)
}
Foo.a = function () {
  console.log(3)
}

Foo.a()
var b = new Foo()

b.a()
Foo.a()
