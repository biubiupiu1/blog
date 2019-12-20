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

## vm.$mount 生成 render 函数

````javascript

  const { render, staticRenderFns } = compileToFunctions(template, {
    outputSourceRange: process.env.NODE_ENV !== 'production',
    shouldDecodeNewlines,
    shouldDecodeNewlinesForHref,
    delimiters: options.delimiters,
    comments: options.comments
  }, this)

  options.render = render
  options.staticRenderFns = staticRenderFns

  Vue.prototype.$nextTick = function() {}
  Vue.prototype._render = function() {
    ...
    const { render, _parentVnode } = vm.$options
    render.call(vm._renderProxy, vm.$createElement)
    ...
  }

  // render 函数
  (function anonymous() {
    with (this) {
      return _c(
        'div',
        { attrs: { id: 'app' } },
        [_v('\n  ' + _s(fullMsg) + '\n  '), _c('component-a')],
        1
      );
    }
  });
  // 还有一个 vm._c 是在 vm._init 中的 initRender 初始化的 , 其实就是 $createElement
````

## 生成 VNode 

**runtime-compile $mount -> runtime -> $mount -> mountComponent -> vm._update(vm._render(), hydrating)**

vm._render 生成 VNode , vm._update 生成 DOM 

VNode 是通过渲染函数生成的 , 而渲染函数是通过我们自己编写或者通过模板编译过来的( `$mount` 函数编译生成 render 函数) , render 函数长这样：

````javascript
(function anonymous() {
  with (this) {
    return _c(
      'div',
      { attrs: { id: 'app' } },
      [_v('\n  ' + _s(fullMsg) + '\n  '), _c('component-a')],
      1
    );
  }
});
````

> 在生成的过程中如果遇到是 component 的话会创建一个组件 VNode , 这个过程会创建组件构造函数 , 安装组件钩子函数 , 实例化 VNode , 东西放在 options 中

````javascript
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {


  Ctor = baseCtor.extend(Ctor)

  installComponentHooks(data)

  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  if (__WEEX__ && isRecyclableComponent(vnode)) {
    return renderRecyclableComponentTemplate(vnode)
  }

  return vnode
}
````


> 可以看出是深度优先创建 VNode 的 , 即会先创建 _s( fullMsg ) 再 _v(...) 再 _c('component-a') 再最外面的 _c , children 是通过参数传进来的

构建出来的 VNode 如图

![](http://dev.biubiupiu.cn/20191216195010.png)

component 好像先不用生成 VNode

## vm._update 

这里会调用 __patch__ 方法进行生成 DOM 操作 , 然后根据 VNode 深度优先递归调用 createElm 生成 DOM 树 , 再最后将 DOM 插入到 body 上 , 再删除以前的 DOM

````javascript
function createElm (
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {

  vnode.isRootInsert = !nested // for transition enter check

  // 判断是否为 component , 如果是则生成 component
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }

  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    // 生成占位符 
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)

    /* istanbul ignore if */
    if (__WEEX__) {
      // ...
    } else {
      // 生成子 VNode
      createChildren(vnode, children, insertedVnodeQueue)
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue)
      }
      // 将生成的 DOM appendChild 到父 DOM 这里的 parentElm 其实就是父节点 DOM , 最外层的 VNode 的 parentElm 是 docqument.body , 当 createChildren 的时候 , vnode.ele 会被作为子节点的 parentElm 
      insert(parentElm, vnode.elm, refElm)
    }

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}

function createChildren (vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(children)
    }
    for (let i = 0; i < children.length; ++i) {
      // 第三个参数是刚刚的父节点 
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}
````

## createComponent

前面在生成 component VNode 的时候只是生成了一个 VNode 外壳 , 并在 VNode.data 上挂载了 相关 hook , 并没有对 component 里面进行生成 VNode。

所以当我们进行 patch 生成 DOM 的时候会判断当前是普通元素还是 component ， 如果是 component , 那么会执行 createComponent 函数 

````javascript
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // This vnode was used in a previous render!
    // now it's used as a new node, overwriting its elm would cause
    // potential patch errors down the road when it's used as an insertion
    // reference node. Instead, we clone the node on-demand before creating
    // associated DOM element for it.
    vnode = ownerArray[index] = cloneVNode(vnode);
  }

  vnode.isRootInsert = !nested; // for transition enter check

  // 判断是否为 component , 如果是则生成 component
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return;
  }

  const data = vnode.data;
  const children = vnode.children;
  const tag = vnode.tag;
  if (isDef(tag)) {

    // 生成占位符 
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode);
    setScope(vnode);

    // 生成子元素
    createChildren(vnode, children, insertedVnodeQueue);
    if (isDef(data)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
    }

    // 将生成的 DOM appendChild 到父 DOM 这里的 parentElm 其实就是父节点 DOM , 最外层的 VNode 的 parentElm 是 docqument.body , 当 createChildren 的时候 , vnode.ele 会被作为子节点的 parentElm 
    insert(parentElm, vnode.elm, refElm);

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--;
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  }
}

````

可以看到在深度优先遍历 VNode 过程中 , 如果遇到是 component , 那就得先创建 component , 其实 component 也算是一个 vue 实例 , 他是继承 Vue 的 , 在创建过程中是这样的：

#### createComponent 

````javascript
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      // 执行 init hook
      i(vnode, false /* hydrating */)
    }
    if (isDef(vnode.componentInstance)) {
      // 子组件全部渲染完毕了 , 将子组件 DOM 挂载在父组件 DOM
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
````

#### componentVNodeHooks 

````javascript
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      // 创建子组件实例 vm , 并且这里传入了 activeInstance ( 当前的父实例 , 挺巧妙的 )
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      // 接管 $mount 方法
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
}
````

#### createComponentInstanceForVnode

````javascript
export function createComponentInstanceForVnode (
  vnode: any, // we know it's MountedComponentVNode but flow doesn't
  parent: any, // activeInstance in lifecycle state
): Component {
  // 将刚刚传入的父实例 vm 放置 options , 以便将 component 实例挂载在父实例下 （在 initLifecycle)
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  // 生成 component 实例
  return new vnode.componentOptions.Ctor(options)
}
````

## Ctor（Sub）

````javascript
const Sub = function VueComponent (options) {
  this._init(options)
}
````

## _init

````javascript
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // merge options
  if (options && options._isComponent) {
    // 由于上面传入了 _isComponent = true , 所以会往这里执行
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  // ...
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  } 
}
````

#### initInternalComponent

````javascript
export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  // 这里给 component 实例创建 $options 并赋值 parent 和 _parentVnode （ 组件的 VNode ）
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
````

#### $mount

执行完了 initInternalComponent 然后就会执行 $mount , 这个 $mount 是在 init hooks 里面调用的

#### _render

````javascript
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options

  // 指向当前的父 VNode
  vm.$vnode = _parentVnode
  // render self
  let vnode
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } catch (e) {
    // ...
  }
  // 生成的 VNode 的 parent = 父 VNode
  vnode.parent = _parentVnode
  return vnode
}
````

#### _update

因为我们的 VNode 是一个优先递归的遍历过程 , 所以当我们实例化一个子组件的时候要想挂载到父组件上 , 我们就得记录父组件的 vm , 所以在 _update 函数中就巧妙的用模块的全局变量和闭包巧妙的记住了父组件 vm , 具体做法是我们调用 _update 函数的时候记录当前 vm 为 activeInstance , 然后 _update 内部会执行 patch , 如果有子组件肯定就会再实例化子组件 , 那么他也会再执行 _update 函数 , 这个时候 activeInstance 就是他的父实例了 。
当 patch 执行完毕之后 , 说明当前组件已经渲染完了 , 不会再有子组件了 , 所以就会把上一个 activeInstance = prevActiveInstance , 有点类似出栈进栈的感觉。（ tree.js 小demo） 。 这个 activeInstance 主要是用于上面的  componentVNodeHooks 函数


````javascript
export let activeInstance: any = null
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    // ...
    const prevActiveInstance = activeInstance
    activeInstance = vm
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    // ...
}
````

#### patch

````javascript
vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
 
function patch (oldVnode, vnode, hydrating, removeOnly) {
  // ...
  let isInitialPatch = false
  const insertedVnodeQueue = []

  if (isUndef(oldVnode)) {
    // empty mount (likely as component), create new root element
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    // ...
  }
  // ...
}
````

执行完这些又会回到最开的 createElm 函数 , 整个过程就是一个深度递归创建的过程 , createElm 遇到原始标签则直接创建 , 如果遇到组件则需要实例化组件 , 这个实例化是一个递归的过程 , 所以在实例化组件的时候也会碰到组件 , 过程也是一样的 

+ 再实例化子组件的过程中 , 完完全全是重新进行一遍从 _init 开始生成实例过程 , 到最后 patch 返回根节点 DOM 赋值到 VueComponent 实例上的 el , 再回到 createComponent , 执行 initComponent , 将 VueComponent.el 赋值到 VNode.elm , 再将 VNode.elm appendChild 到父 DOM 上

![](http://dev.biubiupiu.cn/20191218144923.png)

+ 子组件实例 VueComponent 是怎么找到父实例的 , 这就是前面说到的那个技巧 , 利用模块的全局变量和闭包 , 保证我们每次执行 _update 的时候都将 activeInstance 执行当前实例 , 这样就能够保证在当前实例进行 patch 的时候发现了子组件 , 它进行实例化的时候能够获取到刚刚记录的 activeInstance 也就是当前实例 , 这个 activeInstance 会作为 parent 参数传入 options ; 当然如果他也执行了 _update , activeInstance 也是同样指向他的 , 只不过执行完 _update 会将上一个 activeInstance 重新还原回来 , 有点类似栈的感觉 , 就这样的一个技巧将每个实例化都能够找到父实例 (小 demo tree.js)

**VNode 图：**

![](http://dev.biubiupiu.cn/20191218151149.png)

对应js

````javascript
var ComponentA = {
  data() {
    return {
      msg: "ComponentA"
    }
  },
  template: '<div class="componentA"><p>{{msg}}</p></div>'
}

<div id="app">
  {{fullMsg}}
  <div class="test">test</div>
  <component-a></component-a>
</div>
````

**组件 VNode 图**

![](http://dev.biubiupiu.cn/20191218151342.png)

child 是指向的 componentInstance

````javascript
get child ()  {
  return this.componentInstance
}
````

> VNode 是根据渲染函数生成的 

````javascript
(function anonymous() {
    with (this) {
        return _c('div', {
            attrs: {
                "id": "app"
            }
        }, [_v("\n  " + _s(fullMsg) + "\n  "), _c('div', {
            staticClass: "test"
        }, [_v("test")]), _v(" "), _c('component-a')], 1)
    }
})
````

> _c 对应 $createElement , VNode 里面的 children 是先生成再作为 children 参数传入的 , 所以也是深度优先生成

**总结： VNode 是深度优先生成的 , DOM 也是深度优先生成的 , 也就解释了父组件和子组件的生命周期 : 父 beforeCreate -> 父 beforeMount -> 子 beforeCreate -> 子 beforeMount -> 子 mount -> 父 mount**

## 合并配置

vue 实例合并配置是在 this._init

````javascript
// 利用合并策略合并选项
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  return options
}
````

component 实例合并配置是在生成组件 VNode 的时候就已经合并了

````javascript
Vue.extend = function (extendOptions: Object): Function {
  // ...
  Sub.options = mergeOptions(
    Super.options,
    extendOptions
  )

  // ...
  // keep a reference to the super options at extension time.
  // later at instantiation we can check if Super's options have
  // been updated.
  Sub.superOptions = Super.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = extend({}, Sub.options)

  // ...
  return Sub
}

````

> 我们只保留关键逻辑，这里的 extendOptions 对应的就是前面定义的组件对象，它会和 Vue.options 合并到 Sub.opitons 中。

[参考](https://ustbhuangyi.github.io/vue-analysis/v2/components/merge-option.html#%E7%BB%84%E4%BB%B6%E5%9C%BA%E6%99%AF)

> 这里对组件的选项配置合并是在第一次注册的时候发生的 , 并且会将生成的组件类缓存起来 , 所以一个组件只会执行一次生成类函数

