## VueCli3

### 快速原型开发

![](http://dev.biubiupiu.cn/20191115204910.png)

### 处理Html

![](http://dev.biubiupiu.cn/20191115205230.png)

````html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
<% if (process.env.NODE_ENV === 'production') { %>
    <% for (let css of htmlWebpackPlugin.options.cdn.css) { %>
    <link href="<%=css%>" rel="preload" as="style">
    <link rel="stylesheet" href="<%=css%>" as="style">
    <% }%>
    <% for (let js of htmlWebpackPlugin.options.cdn.js) { %>
    <link href="<%=js%>" rel="preload" as="script">
    <script src="<%=js%>"></script>
    <% }%>
<% } %>
````

> 一个例子，上面的htmlWebpackPlugin的变量是htmlWebpackPlugin插件注入的，我们可以在vue.config.js中挂载一些数据上去

````javascript
var externals = {
    vue: 'Vue',
    axios: 'axios',
    'element-ui': 'ELEMENT',
    'vue-router': 'VueRouter',
    vuex: 'Vuex'
}
config.externals(externals)
const cdn = {
    css: [
    ],
    js: [
        // vue
        '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
        // vue-router
        '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
        // vuex
        '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
        // axios
        '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
    ]
}
config.plugin('html')
    .tap(args => {
        args[0].cdn = cdn
        return args
    })

````

### Preload、Prefetch

![](http://dev.biubiupiu.cn/20191115205610.png)

> ### 提示
> Prefetch 链接将会消耗带宽。如果你的应用很大且有很多 async chunk，而用户主要使用的是对带宽较敏感的移动端，那么你可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。

### 环境变量

![](http://dev.biubiupiu.cn/20191115210547.png)

//.env.production
````
NODE_ENV = "production"
BASE_URL = "/dist"
VUE_APP_TESTURL = "TEST"
````
> 只有NODE_ENV、BASE_URL、VUE_APP_开头的环境变量会注入到客户端去，其他的的环境变量只会在构建的时候存在

> BASE_URL会被vue.config.js的publicPath属性覆盖

### webpack链式操作

#### 修改插件

![](http://dev.biubiupiu.cn/20191115210936.png)

#### 替换loader

![](http://dev.biubiupiu.cn/20191115210957.png)

#### inspect

````
# 只审查第一条规则
vue inspect module.rules.0

# 列出所有插件
vue inspect --plugins

# 列出指定的loader、plugin
vue inspect --rule vue
vue inspect --plugin html
````


[重点研究 vuecli3定制开发](https://juejin.im/post/5c4a6fcd518825469414e062)