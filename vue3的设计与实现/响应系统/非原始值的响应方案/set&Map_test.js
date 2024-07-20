//Set Map
const s = new Set([1, 2]);
const p = new Proxy(s, {
  get(target, key, receiver) {
    if (key === "size") {
      // 修正this指向，指定第三个参数receiver为原始set对象target，不是代理对象从而进行修复
      return Reflect.get(target, key, target);
    }
    // return Reflect.get(target, key, receiver);
    // 将方法与原始对象绑定返回
    return target[key].bind(target);
  }
});

console.log(p.delete(1)); //true
console.log(p.size); //1
console.log(s.size); //1
