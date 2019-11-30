## Doctype作用？标准模式与兼容模式各有什么区别?

DOCTYPE是document type(文档类型)的简写,用来告诉浏览器的解析器使用哪种HTML或XHTML规范解析页面。**DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。**

#### 知道多少种文档类型

HTML 4.01和XHTML 1.0规定了三种文档类型：Strict（严格）、Transitional（过渡）以及Frameset（基于框架）。

为什么HTML5只要写<!DOCTYPE HTML>

#### HTML 4.01 基于 SGML，需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型 。
HTML 5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为。
SGML是标准通用标记语言,简单的说，就是比HTML,XML更老的标准，这两者都是由SGML发展而来的。但是，HTML5不是的。

#### 标准模式与兼容模式（怪异模式）各有什么区别?

![](http://dev.biubiupiu.cn/20191129154136.png)

## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

定义：CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值，如 div 的 display 默认值为“block”，则为“块级”元素；span 默认 display 属性值为“inline”，是“行内”元素。

+ 行内元素有：a b span img input select strong（强调的语气）
+ 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
+ 空元素：
  - 常见: br hr img input link meta
  - 不常见: area base col command embed keygen param source track wbr

![](http://dev.biubiupiu.cn/20191129163544.png)

![](http://dev.biubiupiu.cn/20191129160128.png)

## 页面导入样式时，使用 link 和@import 有什么区别？

+ link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS,还能用户加载网页的icon, 定义 rel 连接属性等作用，进行preload；而@import 是 CSS 提供的，只能用于加载 CSS;
+ 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
+ import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题;
link 支持使用 js 控制 DOM 去改变样式，而@import 不支持;


## 介绍一下你对浏览器内核的理解？

**主要分成两部分：渲染引擎(layout engineer 或 Rendering Engine)和 JS 引擎**。

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后渲染到用户的屏幕上。

JS 引擎则：解析和执行 javascript 来实现逻辑和控制 DOM 进行交互。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

## HTML5变化

+ 新的语义化元素  
    header footer nav main article section 删除了一些纯样式的标签

+ 表单增强 
    即对表单的一些内容进行了完善，可以有很多选择参数了

    ![](http://dev.biubiupiu.cn/20191129161811.png)
+ 新API
  + canvas
  + application cache
  + audio video
  + websocket
  + localStoage, indexDB

## em 与 i 的区别

都是斜体，只不过em是语义化标签表示强调，i是样式标签表示斜体

![](http://dev.biubiupiu.cn/20191129162841.png)

即em/strong 是注重表达的，i/b是注重视觉的。

[参考链接](https://www.zhihu.com/question/19551271)

## 哪些元素可以自闭合？

+ 表单元素 input
+ img
+ br, hr
+ meta, link

其实空元素就是可以自闭和的

## HTML和DOM的关系

+ HTML只是一个字符串
+ DOM由HTML解析而来
+ JS可以维护DOM

## property和attribute的区别

````html
<input id="input1" type="text" value="test" sth="sth">
````
````javascript
let input1 = document.getElementById("input1");
console.log(input1.attributes)
````
![](http://dev.biubiupiu.cn/20191130112759.png)

> 可以看出attributes是一个类数组对象，是NamedNodeMap类型，他是html上面定义的所有属性的集合

````javascript
let input1 = document.getElementById("input1");
console.log(input1.value) //test
console.log(input1.id)    //input1
console.log(input1.type)   //text
console.log(input1.sth)  //sth
````

> 可以看出Element 上面的属性(property) 是没有sth的，也就是property会规定哪些属性附属上去，不是所有html上写的attribute都会出现在property

````html
<input id="input2" type="text">
````

````javascript
let input2 = document.getElementById("input1");
console.log(input1.value) // ""
````

![](http://dev.biubiupiu.cn/20191130114558.png)

> 可以看出property是默认会添加上去的，只是如果我们在html中定义了该属性，他就赋值上去，我们定义了property不支持的的attribute，也不会显示在property上的。

````javascript
input1.attributes.value.value = "modifiy"
//等同于input1.setAttribute("value", "modifiy")

console.log(input1.value) //"modifiy"
````

> 当我们修改attributes的时候，property也会修改，html也会相应变化

![](http://dev.biubiupiu.cn/20191130134002.png)


````javascript
input1.value = "modifiy";

console.log(input1.getAttribute("value")) //"test"
````

> 当我们尝试修改property时，attribute是不会改变的，但是html也会发生改变

![](http://dev.biubiupiu.cn/20191130134002.png)

**结论**

+ property能够从attribute中得到同步；
+ attribute不会同步property上的值；
+ attribute和property之间的数据绑定是单向的，attribute->property；
+ 更改property和attribute上的任意值，都会将更新反映到HTML页面中

## 主流浏览器机器内核

![](http://dev.biubiupiu.cn/20191130135135.png)

## 简述一下你对 HTML 语义化的理解？

+ 用正确的标签做正确的事情。
+ html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
+ 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
+ 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO;
+ 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

## 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

+ cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
+ cookie 会在同源的http请求中自动携带，即便不需要
+ sessionStorage 和 localStorage仅仅会本地保存
+ 存储大小：
    + cookie 数据大小不能超过 4k。
    + sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
+ 有效期（生命周期）：
    +  cookie具有有效期，在有效期内一直有效，即使窗口关闭
    +  seeionStorage 在当前浏览器关闭后自动删除
    +  localStorage 持久化存储，浏览器关闭也存在
+ 共享
    + sessionStorage不能共享，localStorage在同源文档之间共享，cookie在同源且path命中之间共享

## html 中 title 属性和 alt 属性的区别？

当图片不输出信息的时候，会显示 alt 信息 鼠标放上去没有信息，当图片正常读取，不会出现 alt 信息。

+ 当图片不输出信息的时候，会显示 alt 信息 鼠标放上去会出现 title 信息；
+ 当图片正常输出的时候，不会出现 alt 信息，鼠标放上去会出现 title 信息。
+ alt除了纯装饰图片外都必须设置有意义的值，搜索引擎会分析。

总结：
+ title属性是global attribute之一，作用是提供建议性的信息，通常是鼠标滑动到元素上是显示。title属性可以为链接添加描述性文字，来更加清楚的表达链接的目的。
+ alt作用是当无法显示文档中的图片是，可以为浏览者提供文字说明，是用来替代图片的，而不是提供额外说明文字的

## head 元素

HTML head 元素 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。

`可用于<head>元素内的元素有: <title>, <base>, <link>, <style>, <meta>, <script>, <noscript>, <command>`

head子元素大概分为三类，分别是：

+ 描述网页基本信息的
+ 指向渲染网页需要其他文件链接的
+ 各大厂商根据自己需要定制的

### 网页基本信息

一个网页，首先得有个标题，就跟人有名字一样。除此之外，还可以根据实际需要补充一些基本信息。

+ 文档标题（浏览器标签中显示的文本）：<title>深入了解 head 元素</title>
+ 编码格式： 如果你的页面出现乱码，那一般就是编码格式不对
+ 视窗设置：
+ 搜索引擎优化相关内容：
+ IE浏览器版本渲染设置：

### 其他文件链接

+ CSS 文件：
+ `JavaScript 文件：<script src=“script.js"></script>`

但是一般js文件放在body底部

### 厂商定制

同样分享页面到QQ的聊天窗口，有些页面直接就是一个链接，但是有些页面有标题，图片，还有文字介绍。为什么区别这么明显呢？其实就是看有没有设置下面这三个内容

````html
<meta itemprop="name" content="这是分享的标题"/>
<meta itemprop="image" content="http://imgcache.qq.com/qqshow/ac/v4/global/logo.png" />
<meta name="description" itemprop="description" content="这是要分享的内容" />
````

## 300毫秒点击延迟问题
在移动端开发中，某些机型上使用click事件会延迟300ms才执行，这样影响了用户体验。 解决方法： 引入fastclick.js。

原因： 延迟的存在时因为浏览器想知道你是否在进行双击操作；而点击穿透是因为300ms延迟触发时的副作用。