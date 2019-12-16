## 流程

+ core/instance/index.js
  > 通过 `instance` 对 `Vue.prototype` 进行属性和方法的挂载。

  ````javascript
  initMixin(Vue)
  stateMixin(Vue)
  eventsMixin(Vue)
  lifecycleMixin(Vue)
  renderMixin(Vue)
  ````
  ````javascript
  //initMixin
  Vue.prototype._init = function (options?: Object) {}
  ````
  ````javascript
  // stateMixin
  // Object.defineProperty(Vue.prototype, '$data', dataDef)
  // 这里$data只提供了get方法，set方法再非生产环境时会给予警告
  Vue.prototype.$data = undefined;
  // Object.defineProperty(Vue.prototype, '$props', propsDef)
  // 这里$props只提供了get方法，set方法再非生产环境时会给予警告
  Vue.prototype.$props = undefined;

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function() {}
  ````

  ````javascript
  // eventsMixin
  Vue.prototype.$on = function() {}
  Vue.prototype.$once = function() {}
  Vue.prototype.$off = function() {}
  Vue.prototype.$emit = function() {}
  ````

  ````javascript
  // lifecycleMixin
  Vue.prototype._update = function() {}
  Vue.prototype.$forceUpdate = function () {}
  Vue.prototype.$destroy = function () {}
  ````

  ````javascript
  // renderMixin
  // installRenderHelpers 
  // 主要是对渲染函数 _render 初始化 , 和对渲染函数里面需要用到的工具函数初始化 
  Vue.prototype._o = markOnce
  Vue.prototype._n = toNumber
  Vue.prototype._s = toString
  Vue.prototype._l = renderList
  Vue.prototype._t = renderSlot
  Vue.prototype._q = looseEqual
  Vue.prototype._i = looseIndexOf
  Vue.prototype._m = renderStatic
  Vue.prototype._f = resolveFilter
  Vue.prototype._k = checkKeyCodes
  Vue.prototype._b = bindObjectProps
  Vue.prototype._v = createTextVNode
  Vue.prototype._e = createEmptyVNode
  Vue.prototype._u = resolveScopedSlots
  Vue.prototype._g = bindObjectListeners

  // 
  Vue.prototype.$nextTick = function() {}
  Vue.prototype._render = function() {
    ...
    const { render, _parentVnode } = vm.$options
    render.call(vm._renderProxy, vm.$createElement)
    ...
  }

  // render 函数 
  (function anonymous(
  ) {
  with(this){return _c('div',{attrs:{"id":"app"}},[_v("\n    "+_s(fullMsg)+"\n  ")])}
  })

  // 还有一个 vm._c 是在 vm._init 中的 initRender 初始化的 , 其实就是 $createElement
  ````

+ core/index.js
  > 通过 `core` 对 `Vue` 进行静态属性和方法的挂载。
  ````javascript
  Vue.config = { devtools: true, …}
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive,
  }
  Vue.set = set
  Vue.delete = delete
  Vue.nextTick = nextTick
  Vue.options = {
    components: {},
    directives: {},
    filters: {},
    _base: Vue,
  }
  // extend(Vue.options.components, builtInComponents)
  Vue.options.components.KeepAlive = { name: 'keep-alive' …}
  // initUse
  Vue.use = function() {}
  // initMixin
  Vue.mixin = function() {}
  // initExtend
  Vue.cid = 0
  Vue.extend = function() {}
  // initAssetRegisters
  Vue.component = function() {}
  Vue.directive = function() {}
  Vue.filter = function() {}
  ````

+ platforms/web/runtime/index.js
  > 通过 `runtime` 添加了对 `platform === 'web'` 的情况下，特有的配置、组件、指令。
  + 向 `options` 中 `directives` 增加了 `model` 以及 `show` 指令:
  + 向 `options` 中 `components` 增加了 `Transition` 以及 `TransitionGroup` 

+ platforms/web/entry-runtime-with-compiler.js 
  > 在 `entry` 中，覆盖了 `$mount` 方法。通过 `entry` 来为 `$mount` 方法增加编译 `template` 的能力


**入口文件是 `platforms/web/entry-runtime-with-compiler.js` , 引入顺序是从后至前的。**

## Vue.prototype._init

首先会和 parent options 合并 , 即和Vue.options 合并

````javascript
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)

/**
* 注册 mutation
* @param {Object} parent Vue.options
* @param {Object} child 用户定义的options: 	{el: '#demo',data: ƒ data()},
* @param {Component} vm 
*/

export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    // 校验components名称是否符合标准
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  // 标准化
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }

  // strats是各个属性的合并策略
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
````

![](http://dev.biubiupiu.cn/20191214110651.png)

随后会进行相关的初始化

````javascript
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
````

### initState

````javascript
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
````

> `initState` 会对 `props methods data computed watch` 等属性进行相关的初始化。

#### initMethods

````javascript
function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    //....相关重复检测函数省略
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
````

> 这里将 `methods` 挂载在 `vm` 上 , 并绑定 `this` 值为 `vm`

#### initData

流程： 
+ initData 
  > 首先将 $options.data 的内容放置 _data ,  判断 `data` 上是否有和 `methods 、props` 重复属性 , 没有则进行 `observe(data) ` , 还将 `_data` 属性挂载在 `vm` 上
  ````javascript
  function initData (vm: Component) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {}
    if (!isPlainObject(data)) {
      data = {}
      process.env.NODE_ENV !== 'production' && warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
    }
    // proxy data on instance
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods
    let i = keys.length
    while (i--) {
      const key = keys[i]
      if (process.env.NODE_ENV !== 'production') {
        if (methods && hasOwn(methods, key)) {
          warn(
            `Method "${key}" has already been defined as a data property.`,
            vm
          )
        }
      }
      if (props && hasOwn(props, key)) {
        process.env.NODE_ENV !== 'production' && warn(
          `The data property "${key}" is already declared as a prop. ` +
          `Use prop default value instead.`,
          vm
        )
      } else if (!isReserved(key)) {
        proxy(vm, `_data`, key)
      }
    }
    // observe data
    observe(data, true /* asRootData */)
  }
  ````
+ observe
  ````javascript
  export function observe (value: any, asRootData: ?boolean): Observer | void {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    let ob: Observer | void
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value)
    }
    if (asRootData && ob) {
      ob.vmCount++
    }
    return ob
  }
  ````
+ Observer
  他会实例化 Observer 并挂载在观察对象的 __ob__ 上 , 然后再执行 walk 
  ````javascript
  export class Observer {
    value: any;
    dep: Dep;
    vmCount: number; // number of vms that have this object as root $data

    constructor (value: any) {
      this.value = value
      this.dep = new Dep()
      this.vmCount = 0
      def(value, '__ob__', this)
      if (Array.isArray(value)) {
        if (hasProto) {
          protoAugment(value, arrayMethods)
        } else {
          copyAugment(value, arrayMethods, arrayKeys)
        }
        this.observeArray(value)
      } else {
        this.walk(value)
      }
    }
    ...
  }
  ````
+ walk 
  > 遍历 data 上的属性进行 defineReactive 
  ````javascript
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  ````
+ defineReactive
  > 首先会会对属性值再进行 Observer , 也就起到了对象的递归监听 , 再对当前属性进行设置 get 和 set , 并且对当前属性生成一个 dep , 触发 get 然后会执行 dep.depend() 

  ````javascript
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  ````
  > 这里执行对象又回到了 watch , 因为 Dep.target = watch

  ````javascript
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  ````
  > 这里会执行两个操作 , 将当前 dep 记录到 watch 数组里面 , 再执行 dep.addSub(this) 将自己 (watch) 添加到 dep 的 subs 里面 

初始化渲染过程：

![](http://dev.biubiupiu.cn/20191214170149.png)

上图的第一个 Watcher 是页面的渲染 Watcher 

````javascript
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}

new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
````

## Dep

在整个过程中 , 对 $attrs $listeners 和 data 上的属性会生成一个 Dep , 即当这些数据更改的时候遍历 Dep.subs 发出数据更改的通知

## Watcher

在整个过程中 , 对 computed 的初始化和渲染页面会生成一个 Watcher
所以页面 Watcher 一般是在最后生成的

## computed

前面介绍了当 data 对象里面的值改变的时候会触发渲染的原因 :

首先会对 ` data ` 进行递归遍历劫持 ` get ` 和 ` set ` ; 当页面渲染时首先会先生成一个渲染 ` Watcher ` ， ` Watcher ` 初始化会调用 ` get ` 方法 , 在 ` get ` 方法中会将 `Dep.target` 指向自己 (便于后面渲染过程中触发了 ` data ` 的 ` get ` 将 当前 `Watcher` 添加到 `dep` 中) , 如果渲染使用到 ` data ` 里面的属性 , 那么就会触发 ` data ` 的 ` get ` , 然后在 ` get ` 函数里面对 ` data ` 的 ` dep ` 执行了 `dep.depend()` 进行依赖收集 , 在 `dep.depend` 函数里又会跳转到 ` Watcher ` 里面的 ` addDep ` , 在这个函数里面做了两个事: 1. 将 ` Watcher ` 添加到 `dep.subs` 2. 将 ` dep ` 记录到当前 ` Watcher ` 。

目前为止渲染 ` Watcher ` 已经被添加到了使用到了的 ` data ` 属性里面的 ` dep ` 去了 , 使用过的 ` dep ` 也被记录到了渲染 ` Watcher ` 中。当 ` data ` 改变 , 就会触发 `dep.notify` 执行渲染 ` Watcher ` , 至于 ` Watcher ` 中的 ` dep ` 这个会在 ` computed ` 中使用到。

computed 初始化会生成一个 Watcher , 页面渲染照常生成页面 Watcher ,  Watcher  初始化会调用  get  方法 , 页面 Watcher 被添加到了 target 数组里面 , 当页面使用到 computed 属性的时候 , computed Watcher 执行 get 方法 (这里有一个 dirty 来判断当前属性是否需要重新执行 get ) , 然后将 computed Watcher 添加到 target 数组 , 并且重新赋值 Dep.target 。 computed Watche 执行 get 方法用到了 data 的属性 , 那么就像前面说的那样进行依赖收集 , 只不过是上面的页面 Watcher 换成了 computed Watcher , 依赖收集完成了之后 , 需要进行 target 数组的出栈 , 即把 computed Watcher 出栈 , 同时 Dep.target 指向栈顶 , 也是页面 Watcher , 此时还会进行一次判断用于将页面 Watcher 添加到 data dep 里面去 , 还记得上面的双向记录吗 , computed Watcher 记录的 dep 数组会在此时进行遍历 , 然后将页面 Watcher 添加到每一个依赖 dep 中 , computed Watcher 完全起到了一个架桥的作用。

````javascript
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

watch.depend () {
  let i = this.deps.length
  while (i--) {
    this.deps[i].depend()
  }
}
````

## $data $props

这里是对应了 `_data _props` 并且拦截了 `set` 操作 , `_data _props` 是可以进行 `set` 操作的 , 在 `vm` 实例上对 `data` 的代理属性进行更改也是可行的 , 只有 `$data $props` 是不可以 `set` 的

## vm._renderProxy

对渲染函数 render 进行代理（仅在开发模式下代理） , 作用是当我们在渲染函数中使用了不存在的变量会发出警告

````javascript
const hasHandler = {
  has (target, key) {
    const has = key in target
    const isAllowed = allowedGlobals(key) ||
      (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data))
    if (!has && !isAllowed) {
      if (key in target.$data) warnReservedPrefix(target, key)
      else warnNonPresent(target, key)
    }
    return has || !isAllowed
  }
}

_init = function() {
    ...
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    ...
}

initProxy = function initProxy (vm) {
  if (hasProxy) {
    // determine which proxy handler to use
    const options = vm.$options
    const handlers = options.render && options.render._withStripped
      ? getHandler
      : hasHandler
    vm._renderProxy = new Proxy(vm, handlers)
  } else {
    vm._renderProxy = vm
  }
}
````