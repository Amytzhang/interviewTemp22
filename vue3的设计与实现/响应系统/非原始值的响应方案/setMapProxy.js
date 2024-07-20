//存储副作用函数的桶
const bucket = new WeakMap();
//声明一个全局变量用来存储被注册的副作用函数
let activeEffect;
//effect栈
let effectStack = [];

const reactiveMap = new Map();
function reactive(obj) {
  const proxy = createReactive(obj);
  const existionProxy = reactiveMap.get(obj);
  if (existionProxy) {
    return existionProxy;
  }
  reactiveMap.set(obj, proxy);
  return proxy;
}
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (key === "size") {
        return Reflect.get(target, key, target);
      }
      return target[key].bind(target);
    }
  });
}
const proxy1 = reactive(new Set([1, 2]));
console.log(proxy1);
proxy1.delete(1);
console.log(proxy1);
