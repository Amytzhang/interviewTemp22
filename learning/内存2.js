// console.log(a,b,c)
// var a=12,b=13,c=14;
// function fn(a){
// console.log(a,b,c)
// a=100;c=200;
// console.log(a,b,c)
// }
// b= fn(10)

// console.log(a,b,c)


var ary = [12,23]
function fn(ary){
console.log(ary)
ary[0]=100;
ary=[100]
ary[0]=0;
console.log(ary)
}
fn(ary)
console.log(ary)


var n=1;
function fn2(){
  var n=2;
  function f(){
    n--;
    console.log(n)
  }
  f();
  return f;
}
var x=fn2();

x();
console.log(n)