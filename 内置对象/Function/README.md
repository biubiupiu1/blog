> Function 构造函数创建一个新的 Function 对象。直接调用此构造函数可用动态创建函数，但会遭遇来自 eval 的安全问题和相对较小的性能问题。然而，与 eval 不同的是，**Function 构造函数只在全局作用域中运行**。

#### 语法

````javascript
new Function ([arg1[, arg2[, ...argN]],] functionBody)
````

#### 参数
`arg1, arg2, ... argN`
被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的`JavaScript`标识符的字符串，或者一个用逗号分隔的有效字符串的列表;例如`“×”`，`“theValue”`，或`“a,b”`。

`functionBody`
一个含有包括函数定义的 `JavaScript` 语句的字符串。

````javascript
function f(n) { g(n-1) }
function g(n) { if(n>0) f(n); else stop() }
f(2)
````

当`stop()`函数被调用时,调用栈是这样的:

![](http://dev.biubiupiu.cn/20191110182529.png)

> 我们可能会以为在stop函数中一直获取caller，直到获取的为null，得到的路径就是调用栈，但其实不是的

````javascript
var f = stop;
var stack = "调用栈:";
while (f) {
  stack += "\n" + f.name;
  f = f.caller;
}
````

> 上面的代码会造成死循环，因为一个函数只有一个caller，当他调用了两遍，第二次调用时caller就覆盖了上次的caller，即不能这样获取调用栈

````javascript
let fun1 = function () {
    console.log(fun1.caller.name)
}

let fun2 = function () {
    fun1();
    console.log(fun1.caller)
}

//fun2  null
````

> 上面代码说明caller只能在函数还没有执行完毕的时候获取得到，一旦函数执行完毕了，就会清除掉caller属性

````javascript
function myFunc() {
   if (myFunc.caller == null) {
      return ("该函数在全局作用域内被调用!");
   } else
      return ("调用我的是函数是" + myFunc.caller);
}
````

> 上面代码是一个应用例子