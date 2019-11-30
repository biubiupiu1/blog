## DOM事件级别
+ DOM0
  + onXXX类型的定义事件
  + element.onclick = function(e) { ... }
+ DOM2
  + addEventListener方式
  + element.addEventListener('click', function (e) { ... })
  + btn.removeEventListener('click', func, false)
  + btn.attachEvent("onclick", func);
  + btn.detachEvent("onclick", func);
+ DOM3
增加了很多事件类型
  + element.addEventListener('keyup', function (e) { ... })
  + eventUtil 是自定义对象，textInput 是 DOM3 级事件

````javascript
if(typeof btn.addEventListener === 'function'){
  btn.addEventListener('click',fn);

}else if(typeof btn.attachEvent === 'function'){
  btn.attachEvent('onclick',fn)
}else{
  btn.onclick=function(){
    // do something
  }
}
````

## DOM事件模型

![](http://dev.biubiupiu.cn/20191130152438.png)


````javascript
btn.removeEventListener('click', func, false)

// 第三个参数代表是否在捕获截断执行函数，默认是false，即默认是在冒泡阶段执行函数
````

> 注意是从window开始捕获，也是在window结束的

## Event对象常见应用

+ event.target
  + 触发事件的元素
+ event.currentTarget
  + 绑定事件的元素
+ event.preventDefault()
  + 阻止默认行为
  + event.cancelBubble()和event.preventBubble 都已经废弃
+ event.stopPropagation()
  + 阻止在捕获阶段或冒泡阶段继续传播，而不是阻止冒泡
+ event.stopImmediatePropagation()
  + 阻止事件冒泡并且阻止相同事件的其他侦听器被调用。

## 事件的代理/委托

事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件

优点：
+ 可以减少事件注册，节省大量内存占用
+ 可以将事件应用于动态添加的子元素上

````javascript
ulEl.addEventListener('click', function(e){
  var target = event.target || event.srcElement;
  if(target && target.nodeName.toUpperCase() === "LI"){
    console.log(target.innerHTML);
  }
}, false);
````

## 自定义事件

+ Event
+ CustomEvent

````javascript
var event = new Event('build');

// Listen for the event.
document.addEventListener('build', function (e) {
    console.log(e);
}, false);

// Dispatch the event.
document.dispatchEvent(event);
````

````javascript
var event = new CustomEvent('build', {
    detail: { text: () => textarea.value },
    bubbles: true,
});

// Listen for the event.
document.addEventListener('build', function (e) {
    console.log(e);
}, false);

// Dispatch the event.
document.dispatchEvent(event);
````

> CustomEvent可以添加自定义数据

![](http://dev.biubiupiu.cn/20191130161158.png)


## JS获取dom的CSS样式

````javascript
function getStyle(obj, attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, false)[attr];
  }
}
````

## Window 对象 与 document对象

+ window
  + window对象表示浏览器窗口，是javascript顶级对象
  + 我们创建的变量都是在window的成员
  + window的变量是在全局都可以访问的


+ document
  + document对象是整个页面的根节点，他不是html，也不是body就是最大的根节点。
  + Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问

![](http://dev.biubiupiu.cn/20191130163223.png)

## 区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”
+ 客户区坐标
  + 鼠标指针在可视区中的水平坐标(clientX)和垂直坐标(clientY)
+ 页面坐标
  + 鼠标指针在页面布局中的水平坐标(pageX)和垂直坐标，就是包括滚动条的距离的客户区坐标
+ 屏幕坐标
  + 设备物理屏幕的水平坐标(screenX)和垂直坐标(screenY)

> 屏幕坐标还真就是屏幕坐标。。


## focus/blur与focusin/focusout的区别与联系

focus事件在元素获取焦点时触发. 这个事件和 focusin 最大的区别仅仅在于后者会事件冒泡.

## mouseover/mouseout与mouseenter/mouseleave的区别与联系

![](http://dev.biubiupiu.cn/20191130165418.png)

![](http://dev.biubiupiu.cn/20191130165711.png)

## IE 的事件处理和 W3C 的事件处理有哪些区别？

上一段《JavaScript高级程序设计》一书中的event工具函数

````javascript
var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            //兼容ie
            element.attachEvent("on" + type, handler);
        } else {
            //最低级处理
            element["on" + type] = handler;
        }
    },
    //它返回对 event 对象的引用
    getEvent: function(event){
        return event ? event : window.event;
    },
    //它返回事件的目标
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    //用于取消事件的默认行为
    preventDefault: function(event){
        if (event.preventDefault){
             event.preventDefault();
         } else {
             event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        } 
    },
    // 由于 IE 不支持事件捕获，因此这个方法在跨浏览器的情况下，也只能用来阻止事件冒泡。
    stopPropagation: function(event){
         if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
};
````