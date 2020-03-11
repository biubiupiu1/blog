## path

### path.dirname(path)

````javascript
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
path.dirname('/foo/bar/baz/asdf');
// 返回: '/foo/bar/baz'
path.dirname('/foo/bar/baz');
// 返回: '/foo/bar'
````

**栗子：**

````javascript
// 递归创建目录
function mkdirs(directory, callback) {
    var exists = fs.existsSync(directory)
    if (exists) {
        callback()
    } else {
        mkdirs(path.dirname(directory), function () {
            fs.mkdirSync(directory)
            callback()
        })
    }
}

mkdirs('/foo/bar/baz/asdf')
//即会从foo -> bar -> baz -> asdf 一直检查有没有这个文件夹，没有就创建
````

### 绝对路径
````
/foo
````

### 相对路径
````
./foo
foo
.
./
````

### path.join([...paths])

![](http://dev.biubiupiu.cn/20191115212010.png)

> 简单的把路径进行拼起来

````javascript
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
````

### path.resolve([...paths])

![](http://dev.biubiupiu.cn/20191115225958.png)

> 从右往左一直解析，直到遇到绝对路径，没有遇到路径则加上当前的工作目录
> 当前工作目录是指当前 node 执行的环境

比如如下代码

````javascript
//test.js
const path = require('path');
console.log(path.resolve('./'));
````
![](http://dev.biubiupiu.cn/20200305164642.png)

![](http://dev.biubiupiu.cn/20200305164623.png)


````javascript
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'
// 这里因为从右向左处理，/tmp/file/是绝对路径，所以直接是/tmp/file

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
````

> path.reslove 和 path.join的区别是 前者需要返回绝对路径，到最后都没有绝对路径就会加上当前的工作目录，遇到了绝对路径便返回，后者则是简单相加

### path.relative(from, to)

![](http://dev.biubiupiu.cn/20191115212210.png)

````javascript
let relativeUrl = path.relative(
    "../src/router/",
    "../src/pages/index/"
)
//返回：../pages/index
````

> 这个是相对于**工作目录**而言的

````javascript
let relativeUrl = path.relative(
    "../src/router/index.js",
    "../src/pages/index.vue"
)
//返回：..\..\pages\index.vue
````
> 因为他会误认为index.vue、index.js是文件夹