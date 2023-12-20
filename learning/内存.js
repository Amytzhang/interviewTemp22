// console.log(a,b)
// var a=12,b=12;
// function fn(){
//   console.log(a,b)
//   var a=b=13;
//   console.log(a,b)
// }
// fn();
// console.log(a,b)
/**
 * undefined undefined
undefined 12
13 13
12 13
 */


// var i=20;
// function fn(){
//   i-=2;
  
//   return function(n){
//     console.log((++i)-n)
//   }
// }
// var f=fn()
// f(1)
// f(2)
// fn()(3)
// fn()(4)
// f(5)
// console.log(i)

// var x=3,obj={x:5};
// obj.fn=(function(){
//   this.x*=++x;
//   return function(y){
//     this.x*=(++x)+y;
//     console.log(x)
//   }
// })()
// var fn=obj.fn;
// obj.fn(6)
// fn(4)
// console.log(obj.x,x)



let x=5;
const fn=function fn(x){
  return function(y){
    console.log(y+(++x))
  }
}
let f = fn(6)
f(7)
fn(8)(9)
f(10)
console.log(x)