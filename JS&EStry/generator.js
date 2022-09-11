//generator是基于Iterator迭代器规范管理promise或者异步编程的；
//promise 是基于承诺模式管理异步编程
//async/await是对generator的进一步封装【语法糖】

/*
 *创建func的实例，但是和new执行不一样, func中的代码没有执行
 后续iter.next()才会把这些代码执行
 并且每一次执行next遇到一个yield就结束
     每一次返回的结果是符合迭代器规范的
     {done: true/false, value:yield后面的值或者函数返回的值}
*/
// function* func() {
//   console.log('A');
//   yield 10;
//   console.log('B');
//   yield 20;
//   console.log('C');
//   yield 30;
//   console.log('4');
//   return 40;
// }
// let iter = func([10,20,30,40]);
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

/*
  执行next传递值，可以把传递值作为上一次yield后的结果，但是yield后面跟的值是给每一次next执行后的value的
 */
function* func2() {
  console.log('生成器this:',this)//=>指向window
  let x = yield 1;
  console.log(x);
}
let itor = func2()
console.log(itor.next());//{value: 1, done: false}
                         //10
console.log(itor.next(10))//{value: undefined, done: true}

function test() {
  console.log('函数this', this) // 构造函数 this => test
}
var test1 = new test()