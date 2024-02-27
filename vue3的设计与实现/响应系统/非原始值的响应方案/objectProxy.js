/**
 * watch的实现本质就是利用effect以及options.scheduler选项
 */
//存储副作用函数的桶
const bucket = new WeakMap();
//声明一个全局变量用来存储被注册的副作用函数
let activeEffect;
//effect栈
let effectStack = [];

//原始数据
const data = { foo: 1 };
//对原始数据的代理
/**
 * todo proxy obj
 *
 */
const ITERATE_KEY = Symbol();
const p = reactive(data);
function reactive(data) {
  return new Proxy(data, {
    //读操作
    get(target, key, receiver) {
      //建立联系
      track(target, key);
      //返回属性值
      return Reflect.get(target, key, receiver);
    },
    //设置拦截
    set(target, key, newVal, receiver) {
      const oldValue = target[key];
      //todo 如果属性不存在，则说明是在添加新属性，否则是设置已有的属性
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";
      console.log("set: type--", type);
      //todo 设置属性
      const res = Reflect.set(target, key, newVal, receiver);
      //todo 合理的触发响应 排除都是NaN
      if (oldValue !== newVal && (oldValue === oldValue || newVal === newVal)) {
        //todo 将type作为第三个参数
        trigger(target, key, type);
      }

      return res;
    },
    //todo 通过has拦截函数实现对in操作符的运算
    has(target, key) {
      track(target, key);
      console.log("has");
      return Reflect.has(target, key);
    },
    //todo 重写ownKeys拦截for...in
    ownKeys(target) {
      //将副作用函数与ITERATE_KEY关联
      console.log("ownkeys:", target);
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    //todo 重写 delete
    deleteProperty(target, key) {
      console.log("deleteProperty", target, key);
      //检查属性是否属于target
      let hadKey = Object.prototype.hasOwnProperty.call(target, key);
      //使用Reflect.deletePrototype删除
      const res = Reflect.deleteProperty(target, key);
      if (hadKey && res) {
        trigger(target, key, "DELETE");
      }
      return res;
    }
  });
}
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
   * ''
   * deps就是一个与当前副作用函数存在联系的依赖集合
   * 将其添加到activeEffect.deps数组中
   **/

  activeEffect.deps.push(deps);
}

/**
 *todo
 *添加ITERATE_KEY相关联操作，否则p.bar=2不触发响应
 * params
 * type{
 * SET:改变原有key对应的value,
 * ADD:添加key-value,
 * DELETE:删除
 * }
 */
function trigger(target, key, type) {
  //根据target从桶中取得depsMap,它是key-->effects
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  //根据key取得所有副作用函数
  const effects = depsMap.get(key);
  //todo 取得与ITERATE_KEY相关联的副作用函数
  const iterateEffects = depsMap.get(ITERATE_KEY);
  //'' 旧代码在引入cleanup函数后会导致死循环
  const effectsToRun = new Set(effects);
  effects &&
    effects.forEach((effectFn) => {
      /**'' 4.6避免无限循环
       * 如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
       * **/
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  //todo 将与 ITERATE_KEY相关联的副作用函数添加到effectToRun
  //只有操作是add或者DELETE时，才触发与ITERATE_KEY相关联的副作用函数重新执行
  if (type === "ADD" || type === "DELETE") {
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }
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
    //'' 将fn执行的结果存储到res中
    const res = fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    //将res作为effectFn的返回值
    return res;
  };
  effectFn.options = options;
  effectFn.deps = [];
  //'' 只有lazy为false，才执行
  if (!options.lazy) {
    effectFn();
  }
  //'' 将副作用函数作为返回值返回
  return effectFn;
}

//watch函数接收两个参数，source是响应式数据，cb是回调函数,options存放是否立即执行等
function watch(source, cb, options = {}) {
  //定义getterFn
  let getterFn;
  if (typeof source === "function") {
    getterFn = source;
  } else {
    getterFn = () => traverse(source);
  }
  //通过lazy获取旧值
  let oldValue, newValue;
  //提取scheduler调度函数为一个独立的job函数
  const job = () => {
    //在schedule中执行effectFn得到的是新值
    newValue = effectFn2();
    //数据变化时调用回调函数cb
    cb(newValue, oldValue);
    //更新旧值
    oldValue = newValue;
  };
  //调用traverse递归地读取
  const effectFn2 = effect(() => getterFn(), {
    lazy: true,
    //在调度函数中判断flush是否为“post”如果是，将其方法哦微任务队列中执行
    scheduler: () => {
      if (options.flush === "post") {
        const p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    }
  });

  if (options.immediate) {
    //当immediate为true时立即执行job，从而触发回调执行
    job();
  } else {
    //手动调用副作用函数，拿到的就是旧值
    oldValue = effectFn2();
  }
}
function traverse(value, seen = new Set()) {
  //如果读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== "object" || value === null || seen.has(value)) return;
  //将数据添加到seen中，代表遍历的读取过了，避免循环引用引起的死循环
  seen.add(value);
  //'' 暂时不考虑数组等其他结构
  for (const k in value) {
    traverse(value[key], seen);
  }
  return value;
}

// effect(() => {
//   //"foo" in p;//触发has
//   // for (const key in p) {
//   //   console.log("--key-in-p-:", key);
//   // }
//   console.log(p.foo);
// });
// p.foo = 1;

const obj = {};
const proto = { bar: 1 };
const child = reactive(obj);
Object.setPrototypeOf(child, proto);

effect(() => {
  console.log(child.bar);
});
child.bar = 2;
