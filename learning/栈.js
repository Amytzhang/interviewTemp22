let a = {n:1}
let b = a
a.x=a={n:2}
console.log(a.x)
console.log(a)
console.log(b)



var a1='abc'+123+456;
var b1='456'-'123';
var c=100+true+21.2+null+undefined+'tencent'+[]+null+9+false;
console.log(100+true+21.1+null+undefined)
console.log(a1,b1,c)