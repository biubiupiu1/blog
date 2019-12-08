# babel7相关知识

## 核心库 @babel/core

Babel 的核心功能包含在 `@babel/core` 模块中。看到 `core` 这个词了吧，意味着核心，没有它，在 `babel` 的世界里注定寸步难行。不安装 `@babel/core`，无法使用 `babel` 进行编译。

## @babel/cli

`babel` 提供的命令行工具，主要是提供 `babel` 这个命令，适合安装在项目里。

## @babel/node

提供了 `babel-node` 命令，但是 `@babel/node` 更适合全局安装，不适合安装在项目里。

它的作用是在 `node` 环境中，直接运行 `es2015` 的代码，而不需要额外进行转码。例如我们有一个 `js` 文件以 `es2015` 的语法进行编写(如使用了箭头函数)。我们可以直接使用 `babel-node es2015.js` 进行执行，而不用再进行转码了。

可以说：`babel-node` = `babel-polyfill` + `babel-register`。

> `在babel7`之前安装`babel-cli`是会自动安装`babel-node`的。`babel-node` 是可以直接执行不兼容的代码的，但这些都是在开发环境中使用的。

**因为 Babel 虽然开箱即用，但是什么动作也不做，如果想要 Babel 做一些实际的工作，就需要为其添加插件(plugin)。**

## babel-register

`babel-register` 模块改写 `require` 命令，为它加上一个钩子。此后，每当使用 `require` 加载 `.js、.jsx、.es` 和 `.es6` 后缀名的文件，就会先用 `babel` 进行转码。
使用时，必须首先加载 `require('babel-register')`。
需要注意的是，`babel-register` 只会对 `require` 命令加载的文件转码，而 不会对当前文件转码。

> 使用`babel-register`我们可以直接用`node`执行代码，`node index.js，index.js` 里面所有的`require`都会进行`babel`转换，但是不会转换`index.js`

栗子：
````javascript
//index.js
require('@babel/register')({ presets: ['@babel/preset-env'] });
require('./main.js');
````

````javascript
//main.js
import lib from './lib';
console.log(lib, 'main');
````

````
node inde.js
````

不会报`import`的错误

> 但是如果在`index.js`中进行`import`就会出现报错，因为`@babel/register`只会转化i`ndex.js`中`require`的内容

## 插件

如果不配置任何`babel`情况下进行转换，那么转换后的代码和开始的代码是一样的。要想转换代码，我们需要使用插件。

Babel 构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道，`Babel` 的插件分为两种: 语法插件和转换插件。

+ 语法插件
  
  这些插件只允许 `Babe`l 解析（`parse`） 特定类型的语法（不是转换），可以在 `AST` 转换时使用，以支持解析新语法，例如：

  ````javascript
  import * as babel from "@babel/core";
  const code = babel.transformFromAstSync(ast, {    //支持可选链    plugins: ["@babel/plugin-proposal-optional-chaining"],    babelrc: false}).code;
  ````
+ 转换插件
  
  转换插件会启用相应的语法插件(因此不需要同时指定这两种插件)，这点很容易理解，如果不启用相应的语法插件，意味着无法解析，连解析都不能解析，又何谈转换呢？

### 插件的使用

如果插件发布在 `npm` 上，可以直接填写插件的名称， `Babel` 会自动检查它是否已经被安装在 `node_modules` 目录下，在项目目录下新建 `.babelrc` 文件 (下文会具体介绍配置文件)，配置如下：

````javascript
//.babelrc
{    
    "plugins": ["@babel/plugin-transform-arrow-functions"]
}
````

但是一个项目转换成兼容代码需要很多的插件进行不同的转换，上面的转换只是转换es6的箭头函数，要是我们得一个个去写这些插件，这样需要写很多插件，会很麻烦，所以预设出来了。

## Preset

通过使用或创建一个 `preset` 即可轻松使用一组插件。

![](http://dev.biubiupiu.cn/20191208131856.png)

### @babel/preset-env

`@babel/preset-env` 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 `polyfill`，在不进行任何配置的情况下，`@babel/preset-env` 所包含的插件将支持所有最新的JS特性(`ES2015,ES2016`等，不包含 `stage` 阶段)，将其转换成`ES5`代码。例如，如果你的代码中使用了可选链(目前，仍在 `stage` 阶段)，那么只配置 `@babel/preset-env`，转换时会抛出错误，需要另外安装相应的插件。

````javascript
//.babelrc
{    
    "presets": ["@babel/preset-env"]
}
````

需要说明的是，`@babel/preset-env` 会根据你配置的目标环境，生成插件列表来编译。对于基于浏览器或 `Electron` 的项目，官方推荐使用 `.browserslistrc` 文件来指定目标环境。默认情况下，如果你没有在 `Babel` 配置文件中(如 `.babelrc`)设置 `targets` 或 `ignoreBrowserslistConfig，@babel/preset-env` 会使用 `browserslist` 配置源。

例如，仅包括浏览器市场份额超过0.25％的用户所需的 polyfill 和代码转换（忽略没有安全更新的浏览器，如 IE10 和 BlackBerry）:

````javascript
//.browserslistrc
> 0.25%
not dead
````

> 语法转换只是转换高版本的语法至低版本的语法，但是新的内置函数(`Promise`)和实例方法(`Array.proptype.includes`)是无法转换的。这是就需要`polyfill`了

### Polyfill

`@babel/polyfill` 模块包括 `core-js` 和一个自定义的 `regenerator` `runtime` 模块，可以模拟完整的 `ES2015+` 环境（不包含第4阶段前的提议）。

![](http://dev.biubiupiu.cn/20191208142318.png)

> 但是这样我们引入的话是直接把整个 `polyfill` 包全部引入过来了，这样会使代码提交增大很多，所以我们可以使用 `useBuiltIns` 参数

![](http://dev.biubiupiu.cn/20191208142710.png)

![](http://dev.biubiupiu.cn/20191208142730.png)

前面曾提到，在 `useBuiltIns` 参数值为 `usage` 时，仍然需要安装 `@babel/polyfill`，虽然我们上面的代码转换中看起来并没有使用到，但是，如果我们源码中使用到了 `async/await`，那么编译出来的代码需要 `require("regenerator-runtime/runtime")`，在 `@babel/polyfill` 的依赖中，当然啦，你也可以只安装 `regenerator-runtime/runtime` 取代安装 `@babel/polyfill`。

## babel-runtime 和 babel-plugin-transform-runtime 

![](http://dev.biubiupiu.cn/20191208142934.png)

![](http://dev.biubiupiu.cn/20191208143004.png)

![](http://dev.biubiupiu.cn/20191208145050.png)

> `babel-plugin-transform-runtime` 默认不支持 实例方法 (例如 `[1,2,3].includes(1))`，但是我们可以配置 `babel-plugin-transform-runtime` 。

````javascript
"plugins": [
    [
        "@babel/plugin-transform-runtime",
        {
            "corejs": 3
        }
    ]
]
````

上面默认情况下是 `corejs2` ， 但是 `corejs2` 是不含实例方法(`Array.proptype.includes` )的，`corejs3`是支持的。

## 小结一下

![](http://dev.biubiupiu.cn/20191208145905.png)

[参考链接1](https://juejin.im/post/5ddff3abe51d4502d56bd143)

[参考链接2](https://juejin.im/post/5c19c5e0e51d4502a232c1c6)