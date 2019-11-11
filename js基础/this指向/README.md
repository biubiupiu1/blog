#### 函数调用方式
- 普通函数调用模式
- 对象中的函数调用模式
- `call/apply/bind`调用模式
- 构造函数调用模式
- 箭头函数调用

#### 注意点

````javascript
function foo() {
    console.log(this)
}
foo();  // window


"use strict"
function foo() {
    console.log(this)
}
foo();  //undefined
````

> 这里在普通模式下当没有指定this时(也可以说指定了this为undefined)，this会变成window，严格模式下却不会，其实`foo()`也就等于foo.apply(undefined)，种叫做默认绑定

````javascript
function foo() {
    console.log(this === window)
}
foo.apply(undefined); //true
````

> 这也证明了当this值为undefinde时，非严格模式会变成window

#### 箭头函数

1、没有自己的`this、super、arguments`和`new.target`绑定。   
2、不能使用`new`来调用。  
3、没有原型对象。  
4、不可以改变`this`的绑定。   
5、形参名称不能重复。   

````javascript
var name = 'window';
var student = {
    name: '若川',
    doSth: function(){
        var arrowDoSth = () => {
            console.log(this.name);
        }
        arrowDoSth();
    },
    arrowDoSth2: () => {
        console.log(this.name);
    }
}
student.doSth(); // '若川'
student.arrowDoSth2(); // 'window'
````

> 箭头函数中没有this绑定，必须通过查找作用域链来决定其值。 如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this，否则this的值则被设置为全局对象。

````javascript
var student = {
    name: '若川',
    doSth: function(){
        console.log(this.name);
        return () => {
            console.log('arrowFn:', this.name);
        }
    }
}
var person = {
    name: 'person',
}
student.doSth().call(person); // '若川'  'arrowFn:' '若川'
student.doSth.call(person)(); // 'person' 'arrowFn:' 'person'
````

> 也就是说无法通过call、apply、bind绑定箭头函数的this(它自身没有this)。而call、apply、bind可以绑定缓存箭头函数上层的普通函数的this。 比如：

#### DOM事件处理函数调用

`onclick`和`addEventerListener`是指向绑定事件的元素。
一些浏览器，比如`IE6~IE8`下使用`attachEvent`，`this`指向是`window`。
顺便提下：面试官也经常考察`ev.currentTarget`和`ev.target`的区别。
`ev.currentTarget`是绑定事件的元素，而`ev.target`是当前触发事件的元素。比如这里的分别是`ul`和`li`。
但也可能点击的是`ul`，这时`ev.currentTarget`和`ev.target`就相等了。

#### 内联事件处理函数调用

````html
<button class="btn1" onclick="console.log(this === document.querySelector('.btn1'))">点我呀</button>
<button onclick="console.log((function(){return this})());">再点我呀</button>
````

第一个是`button`本身，所以是`true`，第二个是`window`。这里跟严格模式没有关系。 当然我们现在不会这样用了，但有时不小心写成了这样，也需要了解。