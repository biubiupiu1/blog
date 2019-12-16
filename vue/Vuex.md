## stroe._vm

这是一个Vue实例 , store 上的各个模块的 state 全部挂载在 data 属性上，作用也就是给 state 对象响应化 , getters 属性挂载在 computed 上 , 也能够起到响应化的作用

````javascript
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed
})

get state () {
  return this._vm._data.$$state
}
````

> 上面的 state 就是全局的 state , 并且当我们获取 store 的 state 时 , 我们获取的是 _vm._data.$$state 也就是响应化后了的数据。

![](http://dev.biubiupiu.cn/20191213145535.png)

## store.getters

````javascript
forEachValue(wrappedGetters, (fn, key) => {
  /**
    * partial 函数
    * 执行函数 返回一个新函数
      export function partial (fn, arg) {
        return function () {
          return fn(arg)
        }
      }
    */
  computed[key] = partial(fn, store)
  // getter 赋值 keys
  Object.defineProperty(store.getters, key, {
    get: () => store._vm[key],
    // 可以枚举
    enumerable: true // for local getters
  })
})

store._vm = new Vue({
  data: {
    $$state: state
  },
  computed
})
````

> 这里将 `store.getters` 上的属性对应到 `vm` 的 `computed` 上，并且 `ccomputed` 上的函数是我们定义的原始      `getter` ，所以当我们访问 `getters` 时，会访问`store._vm`上的对应 `computed` ，所以也就达到了一个类似 `computed` 并且也会响应式的效果


## store._modules（ModuleCollection）
递归注册当前 `store` 定义的模块，即将原始定义的未加工 `module` 转换成 `new Module()` ;

````javascript
export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    // 注册根模块 参数 rawRootModule 也就是 Vuex.Store 的 options 参数
    this.register([], rawRootModule, false)
  }
  register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }

    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    // 递归注册子模块
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
  ....
}
````

## store._actions

用来存放用户自定义的所有 `actions` ，所有 `module` 的  `actios` 都在里面，只不过如果模块 `namespaced` 属性为 `true` 的话，那么他就会在属性值上加上模块的前缀。

````javascript
// 循环遍历注册 action
/*
forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn)
  }
}
*/
module.forEachAction((action, key) => {
  const type = action.root ? key : namespace + key
  const handler = action.handler || action
  registerAction(store, type, handler, local)
})
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {

    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)

    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
  })
}
````

> 这里的 `module` 是当前的模块，每个模块都会执行一遍上面的函数， `module.forEachAction` 将原始模块定义的 `action` 遍历，如果不是根节点属性则需要加上 `namespace` 

![](http://dev.biubiupiu.cn/20191213110040.png)

## store._mutations

其实 `_mutations` 和 `_actions` 是一样的，一个是存放 `action` 一个是存放 `mutations`

![](http://dev.biubiupiu.cn/20191213110234.png)

## store._wrappedGetters

`_wrappedGetters` 和前面的区别就是，前面的是数组存放, `_wrappedGetters` 是对象存放，所以 `getter` 不能有重复

````javascript
function registerGetter (store, type, rawGetter, local) {
  // 类型如果已经存在，报错：已经存在
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  // 否则：赋值
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}
````
![](http://dev.biubiupiu.cn/20191213144422.png)

上面三个属性是对整个 `store` 的一个包装存储，即对所有的 `actions` 放在 `_actions` , 所有的 `mutations` 放在 `_mutations` , 所有的 `getters` 放在 `_wrappedGetters` , 并且如果不是根模块加上对应的 `namespace`

