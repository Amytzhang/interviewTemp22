/**
 * 调度器实现
 */
//存储副作用函数的桶
const bucket = new WeakMap();

let activeEffect;
let effectStack = [];

//原始数据
const data = { foo: 1, text: "hello word", flag: "false" };
//对原始数据的代理
const obj = new Proxy(data, {
  //读操作
  get(target, key) {
    track(target, key);
    //返回属性值
    return target[key];
  },
  //拦截设置操作
  set(target, key, newVal) {
    //设置属性
    target[key] = newVal;
    trigger(target, key);
  }
});
//在get拦截函数内调用track函数追踪变化
function track(target, key) {
  //没有副作用函数直接return
  if (!activeEffect) return target[key];
  //根据target从桶中取得depsMap,它也是一个Map类型
  let depsMap = bucket.get(target);
  //如果depsMap不存在，需要新建一个Map与target关联
  if (!depsMap) {
    depsMap = new Map();
    bucket.set(target, depsMap);
  }
  //根据key从depsMap中取得deps,它是一个set类型
  //里面存储着所有与当前的key相关联的副作用函数：effects
  let deps = depsMap.get(key);
  //如果deps不存在，新建一个set并关联key
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  //将激活的activeEffect添加到桶里
  deps.add(activeEffect);
  /**
   * TODO
   * deps就是一个与当前副作用函数存在联系的依赖集合
   * 将其添加到activeEffect.deps数组中
   **/
  activeEffect.deps.push(deps);
}
function trigger(target, key) {
  //根据target从桶中取得depsMap,它是key-->effects
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  //根据key取得所有副作用函数
  const effects = depsMap.get(key);
  //TODO 旧代码在引入cleanup函数后会导致死循环
  const effectsToRun = new Set(effects);
  effects &&
    effects.forEach((effectFn) => {
      /**TODO 4.6避免无限循环
       * 如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
       * **/
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });

  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
//清除
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    //deps是依赖集合
    const deps = effectFn.deps[i];
    //删除
    deps.delete(effectFn);
  }
  //重制effectFn.deps数组
  effectFn.deps.length = 0;
}
//副作用函数
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(fn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.options = options;
  effectFn.deps = [];
  effectFn();
}
effect(
  () => {
    console.log(obj.foo);
  },
  {
    scheduler(fn) {
      setTimeout(fn);
    }
  }
);

obj.foo++;
console.log("结束");
