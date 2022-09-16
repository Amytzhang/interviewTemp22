# vue面试题

## 一、vue基础

### 1. Vue的基本原理

当vue实例创建的时候，vue会遍历data中的属性，用object,defineProperty（vue3使用 proxy）将它们转换成getter/setter，并且在内部添加依赖，在属性背访问和修改时通知变化，每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。


### 2. 双向数据绑定的原理

- Vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调
- 具体过程

  需要对需要观察（observe）的数据对象进行递归遍历，给全部的属性对象（包括子属性）都加上setter和getter，给这样的对象赋值的时候，就会触发setter，就能监听到数据变化
  compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
  Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是: ①在自身实例化时往属性订阅器(dep)里面添加自己 ②自身必须有一个update()方法 ③待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
  MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。
  
  

### 3. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

- 无法拦截到数组数据和对象属性的变化，this.someObject.prop无法检测到引用类型的变化
- 通过proxy对对象进行代理，实现数据劫持，可以完美的监听到数据变化，缺点就是兼容性无法兼容ie

### 4. MVVM、MVC、MVP的区别

- （1）MVC

  MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。
  

- （2）MVVM

  MVVM 分为 Model、View、ViewModel：
  
  Model代表数据模型，数据和业务逻辑都在Model层中定义；
  View代表UI视图，负责数据的展示；
  ViewModel负责监听Model中数据的改变并且控制视图的更新，处理用户交互操作；
  Model和View并无直接关联，而是通过ViewModel来进行联系的，Model和ViewModel之间有着双向数据绑定的联系。因此当Model中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在Model中同步。
  
  这种模式实现了 Model和View的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作DOM。
  
  

- （3）MVP

  MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。
  

### 5. Computed 和 Watch 的区别

- 对于Computed

  它支持缓存，只有依赖的数据发生了变化，才会重新计算
  不支持异步，当Computed中有异步操作时，无法监听数据的变化
  computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
  如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed
  如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。
  
  

- 对于Watch

  它不支持缓存，数据变化时，它就会触发相应的操作
  支持异步监听
  监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
  当一个属性发生变化时，就需要执行相应的操作
  监听数据必须是data中声明的或者父组件传递过来的props中的数据，当发生变化时，会触发其他操作，函数有两个的参数：
  immediate：组件加载立即触发回调函数
  deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep无法监听到数组和对象内部的变化。
  当想要执行异步或者昂贵的操作以响应不断的变化时，就需要使用watch。
  

- 总结

  computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
  watch 侦听器 : 更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。
  
  

- 运用场景

  当需要进行数值计算,并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。
  当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作 ( 访问一个 API )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
  
  

### 6. Computed 和 Methods 的区别

- computed会进行缓存，并且只有他依赖的值改变才会发生渲染
- Methods 调用总会执行该函数。

### 7. slot是什么？有什么作用？原理是什么？

- slot是什么

  默认插槽：又名匿名查抄，当slot没有指定name属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。
  具名插槽：带有具体名字的插槽，也就是带有name属性的slot，一个组件可以出现多个具名插槽。
  作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。
  
  

- 有什么作用

  slot又名插槽，是Vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。
  

- 原理是什么

  当子组件vm实例化时，获取到父组件传入的slot标签的内容，存放在vm.$slot中，默认插槽为vm.$slot.default，具名插槽为vm.$slot.xxx，xxx 为插槽名，当组件执行渲染函数时候，遇到slot标签，使用$slot中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。
  

### 8. 过滤器的作用，如何实现一个过滤器

- filters不会修改数据，而是过滤数据，改变用户看到的输出
- 实现

  <li>商品价格：{{item.price | filterPrice}}</li>
  
   filters: {
      filterPrice (price) {
        return price ? ('￥' + price) : '--'
      }
    }
  
  

### 9. 如何保存页面的当前的状态

- 组件会被卸载

	- （1）将状态存储在LocalStorage / SessionStorage
	- （2）路由传值

- 组件不会被卸载

	- 单页面渲染

### 10. 常见的事件修饰符及其作用

.stop：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡；
.prevent ：等同于 JavaScript 中的 event.preventDefault() ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；
.capture ：与事件冒泡的方向相反，事件捕获由外到内；
.self ：只会触发自己范围内的事件，不包含子元素；
.once ：只会触发一次。


### 11. v-if、v-show、v-html 的原理

- v-if

  会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染
  

- v-show

  会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display
  

- v-html

  会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值
  

### 13. v-if和v-show的区别

手段：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐；
编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；
性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
使用场景：v-if适合运营条件不大可能改变；v-show适合频繁切换。



### 14. v-model 是如何实现的，语法糖实际是什么？

- （1）作用在表单元素上

  动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message设置为目标值：
  
  <input v-model="sth" />
  //  等同于
  <input 
      v-bind:value="message" 
      v-on:input="message=$event.target.value"
  >
  //$event 指代当前触发的事件对象;
  //$event.target 指代当前触发的事件对象的dom;
  //$event.target.value 就是当前dom的value值;
  //在@input方法中，value => sth;
  //在:value中,sth => value;
  

- （2）作用在组件上

  （2）作用在组件上
  
  // 父组件
  <aa-input v-model="aa"></aa-input>
  // 等价于
  <aa-input v-bind:value="aa" v-on:input="aa=$event.target.value"></aa-input>
  
  // 子组件：
  <input v-bind:value="aa" v-on:input="onmessage"></aa-input>
  
  props:{value:aa,}
  methods:{
      onmessage(e){
          $emit('input',e.target.value)
      }
  }
  

### 15. v-model 可以被用在自定义组件上吗？如果可以，如何使用？

- 在普通的中

  <input v-model="searchText">
  <input
    v-bind:value="searchText"
    v-on:input="searchText = $event.target.value"
  >
  

- 自定义组件

  <custom-input v-model="searchText">
  
  <custom-input
    v-bind:value="searchText"
    v-on:input="searchText = $event"
  ></custom-input>
  
  父组件将searchText变量传入custom-input 组件，
  使用的 prop 名为value；
  custom-input 组件向父组件传出名为input的事件，
  父组件将接收到的值赋值给searchText；
  Vue.component('custom-input', {
    props: ['value'],
    template: `
      <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    `
  })
  

### 16. data为什么是一个函数而不是对象

因为对象是引用类型，对其上面的实例进行操作的时候数据会发生改变，而vue中需要复用多个组件，为了保证每个组件之间互不干扰，所以组件的数据不能写成对象的形式，数据以函数返回值的形式定义，只有当每次复用的时候，会就返回一个新的data，每个组件都有自己的私有数据空间


### 17. 对keep-alive的理解，它是如何实现的，具体缓存的是什么？

- （1）keep-alive

  keep-alive有以下三个属性：
  
  include 字符串或正则表达式，只有名称匹配的组件会被匹配；
  exclude 字符串或正则表达式，任何名称匹配的组件都不会被缓存；
  max 数字，最多可以缓存多少组件实例。
  注意：keep-alive 包裹动态组件时，会缓存不活动的组件实例。

- 主要流程

  判断组件 name ，不在 include 或者在 exclude 中，直接返回 vnode，说明该组件不被缓存。
  获取组件实例 key ，如果有获取实例的 key，否则重新生成。
  key生成规则，cid +"∶∶"+ tag ，仅靠cid是不够的，因为相同的构造函数可以注册为不同的本地组件。
  如果缓存对象内存在，则直接从缓存对象中获取组件实例给 vnode ，不存在则添加到缓存对象中。 5.最大缓存数量，当缓存组件数量超过 max 值时，清除 keys 数组内第一个组件。

- （2）keep-alive 的实现

  const patternTypes: Array<Function> = [String, RegExp, Array] // 接收：字符串，正则，数组
  
  export default {
    name: 'keep-alive',
    abstract: true, // 抽象组件，是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
  
    props: {
      include: patternTypes, // 匹配的组件，缓存
      exclude: patternTypes, // 不去匹配的组件，不缓存
      max: [String, Number], // 缓存组件的最大实例数量, 由于缓存的是组件实例（vnode），数量过多的时候，会占用过多的内存，可以用max指定上限
    },
  
    created() {
      // 用于初始化缓存虚拟DOM数组和vnode的key
      this.cache = Object.create(null)
      this.keys = []
    },
  
    destroyed() {
      // 销毁缓存cache的组件实例
      for (const key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys)
      }
    },
  
    mounted() {
      // prune 削减精简[v.]
      // 去监控include和exclude的改变，根据最新的include和exclude的内容，来实时削减缓存的组件的内容
      this.$watch('include', (val) => {
        pruneCache(this, (name) => matches(val, name))
      })
      this.$watch('exclude', (val) => {
        pruneCache(this, (name) => !matches(val, name))
      })
    },
  }
  
  

- render函数

  会在 keep-alive 组件内部去写自己的内容，所以可以去获取默认 slot 的内容，然后根据这个去获取组件
  keep-alive 只对第一个组件有效，所以获取第一个子组件。
  和 keep-alive 搭配使用的一般有：动态组件 和router-view

- render实现

  render () {
    //
    function getFirstComponentChild (children: ?Array<VNode>): ?VNode {
      if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
    }
    }
    const slot = this.$slots.default // 获取默认插槽
    const vnode: VNode = getFirstComponentChild(slot)// 获取第一个子组件
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions // 组件参数
    if (componentOptions) { // 是否有组件参数
      // check pattern
      const name: ?string = getComponentName(componentOptions) // 获取组件名
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        // 如果不匹配当前组件的名字和include以及exclude
        // 那么直接返回组件的实例
        return vnode
      }
  
      const { cache, keys } = this
  
      // 获取这个组件的key
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
  
      if (cache[key]) {
        // LRU缓存策略执行
        vnode.componentInstance = cache[key].componentInstance // 组件初次渲染的时候componentInstance为undefined
  
        // make current key freshest
        remove(keys, key)
        keys.push(key)
        // 根据LRU缓存策略执行，将key从原来的位置移除，然后将这个key值放到最后面
      } else {
        // 在缓存列表里面没有的话，则加入，同时判断当前加入之后，是否超过了max所设定的范围，如果是，则去除
        // 使用时间间隔最长的一个
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
      // 将组件的keepAlive属性设置为true
      vnode.data.keepAlive = true // 作用：判断是否要执行组件的created、mounted生命周期函数
    }
    return vnode || (slot && slot[0])
  }

- 实现步骤

  获取 keep-alive 下第一个子组件的实例对象，通过他去获取这个组件的组件名
  通过当前组件名去匹配原来 include 和 exclude，判断当前组件是否需要缓存，不需要缓存，直接返回当前组件的实例vNode
  需要缓存，判断他当前是否在缓存数组里面：
  存在，则将他原来位置上的 key 给移除，同时将这个组件的 key 放到数组最后面（LRU）
  不存在，将组件 key 放入数组，然后判断当前 key数组是否超过 max 所设置的范围，超过，那么削减未使用时间最长的一个组件的 key
  最后将这个组件的 keepAlive 设置为 true
  
  

- （3）keep-alive 本身的创建过程和 patch 过程

  缓存渲染的时候，会根据 vnode.componentInstance（首次渲染 vnode.componentInstance 为 undefined） 和 keepAlive 属性判断不会执行组件的 created、mounted 等钩子函数，而是对缓存的组件执行 patch 过程∶ 直接把缓存的 DOM 对象直接插入到目标元素中，完成了数据更新的情况下的渲染过程。
  

- 首次渲染

  组件的首次渲染∶判断组件的 abstract 属性，才往父组件里面挂载 DOM
  // core/instance/lifecycle
  function initLifecycle (vm: Component) {
    const options = vm.$options
  
    // locate first non-abstract parent
    let parent = options.parent
    if (parent && !options.abstract) { // 判断组件的abstract属性，才往父组件里面挂载DOM
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent
      }
      parent.$children.push(vm)
    }
  
    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm
  
    vm.$children = []
    vm.$refs = {}
  
    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
  }
  判断当前 keepAlive 和 componentInstance 是否存在来判断是否要执行组件 prepatch 还是执行创建 componentlnstance
  // core/vdom/create-component
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) { // componentInstance在初次是undefined!!!
        // kept-alive components, treat as a patch
        const mountedNode: any = vnode // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode) // prepatch函数执行的是组件更新的过程
      } else {
        const child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        )
        child.$mount(hydrating ? vnode.elm : undefined, hydrating)
      }
    },
  

- （4）LRU （least recently used）缓存策略

  LRU 缓存策略∶ 从内存中找出最久未使用的数据并置换新的数据。
  
  LRU（Least rencently used）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是**"如果数据最近被访问过，那么将来被访问的几率也更高"**。 最常见的实现是使用一个链表保存缓存数据，详细算法实现如下∶
  
  新数据插入到链表头部
  每当缓存命中（即缓存数据被访问），则将数据移到链表头部
  链表满的时候，将链表尾部的数据丢弃。
  

### 18. $nextTick 原理及作用

- 本质是为了利用 JavaScript 的这些异步回调任务队列来实现 Vue 框架中自己的异步回调队列。
- 引入异步更新队列机制的原因

  如果是同步更新，则多次对一个或多个属性赋值，会频繁触发 UI/DOM 的渲染，可以减少一些无用渲染
  同时由于 VirtualDOM 的引入，每一次状态发生变化后，状态变化的信号会发送给组件，组件内部使用 VirtualDOM 进行计算得出需要更新的具体的 DOM 节点，然后对 DOM 进行更新操作，每次更新状态后的渲染过程需要更多的计算，而这种无用功也将浪费更多的性能，所以异步渲染变得更加至关重要
  
  

### 19. Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？

- 新添加的熟悉不会更新，可以使用set方法更新数据

### 20. Vue中封装的数组方法有哪些，其如何实现页面更新

- push()  pop()  shift()  unshift()  splice()  sort()  reverse()
- Vue中对这些方法的封装

  // 缓存数组原型
  const arrayProto = Array.prototype;
  // 实现 arrayMethods.__proto__ === Array.prototype
  export const arrayMethods = Object.create(arrayProto);
  // 需要进行功能拓展的方法
  const methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
  ];
  
  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function(method) {
    // 缓存原生数组方法
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator(...args) {
      // 执行并缓存原生数组功能
      const result = original.apply(this, args);
      // 响应式处理
      const ob = this.__ob__;
      let inserted;
      switch (method) {
      // push、unshift会新增索引，所以要手动observer
        case "push":
        case "unshift":
          inserted = args;
          break;
        // splice方法，如果传入了第三个参数，也会有索引加入，
  也要手动observer。
        case "splice":
          inserted = args.slice(2);
          break;
      }
      // 
      if (inserted) ob.observeArray(inserted);
  // 获取插入的值，并设置响应式监听
      // notify change
      ob.dep.notify();// 通知依赖更新
      // 返回原生数组方法的执行结果
      return result;
    });
  });
  
  

- 重写了数组的原生方法，获取到这个数组的__ob__，调用observeArray继续对新的值观察变化，通知渲染watcher，执行update。

### 21. Vue 单页应用与多页应用的区别

- 概念

  SPA单页面应用（SinglePage Web Application），指只有一个主页面的应用，一开始只需要加载一次js、css等相关资源。所有内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅仅刷新局部资源。
  MPA多页面应用 （MultiPage Application），指有多个独立页面的应用，每个页面必须重复加载js、css等相关资源。多页应用跳转，需要整页资源刷新。
  
  

- 对比图

	- 

### 22. Vue template 到 render 的过程

- vue的模版编译过程

  template -> ast -> render函数
  
  vue 在模版编译版本的码中会执行 compileToFunctions 将template转化为render函数：
  
  // 将模板编译为render函数
  const { render, staticRenderFns } =
   compileToFunctions(template,options//省略}, this)
  

- CompileToFunctions中的主要逻辑

  （1）调用parse方法将template转化为ast（抽象语法树）
  
  constast = parse(template.trim(), options)
  
  parse的目标：把tamplate转换为AST树，它是一种用 JavaScript对象的形式来描述整个模板。
  解析过程：利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的 回调函数，来达到构造AST树的目的。
  AST元素节点总共三种类型：type为1表示普通元素、2为表达式、3为纯文本
  
  （2）对静态节点做优化
  
  optimize(ast,options)
  
  这个过程主要分析出哪些是静态节点，给其打一个标记，为后续更新渲染可以直接跳过静态节点做优化
  
  深度遍历AST，查看每个子树的节点元素是否为静态节点或者静态节点根。如果为静态节点，他们生成的DOM永远不会改变，这对运行时模板更新起到了极大的优化作用。
  
  （3）生成代码
  
  const code = generate(ast, options)
  
  generate将ast抽象语法树编译成 render字符串并将静态部分放到 staticRenderFns 中，最后通过 new Function(`` render``) 生成render函数。
  
  

### 23. Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

不会立即同步执行，vue响应式是按一定策略进行dom的更新，vue更新dom的时候是异步的，只要监听到数据变化，vue将开启一个队列，并且缓冲同一事件循环发生的所有数据变化

如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环tick中，Vue 刷新队列并执行实际（已去重的）工作。



### 24. 简述 mixin、extends 的覆盖逻辑

- mixin 和 extends均是用于合并、拓展组件的，两者均通过 mergeOptions 方法实现合并。
- 区别

  mixins 接收一个混入对象的数组，其中混入对象可以像正常的实例对象一样包含实例选项，这些选项会被合并到最终的选项中。Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
  extends 主要是为了便于扩展单文件组件，接收一个对象或构造函数。
  
  

- （2）mergeOptions 的执行过程

  规范化选项（normalizeProps、normalizelnject、normalizeDirectives)
  对未合并的选项，进行判断
  if(!child._base) {
      if(child.extends) {
          parent = mergeOptions(parent, child.extends, vm)
      }
      if(child.mixins) {
          for(let i = 0, l = child.mixins.length;
               i < l; i++){
              parent = mergeOptions(parent, 
             child.mixins[i], vm)
          }
      }
  }
  
  合并处理。根据一个通用 Vue 实例所包含的选项进行分类逐一判断合并，如 props、data、 methods、watch、computed、生命周期等，将合并结果存储在新定义的 options 对象里。
  返回合并结果 options。
  
  

### 25. 描述下Vue自定义指令

### 26. 子组件可以直接改变父组件的数据吗？

不可以，这样是为了维护父子组件的单项数据流，vue倡导单项数据流，为了防止意外改变父组件的状态，会导致数据混乱


### 27. Vue是如何收集依赖的？

- const dep = new Dep()实例化一个 Dep 的实例，然后在 get 函数中通过 dep.depend() 进行依赖收集。
- （1）Dep

  class Dep {
    static target;
    subs;
  
    constructor () {
      ...
      this.subs = [];
    }
    addSub (sub) {
      this.subs.push(sub)
    }
    removeSub (sub) {
      remove(this.sub, sub)
    }
    depend () {
      if(Dep.target){
        Dep.target.addDep(this)
      }
    }
    notify () {
      const subs = this.subds.slice();
      for(let i = 0;i < subs.length; i++){
        subs[i].update()
      }
    }
  }
  
  

- （2）Watcher

  class Watcher {
    getter;
    ...
    constructor (vm, expression){
      ...
      this.getter = expression;
      this.get();
    }
    get () {
      pushTarget(this);
      value = this.getter.call(vm, vm)
      ...
      return value
    }
    addDep (dep){
          ...
      dep.addSub(this)
    }
    ...
  }
  function pushTarget (_target) {
    Dep.target = _target
  }
  
  

- （3）过程

  初 始 化 状 态 initState ， 这 中 间 便 会 通 过 defineReactive 将数据变成响应式对象，其中的 getter 部分便是用来依赖收集的。
  
  初始化最终会走 mount 过程，其中会实例化 Watcher ，进入 Watcher 中，便会执行 this.get() 方法，
  
  get 方法中的 pushTarget 实际上就是把 Dep.target 赋值为当前的 watcher。
  
  this.getter.call（vm，vm），这里的 getter 会执行 vm._render() 方法，在这个过程中便会触发数据对象的 getter。那么每个对象值的 getter 都持有一个 dep，在触发 getter 的时候会调用 dep.depend() 方法，也就会执行 Dep.target.addDep(this)。刚才 Dep.target 已经被赋值为 watcher，于是便会执行 addDep 方法，然后走到 dep.addSub() 方法，便将当前的 watcher 订阅到这个数据持有的 dep 的 subs 中，这个目的是为后续数据变化时候能通知到哪些 subs 做准备。所以在 vm._render() 过程中，会触发所有数据的 getter，这样便已经完成了一个依赖收集的过程。
  
  

### 28. 对 React 和 Vue 的理解，它们的异同

- 相同（5点）

  都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库；
  都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板；
  都使用了Virtual DOM（虚拟DOM）提高重绘性能；
  都有props的概念，允许组件间的数据传递；
  都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性。
  
  

- 不同（7点）

  1.数据流，vue双向数据绑定。react单向数据流
  2.虚拟Dom，Vue2.x开始引入"Virtual DOM"，消除了和React在这方面的差异，Vue它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。React全部子组件都会重新渲染。这可以通过 PureComponent/shouldComponentUpdate这个生命周期方法来进行控制，但Vue将此视为默认的优化。
  3.组件化，vue使用接近html的模板。recat使用jsp，recat中render函数支持闭包特性，组件import之后可以直接调用，vue
  则需要import，还需要在 components 中再声明下
  4.数据监听实现不同：vue使用的是getter/setter以及函数的劫持，能精准的知道数据变化，不需要特别优化，react使用引用的方式进行，如果不优化，会导致大量不必要的vdom重新渲染，vue强调数据可变，而react更强调数据不可变
  5.高阶组件 react可以使用HOC开拓展，vue需要使用mixins来拓展。
  6.构造工具两者都使用自己的构造组件
  React ==> Create React APP
  Vue ==> vue-cli
  7.跨平台
  React ==> React Native
  Vue ==> Weex
  

### 29. Vue的优点（7点）

轻量级框架：只关注视图层，大小很小
简单易学：中文文档，易于学习
双向数据绑定：保留的angular的特点，数据操作方面更加简单
组件化：保留了react的特点，在构建单页面的方面有独特的优势
视图：数据结构分离，不需要进行逻辑代码的修改
虚拟dom：极大的解放dom操作，蛋具体的dom还是需要实际操作
运行速度更快：相比较react，同样是虚拟dom，vue存在很大优势


### 30. assets和static的区别

- 相同点：都是存放资源文件
- 不相同点：assets打包的时候会压缩，statc不会

### 31. delete和Vue.delete删除数组的区别

- delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
- Vue.delete 直接删除了数组 改变了数组的键值。

### 32. vue如何监听对象或者数组某个属性的变化

- this.$set()

  this.$set(this.arr, 0, "OBKoro1"); // 改变数组
  this.$set(this.obj, "c", "OBKoro1"); // 改变对象
  
  

- splice()、 push()、pop()、shift()、unshift()、sort()、reverse()

### 33. 什么是 mixin ？

Mixin 使我们能够为 Vue 组件编写可插拔和可重用的功能。
如果希望在多个组件之间重用一组组件选项，例如生命周期 hook、 方法等，则可以将其编写为 mixin，并在组件中简单的引用它。
然后将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优化于组件自已的 hook。


### 34. Vue模版编译原理

- vue需要把template转化成一个JavaScript函数
- 具体过程

  解析阶段：使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST。
  优化阶段：遍历AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行diff比较时，直接跳过这一些静态节点，优化runtime的性能。
  生成阶段：将最终的AST转化为render函数字符串。
  
  

### 35. 对SSR的理解

- 服务器渲染，Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端
- SSR的优势

  更好的SEO
  首屏加载速度更快
  
  

- SSR的缺点

  开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子；
  当需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境；
  更多的服务端负载。
  
  

### 36. Vue的性能优化有哪些

- （1）编码阶段

  尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
  v-if和v-for不能连用
  如果需要使用v-for给每项元素绑定事件时使用事件代理
  SPA 页面采用keep-alive缓存组件
  在更多的情况下，使用v-if替代v-show
  key保证唯一
  使用路由懒加载、异步组件
  防抖、节流
  第三方模块按需导入
  长列表滚动到可视区域动态加载
  图片懒加载
  

- （2）SEO优化

  预渲染
  服务端渲染SSR
  
  

- （3）打包优化

  压缩代码
  Tree Shaking/Scope Hoisting
  使用cdn加载第三方模块
  多线程打包happypack
  splitChunks抽离公共文件
  sourceMap优化
  
  

- （4）用户体验

  骨架屏
  PWA
  还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。
  
  

### 37. 对 SPA 单页面的理解，它的优缺点分别是什么？

- 优点

  用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  基于上面一点，SPA 相对对服务器压力小；
  前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
  

- 缺点

  初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
  SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
  

### 38. template和jsx的有什么分别？

template和jsx的都是render的一种表现形式，不同的是：JSX相对于template而言，具有更高的灵活性，在复杂的组件中，更具有优势，而 template 虽然显得有些呆滞。但是 template 在代码结构上更符合视图与逻辑分离的习惯，更简单、更直观、更好维护。


### 39. vue初始化页面闪动问题

刚刚开始的时候viv不归vue管可以加上

[v-cloak] {
    display: none;
}
如果没有彻底解决问题，则在根元素加上
style="display: none;" :style="{display: 'block'}"


### 40. extend 有什么作用

这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 $mount 一起使用。

// 创建组件构造器
let Component = Vue.extend({
  template: '<div>test</div>'
})
// 挂载到 #app 上
new Component().$mount('#app')
// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component)
new SuperComponent({
    created() {
        console.log(1)
    }
})
new SuperComponent().$mount('#app')


### 41. mixin 和 mixins 区别

- mixin 用于全局混入，会影响到每个组件实例

  Vue.mixin({
      beforeCreate() {
          // ...逻辑
          // 这种方式会影响到每个组件的 beforeCreate 钩子函数
      }
  })
  
  

- mixins 应该是最常使用的扩展组件的方式

### 42. MVVM的优缺点

- 优点（3点）

  1.分离视图：降低代码耦合性
  2.提高可测试性：viewModel存在可以帮助开发更好测试
  3.自动更新dom
  

- 缺点（3点）

  1.bug很难调试，你无法发现是那个区域出错view或者model
  2.一个模块中model数据量多的时候会影响内存
  3.大型的图形应用：viewModel的维护成本会比较高
  

### 43. Vue.use的实现原理

- 源码

  // src/core/global-api/use.js
  import { toArray } from '../util/index'
  
  export function initUse (Vue: GlobalAPI) {
    Vue.use = function (plugin: Function | Object) {
      const installedPlugins = (this._installedPlugins
   || (this._installedPlugins = []))
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }
  
      // additional parameters
      const args = toArray(arguments, 1)
      args.unshift(this)
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args)
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args)
      }
      installedPlugins.push(plugin)
      return this
    }
  }
  
  

- 检测过程

  Vue.use()，传入一个function或object，首先会检查这个插件是否已经存在，如果存在则直接返回
  
  toArray方法，将类数组转化成数组，1是指从第一个参数开始，比如
  
  Vue.use(globalPlugin, 1, 2, 3)
  // args = [1,2,3]
  
  检查入参plugin的install属性是否为function，如果是，则通过apply调用plugin.install，此时plugin为object
  
  如果不是，则检查入参plugin是否为function，如果是，则通过apply调用plugin
  
  最后把入参plugin存到数组installedPlugins，用于检查插件是否存在
  
  

- 举例子

  // globalPlugin.js
  // 以下为我随手写的假代码，不一定能运行，但思路是对的
  import ElementUI from 'element-ui'
  
  export default (app) => {
      useElement(app)
      useConfig(app)
      useToast(app)
  }
  
  /** 对象写法
  export default {
  	install(app): {
          useElement(app)
          useConfig(app)
          useToast(app)
  	}
  }
  */
  
  // 注册ElementUI
  const useElement = (app) => {
      app.use(ElementUI)
  }
  
  // 注册全局配置
  const useConfig = (app) => {
      app.config.name = 'xxx'
      app.config.age = 18
  }
  
  // 注册自己写的toast方法
  const useToast = (app) => {
      app.$toast = () => {
          // 自己写的toast方法
      }
  }
  
  // main.js
  import Vue from 'vue'
  import globalPlugin from './globalPlugin'	
  // 就是上面这个js
  
  const vm = new Vue()
  vm.use(globalPlugin)	// 执行自定义插件
  
  根据以上demo，可以得出，通过use
  
  注册全局配置属性
  注册全局引用方法
  
  

## 二、生命周期

### 1. 说一下Vue的生命周期

beforeCreate（创建前）：数据观测和初始化事件还未开始、event/watcher 都还没有被设置，data、computed、watch、methods上的方法和数据无法访问。
created（创建后）：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，节点还未挂载到 DOM，不能访问到 $el 属性。
beforeMount（挂载前）：在挂载开始之前被调用，相关的render函数首次调用。完成：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。
mounted（挂载后）：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互。
beforeUpdate（更新前）：响应式数据更新时调用，此时虽然响应式数据更新了，
真实 DOM 还没有被渲染。
updated（更新后） ：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
beforeDestroy（销毁前）：实例销毁之前调用。这一步，实例仍然完全可用，this 仍能获取到实例。
destroyed（销毁后）：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。
另外还有 keep-alive 独有的生命周期，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 activated 钩子函数。



### 2. Vue 子组件和父组件执行顺序

- 加载渲染过程：

  1.父组件 beforeCreate
  2.父组件 created
  3.父组件 beforeMount
  4.子组件 beforeCreate
  5.子组件 created
  6.子组件 beforeMount
  7.子组件 mounted
  8.父组件 mounted
  
  

- 更新过程：

  \1. 父组件 beforeUpdate
  
  2.子组件 beforeUpdate
  
  3.子组件 updated
  
  4.父组件 updated
  
  

- 销毁过程：

  1. 父组件 beforeDestroy
  
  2.子组件 beforeDestroy
  
  3.子组件 destroyed
  
  4.父组件 destoryed
  
  

### 3. created和mounted的区别

- created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

### 4. 一般在哪个生命周期请求异步数据

- created、beforeMount、mounted 中进行调用
- 推荐在 created 钩子函数中调用异步请求

  能更快获取到服务端数据，减少页面加载时间，用户体验更好；
  SSR不支持 beforeMount 、mounted 钩子函数，放在 created 中有助于一致性。
  
  

### 5. keep-alive 中的生命周期哪些

keep-alive是 Vue 提供的一个内置组件，用来对组件进行缓存——在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

如果为一个组件包裹了 keep-alive，那么它会多出两个生命周期：deactivated、activated。同时，beforeDestroy 和 destroyed 就不会再被触发了，因为组件不会被真正销毁。

当组件被换掉时，会被缓存到内存中、触发 deactivated 生命周期；当组件被切回来时，再去缓存里找这个组件、触发 activated钩子函数。



## 三、组件通信

### 组件通信有哪些

- （1） props / $emit

	- 父组件

	  // 父组件
	  <template>
	    <div class="section">
	      <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
	      <p>{{currentIndex}}</p>
	    </div>
	  </template>
	  
	  <script>
	  import comArticle from './test/article.vue'
	  export default {
	    name: 'comArticle',
	    components: { comArticle },
	    data() {
	      return {
	        currentIndex: -1,
	        articleList: ['红楼梦', '西游记', '三国演义']
	      }
	    },
	    methods: {
	      onEmitIndex(idx) {
	        this.currentIndex = idx
	      }
	    }
	  }
	  </script>
	  

	- 子组件

	  //子组件
	  <template>
	    <div>
	      <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
	    </div>
	  </template>
	  
	  <script>
	  export default {
	    props: ['articles'],
	    methods: {
	      emitIndex(index) {
	        this.$emit('onEmitIndex', index) // 触发父组件的方法，并传递参数index
	      }
	    }
	  }
	  </script>
	  

- （2）eventBus事件总线（$emit / $on）

	- （1）创建事件中心管理组件之间的通信

	  // event-bus.js
	  
	  import Vue from 'vue'
	  export const EventBus = new Vue()
	  

	- （2）发送事件

	  假设有两个兄弟组件firstCom和secondCom：
	  
	  
	  <template> <div> <first-com></first-com>
	   <second-com></second-com>
	   </div> </template> 
	  <script> import firstCom from './firstCom.vue' 
	  import secondCom from './secondCom.vue' 
	  export default { components: { firstCom, secondCom } } 
	  </script> 
	  在firstCom组件中发送事件：
	  
	  
	  <template> <div> 
	  <button @click="add">加法</button> </div> 
	  </template> <script> 
	  import {EventBus} from './event-bus.js' // 引入事件中心
	   export default { data(){ return{ num:0 } }, 
	  methods:{ add(){ EventBus.$emit('addition', 
	  { num:this.num++ }) } } } </script>
	  

	- （3）接收事件

	  <template>
	    <div>求和: {{count}}</div>
	  </template>
	  
	  <script>
	  import { EventBus } from './event-bus.js'
	  export default {
	    data() {
	      return {
	        count: 0
	      }
	    },
	    mounted() {
	      EventBus.$on('addition', param => {
	        this.count = this.count + param.num;
	      })
	    }
	  }
	  </script>
	  

- （3）依赖注入（project / inject）

	- 父组件

	  provide() {
	   return {
	      num: this.num
	    };
	  }
	  

	- 子组件

	  inject: ['num']
	  

	- 另一种写法

	  provide() {
	   return {
	      app: this
	    };
	  }
	  data() {
	   return {
	      num: 1
	    };
	  }
	  
	  inject: ['app']
	  console.log(this.app.num)
	  

- （4）ref / $refs

	- 子组件

	  export default {
	    data () {
	      return {
	        name: 'JavaScript'
	      }
	    },
	    methods: {
	      sayHello () {
	        console.log('hello')
	      }
	    }
	  }
	  

	- 父组件

	  <template>
	    <child ref="child"></component-a>
	  </template>
	  <script>
	    import child from './child.vue'
	    export default {
	      components: { child },
	      mounted () {
	        console.log(this.$refs.child.name);  // JavaScript
	        this.$refs.child.sayHello();  // hello
	      }
	    }
	  </script>
	  

- （5）$parent / $children

	- 子组件

	  <template>
	    <div>
	      <span>{{message}}</span>
	      <p>获取父组件的值为:  {{parentVal}}</p>
	    </div>
	  </template>
	  
	  <script>
	  export default {
	    data() {
	      return {
	        message: 'Vue'
	      }
	    },
	    computed:{
	      parentVal(){
	        return this.$parent.msg;
	      }
	    }
	  }
	  </script>
	  

	- 父组件

	  // 父组件中
	  <template>
	    <div class="hello_world">
	      <div>{{msg}}</div>
	      <child></child>
	      <button @click="change">点击改变子组件值</button>
	    </div>
	  </template>
	  
	  <script>
	  import child from './child.vue'
	  export default {
	    components: { child },
	    data() {
	      return {
	        msg: 'Welcome'
	      }
	    },
	    methods: {
	      change() {
	        // 获取到子组件
	        this.$children[0].message = 'JavaScript'
	      }
	    }
	  }
	  </script>
	  

- （6）$attrs / $listeners

	- A组件（APP.vue）

	  <template>
	      <div id="app">
	          //此处监听了两个事件，可以在B组件或者C组件中直接触发 
	          <child1 :p-child1="child1" :p-child2="child2" @test1="onTest1" @test2="onTest2"></child1>
	      </div>
	  </template>
	  <script>
	  import Child1 from './Child1.vue';
	  export default {
	      components: { Child1 },
	      methods: {
	          onTest1() {
	              console.log('test1 running');
	          },
	          onTest2() {
	              console.log('test2 running');
	          }
	      }
	  };
	  </script>
	  

	- B组件（Child1.vue）

	  <template>
	      <div class="child-1">
	          <p>props: {{pChild1}}</p>
	          <p>$attrs: {{$attrs}}</p>
	          <child2 v-bind="$attrs" v-on="$listeners"></child2>
	      </div>
	  </template>
	  <script>
	  import Child2 from './Child2.vue';
	  export default {
	      props: ['pChild1'],
	      components: { Child2 },
	      inheritAttrs: false,
	      mounted() {
	          this.$emit('test1'); // 触发APP.vue中的test1方法
	      }
	  };
	  </script>
	  

	- C 组件 (Child2.vue)

	  <template>
	      <div class="child-2">
	          <p>props: {{pChild2}}</p>
	          <p>$attrs: {{$attrs}}</p>
	      </div>
	  </template>
	  <script>
	  export default {
	      props: ['pChild2'],
	      inheritAttrs: false,
	      mounted() {
	          this.$emit('test2');// 触发APP.vue中的test2方法
	      }
	  };
	  </script>
	  

- （1）父子组件间通信

  子组件通过 props 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。
  通过 ref 属性给子组件设置一个名字。父组件通过 $refs 组件名来获得子组件，子组件通过 $parent 获得父组件，这样也可以实现通信。
  使用 provide/inject，在父组件中通过 provide提供变量，在子组件中通过 inject 来将变量注入到组件中。不论子组件有多深，只要调用了 inject 那么就可以注入 provide中的数据。
  
  

- （2）兄弟组件间通信

  使用 eventBus 的方法，它的本质是通过创建一个空的 Vue 实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。
  通过 $parent/$refs 来获取到兄弟组件，也可以进行通信。
  
  

- （3）任意组件之间

  使用 eventBus ，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。
  或者vuex
  
  
  

## 四、路由

### 1. Vue-Router 的懒加载如何实现

- 非懒加载

  import List from '@/components/list.vue'
  const router = new VueRouter({
    routes: [
      { path: '/list', component: List }
    ]
  })
  

- （1）方案一(常用)：使用箭头函数+import动态加载

  const List = () => import('@/components/list.vue')
  const router = new VueRouter({
    routes: [
      { path: '/list', component: List }
    ]
  })
  

- （2）方案二：使用箭头函数+require动态加载

  const router = new Router({
    routes: [
     {
       path: '/list',
       component: resolve => require(['@/components/list'], resolve)
     }
    ]
  })
  

- （3）方案三：使用webpack的require.ensure技术，也可以实现按需加载。 这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。

  // r就是resolve
  const List = r => require.ensure([], () => r(require('@/components/list')), 'list');
  // 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
  const router = new Router({
    routes: [
    {
      path: '/list',
      component: List,
      name: 'list'
    }
   ]
  }))
  

### 2. 路由的hash和history模式的区别

- 1. hash模式

  hash模式是开发中默认的模式，它的URL带着一个#
  hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响。
  原理： hash模式的主要原理就是onhashchange()事件：
  
  window.onhashchange = function(event){
      console.log(event.oldURL, event.newURL);
      let hash = location.hash.slice(1);
  }
  

- 2. history模式

  history模式的URL中没有#，它使用的是传统的路由分发模式，即用户在输入一个URL时，服务器会接收这个请求，并解析这个URL，然后做出相应的逻辑处理。
  
  当使用history模式时，URL就像这样：http://abc.com/user/id。相比hash模式更加好看。但是，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。
  
  虽然history模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出404来。
  
  const router = new VueRouter({
    mode: 'history',
    routes: [...]
  })
  

- 3. 两种模式对比

  pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL；
  pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
  pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；
  pushState() 可额外设置 title 属性供后续使用。
  hash模式下，仅hash符号之前的url会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回404错误；history模式下，前端的url必须和实际向后端发起请求的url一致，如果没有对用的路由处理，将返回404错误。
  
  

### 3. 如何获取页面的hash变化

- （1）监听$route的变化

  // 监听,当路由发生变化的时候执行
  watch: {
    $route: {
      handler: function(val, oldVal){
        console.log(val);
      },
      // 深度观察监听
      deep: true
    }
  },
  

- （2）window.location.hash读取#值

### 4. $route 和$router 的区别

$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数
$router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。



### 5. 如何定义动态路由？如何获取传过来的动态参数？

- （1）param方式

  配置路由格式：/router/:id
  传递的方式：在path后面跟上对应的值
  传递后形成的路径：/router/123
  
  

	- 1）路由定义

	  //在APP.vue中
	  <router-link :to="'/user/'+userId" replace>用户</router-link>    
	  
	  //在index.js
	  {
	     path: '/user/:userid',
	     component: User,
	  },
	  

	- 2）路由跳转

	  // 方法1：
	  <router-link :to="{ name: 'users', params: { uname: wade }}">按钮</router-link
	  
	  // 方法2：
	  this.$router.push({name:'users',params:{uname:wade}})
	  
	  // 方法3：
	  this.$router.push('/user/' + wade)
	  

	- 3）参数获取

	  通过 $route.params.userid 获取传递的值
	  

- （2）query方式

  
  配置路由格式：/router，也就是普通配置
  传递的方式：对象中使用query的key作为传递方式
  传递后形成的路径：/route?id=123
  

	- 1）路由定义

	  //方式1：直接在router-link 标签上以对象的形式
	  <router-link :to="{path:'/profile',query:{name:'why',age:28,height:188}}">档案</router-link>
	  
	  // 方式2：写成按钮以点击事件形式
	  <button @click='profileClick'>我的</button>    
	  
	  profileClick(){
	    this.$router.push({
	      path: "/profile",
	      query: {
	          name: "kobi",
	          age: "28",
	          height: 198
	      }
	    });
	  }
	  

	- 2）跳转方法

	  // 方法1：
	  <router-link :to="{ name: 'users', query: { uname: james }}">按钮</router-link>
	  
	  // 方法2：
	  this.$router.push({ name: 'users', query:{ uname:james }})
	  
	  // 方法3：
	  <router-link :to="{ path: '/user', query: { uname:james }}">按钮</router-link>
	  
	  // 方法4：
	  this.$router.push({ path: '/user', query:{ uname:james }})
	  
	  // 方法5：
	  this.$router.push('/user?uname=' + jsmes)
	  

	- 3）获取参数

	  通过$route.query 获取传递的值
	  

### 6. Vue-router 路由钩子在生命周期的体现

- 一、Vue-Router导航守卫

	- 全局路由钩子

	  router.beforeEach 全局前置守卫 进入路由之前
	  router.beforeResolve 全局解析守卫（2.5.0+）在 beforeRouteEnter 调用之后调用
	  router.afterEach 全局后置钩子 进入路由之后
	  
	  

	- beforeEach（判断是否登录了，没登录就跳转到登录页）

	  router.beforeEach((to, from, next) => {  
	      let ifInfo = Vue.prototype.$common.getSession('userData');  // 判断是否登录的存储信息
	      if (!ifInfo) { 
	          // sessionStorage里没有储存user信息    
	          if (to.path == '/') { 
	              //如果是登录页面路径，就直接next()      
	              next();    
	          } else { 
	              //不然就跳转到登录      
	              Message.warning("请重新登录！");     
	              window.location.href = Vue.prototype.$loginUrl;    
	          }  
	      } else {    
	          return next();  
	      }
	  })
	  

	- afterEach （跳转之后滚动条回到顶部）

	  router.afterEach((to, from) => {  
	      // 跳转之后滚动条回到顶部  
	      window.scrollTo(0,0);
	  });
	  

	- beforeEnter

	  如果不想全局配置守卫的话，可以为某些路由单独配置守卫，有三个参数∶ to、from、next
	  
	  
	  export default [ 
	  { path: '/', name: 'login', component: login, beforeEnter: 
	  (to, from, next) => 
	  { console.log('即将进入登录页面') next() } } ]
	  

	- 组件内钩子

	  beforeRouteUpdate、beforeRouteEnter、beforeRouteLeave
	  
	  这三个钩子都有三个参数∶to、from、next
	  
	  beforeRouteEnter∶ 进入组件前触发
	  beforeRouteUpdate∶ 当前地址改变并且改组件被复用时触发，举例来说，带有动态参数的路径foo/∶id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的foa组件，这个钩子在这种情况下就会被调用
	  beforeRouteLeave∶ 离开组件被调用
	  

- 二、Vue路由钩子在生命周期函数的体现

	- 1.完整的路由导航解析流程（不包括其他生命周期）

	  触发进入其他路由。
	  调用要离开路由的组件守卫beforeRouteLeave
	  调用局前置守卫∶ beforeEach
	  在重用的组件里调用 beforeRouteUpdate
	  调用路由独享守卫 beforeEnter。
	  解析异步路由组件。
	  在将要进入的路由组件中调用 beforeRouteEnter
	  调用全局解析守卫 beforeResolve
	  导航被确认。
	  调用全局后置钩子的 afterEach 钩子。
	  触发DOM更新（mounted）。
	  执行beforeRouteEnter 守卫中传给 next 的回调函数
	  
	  

	- 触发钩子的完整顺序

	  beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。
	  beforeEach：路由全局前置守卫，可用于登录验证、全局路由loading等。
	  beforeEnter：路由独享守卫
	  beforeRouteEnter：路由组件的组件进入路由前钩子。
	  beforeResolve：路由全局解析守卫
	  afterEach：路由全局后置钩子
	  beforeCreate：组件生命周期，不能访问tAis。
	  created;组件生命周期，可以访问tAis，不能访问dom。
	  beforeMount：组件生命周期
	  deactivated：离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
	  mounted：访问/操作dom。
	  activated：进入缓存组件，进入a的嵌套子组件（如果有的话）。
	  执行beforeRouteEnter回调函数next。
	  
	  

	- 导航行为被触发到导航完成的整个过程

	  导航行为被触发，此时导航未被确认。
	  在失活的组件里调用离开守卫 beforeRouteLeave。
	  调用全局的 beforeEach守卫。
	  在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
	  在路由配置里调用 beforeEnteY。
	  解析异步路由组件（如果有）。
	  在被激活的组件里调用 beforeRouteEnter。
	  调用全局 beforeResolve 守卫(2.5+)标示解析阶段完成。
	  导航被确认。
	  调用全局的 afterEach 钩子。
	  非重用组件，开始组件实例的生命周期：beforeCreate&created、beforeMount&mounted
	  触发 DOM 更新。
	  用创建好的实例调用 beforeRouteEnter守卫中传给 next 的回调函数。
	  导航完成
	  
	  

### 7. Vue-router跳转和location.href有什么区别

使用 location.href= /url 来跳转，简单方便，但是刷新了页面；
使用 history.pushState( /url ) ，无刷新页面，静态跳转；
引进 router ，然后使用 router.push( /url ) 来跳转，使用了 diff 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 history.pushState() 没什么差别的，因为vue-router就是用了 history.pushState() ，尤其是在history模式下。


### 8. params和query的区别

用法：query要用path来引入，params要用name来引入，接收参数都是类似的，分别是 this.$route.query.name 和 this.$route.params.name 。

url地址显示：query更加类似于ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

注意：query刷新不会丢失query里面的数据 params刷新会丢失 params里面的数据。



### 9. Vue-router 导航守卫有哪些

全局前置/钩子：beforeEach、beforeResolve、afterEach
路由独享的守卫：beforeEnter
组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave



### 10. 对前端路由的理解

前端路由可以帮助我们在仅有一个页面的情况下，“记住”用户当前走到了哪一步——为 SPA 中的各个视图匹配一个唯一标识。。这意味着用户前进、后退触发的新内容，都会映射到不同的 URL 上去。此时即便他刷新页面，因为当前的 URL 可以标识出他所处的位置，因此内容也不会丢失。


## 五、Vuex

### 1. Vuex 的原理

每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。


Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样可以方便地跟踪每一个状态的变化。


- （1）核心流程中的主要功能：

  Vue Components 是 vue 组件，组件会触发（dispatch）一些事件或动作，也就是图中的 Actions;
  在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex 中，数据是集中管理的，不能直接去更改数据，所以会把这个动作提交（Commit）到 Mutations 中;
  然后 Mutations 就去改变（Mutate）State 中的数据;
  当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue Components 中去，组件展示更新后的数据，完成一个流程。
  
  

- （2）各模块在核心流程中的主要功能：

  Vue Components∶ Vue组件.HTML上,负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
  dispatch∶操作行为触发方法,是唯一能执行action的方法。
  actions∶ 操作行为处理模块。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
  commit∶状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
  mutations∶状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
  state∶ 页面状态管理容器对象。集中存储Vuecomponents中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
  getters∶ state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。
  
  

### 2. Vuex中action和mutation的区别

Mutation专注于修改State，理论上是修改State的唯一途径；Action业务代码、异步请求。
Mutation：必须同步执行；Action：可以异步，但不能直接操作State。
在视图更新时，先触发actions，actions再触发mutation
mutation的参数是state，它包含store中的数据；store的参数是context，它是 state 的父级，包含 state、getters





### 3. Vuex 和 localStorage 的区别

1.vuex存储在内存中，localstorage存放在本地，只能存储字符串数据
2.vuex是专门为vue.js应用的状态管理模式，localstorage是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用 。Vuex能做到数据的响应式，localstorage不能
3.vuex刷新页面可能会丢失，localstorage不会。


### 4. Redux 和 Vuex 有什么区别，它们的共同思想

- （1）Redux 和 Vuex区别

  Vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值即可
  Vuex由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
  Vuex数据流的顺序是∶View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变（vue检测到数据变化自动渲染）
  
  

- （2）共同思想

  单—的数据源
  变化可以预测
  本质上：redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案;
  
  形式上：vuex借鉴了redux，将store作为全局的数据中心，进行mode管理;
  
  
  

### 5. 为什么要用 Vuex 或者 Redux

跨组件，便于维护


### 6. Vuex有哪几种属性？

state => 基本数据(数据源存放地)
getters => 从基本数据派生出来的数据
mutations => 提交更改数据的方法，同步
actions => 像一个装饰器，包裹mutations,使之可以异步。
modules => 模块化Vuex



### 7. Vuex和单纯的全局对象有什么区别？

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。



### 8. 为什么 Vuex 的 mutation 中不能做异步操作？

Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。
每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。



### 9. Vuex的严格模式是什么,有什么作用，如何开启？

在Vuex.Store 构造器选项中开启,如下
const store = new Vuex.Store({ strict:true, })


### 10. 如何在组件中批量使用Vuex的getter属性

使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中

import {mapGetters} from 'vuex' 
export default{ 
computed:{ ...mapGetters(['total','discountTotal']) } }


### 11. 如何在组件中重复使用Vuex的mutation

使用mapMutations辅助函数,在组件中这么使用


import { mapMutations } from 'vuex' 
methods:{ ...mapMutations({ setNumber:'SET_NUMBER', }) }


## 六、Vue 3.0

### 1. Vue3.0有什么更新

- （1）监测机制的改变

  3.0 将带来基于代理 Proxy的 observer 实现，提供全语言覆盖的反应性跟踪。
  消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：
  
  

- （2）只能监测属性，不能监测对象

  检测属性的添加和删除；
  检测数组索引和长度的变更；
  支持 Map、Set、WeakMap 和 WeakSet。
  
  

- （3）模板

  作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。
  同时，对于 render 函数的方面，vue3.0 也会进行一系列更改来方便习惯直接使用 api 来生成 vdom 。
  
  

- （4）对象式的组件声明方式

  vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。
  3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易
  
  

- （5）其它方面的更改

  支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
  支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
  基于 tree shaking 优化，提供了更多的内置功能。
  
  

### 2. defineProperty和proxy的区别

- Object.defineProperty

  添加或删除对象的属性时，Vue 检测不到。因为添加或删除的对象没有在初始化进行响应式处理，只能通过$set 来调用Object.defineProperty()处理。
  无法监控到数组下标和长度的变化。
  
  

- Proxy

  用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。相对于Object.defineProperty()，其有以下特点：
  Proxy 直接代理整个对象而非对象属性，这样只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性。
  Proxy 可以监听数组的变化。
  

### 3. Vue3.0 为什么要用 proxy？

在 Vue2 中， 0bject.defineProperty 会改变原始数据，而 Proxy 是创建对象的虚拟表示，并提供 set 、get 和 deleteProperty 等处理器，这些处理器可在访问或修改原始对象上的属性时进行拦截，有以下特点∶
不需用使用 Vue.$set 或 Vue.$delete 触发响应式。
全方位的数组变化检测，消除了Vue2 无效的边界情况。
支持 Map，Set，WeakMap 和 WeakSet。
Proxy 和 Vue2的实现响应式原理相同，实现方式大同小异∶
get 收集依赖
Set、delete 等触发依赖
对于集合类型，就是对集合对象的方法做一层包装：原方法执行后执行依赖相关的收集或触发逻辑。


### 4. Vue 3.0 中的 Vue Composition API？

在 Vue2 中，代码是 Options API 风格的，也就是通过填充 (option) data、methods、computed 等属性来完成一个 Vue 组件。这种风格使得 Vue 相对于 React极为容易上手，同时也造成了几个问题：

由于 Options API 不够灵活的开发方式，使得Vue开发缺乏优雅的方法来在组件间共用代码。
Vue 组件过于依赖this上下文，Vue 背后的一些小技巧使得 Vue 组件的开发看起来与 JavaScript 的开发原则相悖，比如在methods 中的this竟然指向组件实例来不指向methods所在的对象。这也使得 TypeScript 在Vue2 中很不好用。
于是在 Vue3 中，舍弃了 Options API，转而投向 Composition API。Composition API本质上是将 Options API 背后的机制暴露给用户直接使用，这样用户就拥有了更多的灵活性，也使得 Vue3 更适合于 TypeScript 结合。



### 5. Composition API与React Hook很像，区别是什么

- React Hook

  React Hook是根据useState调用的顺序来确定下一次重渲染时的state是来源于哪个useState，所以出现了以下限制
  不能在循环、条件、嵌套函数中调用Hook
  必须确保总是在你的React函数的顶层调用Hook
  useEffect、useMemo等函数必须手动确定依赖关系
  

- Composition API

  Composition API是基于Vue的响应式系统实现的，与React Hook的相比
  声明在setup函数内，一次组件实例化只调用一次setup，而React Hook每次重渲染都需要调用Hook，使得React的GC比Vue更有压力，性能也相对于Vue来说也较慢
  Compositon API的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用
  响应式系统自动实现了依赖收集，进而组件的部分的性能优化由Vue内部自己完成，而React Hook需要手动传入依赖，而且必须必须保证依赖的顺序，让useEffect、useMemo等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降。
  

### vue3为什么比vue2快

- 1. diff方法优化

  vue2.0中的虚拟dom是进行全量的对比
  vue3.0新增了静态标记(PatchFlag)，在于上次虚拟节点进行对比的时候，只对比带有patch flag的节点。并且可以通过flag的信息得知当前节点要对比的具体内容。
  

- 2.静态提升

  vue2.0无论元素是否参与更新，每次都会重新创建，然后再渲染
  vue3.0对于不参与更新的元素，会做静态提升，只会被新创建一次，在渲染时直接复用即可
  

- 3.事件侦听器缓存

  默认情况下，onClick会被视为动态绑定，所以每次都会去追踪它的变化。但是因为事件绑定的函数是同一个函数（同一个方法），所以没有追踪变化，直接缓存起来复用即可。
  

- 4. ssr优化

  就是将页面在服务端渲染完成后在客户端直接显示。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。
  

## 七、虚拟DOM

### 1. 对虚拟DOM的理解？

虚拟DOM就是开发者不需要直接操作dom,可以降低代码开发的难度提高开发效率，手动操作DOM无法保证程序性能



### 2. 虚拟DOM的解析过程

首先对将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。
当页面的状态发生改变，需要对页面的 DOM 的结构进行调整的时候，首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。
最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。



### 3. 为什么要用虚拟DOM

保证性能下限
跨平台


### 4. 虚拟DOM真的比真实DOM性能好吗

首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。
正如它能保证性能下限，在真实DOM操作的时候进行针对性的优化时，还是更快的。



### 5. DIFF算法的原理

首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换
如果为相同节点，进行patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)
比较如果都有子节点，则进行updateChildren，判断如何对这些新老节点的子节点进行操作（diff核心）。
匹配时，找到相同的子节点，递归比较子节点
在diff中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从O(n3)降低值O(n)，相对于只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。


### 6. Vue中key的作用

第一种情况是 v-if 中使用 key。这个时候 key 的作用是用来标识一个独立的元素。
第二种情况是 v-for 中使用 key。这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。


### 7. 为什么不建议用index作为key?

使用index 作为 key和没写基本上没区别，因为不管数组的顺序怎么颠倒，index 都是 0, 1, 2...这样排列，导致 Vue 会复用错误的旧子节点，做很多额外的工作。


## 八、vue权限管理

### 1.接口访问权限控制

1.在用户登录时服务器需要给前台返回一个Token,然后在以后前台每次调用接口时都需要带上这个Token
2.axios可以在拦截器中直接将Token塞入config.headers.Authorizatio


### 2.页面权限控制

（1）初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验
（2）1.登录、404、维护等页面写到默认的路由中，将其他需要全权限的页面写到一个文件或者写到变量中
2.后台拿到权限数据之后理由返回的数据和异步路由表匹配将匹配成功的路由结果使用addRoutes和静态路由表结合起来


- 方案1

### 3.菜单权限

（1）菜单与路由分离，菜单由后端返回
name字段都不为空，需要根据此字段与后端返回菜单做关联，后端返回的菜单信息中必须要有name对应的字段，并且做唯一性校验
全局路由守卫里做判断
（2）菜单和路由都由后端返回


