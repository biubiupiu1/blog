## element.style

> HTMLElement.style 属性返回一个 CSSStyleDeclaration 对象，
表示元素的 内联style 属性（attribute），但忽略任何样式表应用的属性。 
通过 style 可以访问的 CSS 属性列表，可以查看 CSS Properties Reference。

## getComputedStyle(element, [])

> 返回的style是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。而且他是只读的

### 返回的对象与从元素的 style  属性返回的对象具有相同的类型;然而，两个对象具有不同的目的。从getComputedStyle返回的对象是只读的，可以用于检查元素的样式（包括由一个`<style>`元素或一个外部样式表设置的那些样式）。elt.style对象应用于在特定元素上设置样式。

## querySelectorAll 与 getElementsBy

querySelectorAll 返回的是一个 Static Node List，而 getElementsBy 系列的返回的是一个 Live Node List。

````javascript
// Demo 1
var ul = document.querySelectorAll('ul')[0],
    lis = ul.querySelectorAll("li");
for(var i = 0; i < lis.length ; i++){
    ul.appendChild(document.createElement("li"));
}

// Demo 2
var ul = document.getElementsByTagName('ul')[0], 
    lis = ul.getElementsByTagName("li"); 
for(var i = 0; i < lis.length ; i++){
    ul.appendChild(document.createElement("li")); 
}
````

因为 Demo 2 中的 lis 是一个动态的 Node List， 每一次调用 lis 都会重新对文档进行查询，导致无限循环的问题。而 Demo 1 中的 lis 是一个静态的 Node List，是一个 li 集合的快照，对文档的任何操作都不会对其产生影响。

![](http://dev.biubiupiu.cn/20191130110116.png)

我们再看看在 Chrome 上面是个什么样的情况：

````javascript
document.querySelectorAll('a').toString();    // return "[object NodeList]"
document.getElementsByTagName('a').toString();    // return "[object HTMLCollection]"
````
![](http://dev.biubiupiu.cn/20191130110308.png)

ul.childNodes 返回的是NodeList，ul.chileren返回的是HTMLCollection

**所以在现代浏览器中，querySelectorAll 的返回值是一个静态的 NodeList 对象，而 getElementsBy 系列的返回值实际上是一个 HTMLCollection 对象 。**

[参考链接](https://www.zhihu.com/question/24702250)
