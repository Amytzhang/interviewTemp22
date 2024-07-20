const fn = (name) => {
  console.log("我是：", name);
};

const p2 = new Proxy(fn, {
  apply(target, thisArg, argArray) {
    console.log("target,thisArg,argArray", target, thisArg, argArray);
    target.call(thisArg, ...argArray);
  }
});

p2("dff");
const obj = {
  foo: 1,
  get bar() {
    this.foo;
  }
};
const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("target, key, receiver", target, key, receiver);
    return Reflect.get(target, key, receiver);
  }
});
p.bar;

const s = new Set();
const proxyTest = new Proxy(s, {});
console.log(proxyTest.size);
