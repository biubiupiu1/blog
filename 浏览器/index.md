#### css 会阻塞dom的渲染，并不会阻塞dom的解析，因为css解析和dom解析是同步进行的

````html
<head>
    <script>
        setTimeout(() => {
            console.log(document.querySelectorAll("p"));
        });
    <script>
    <link rel="stylesheet" herf="sellp.css?s=2000" >
</head>
<body>
    <p>你好</p>
</body>
````
> 以上是会输出p元素的，但是页面上并不会在2s内出现任何东西，这是因为css的加载和解析阻塞了渲染，没有阻塞解析


#### js 会阻塞dom的解析

> html是按顺序解析的，解析到了script会停下dom解析，加载script内容，并会等待前面的css文件加载完毕后再执行js

````html
<head>
    <style rel="stylesheet" herf="sellp.css?s=2000" ></style>
    <script>
        console.log("执行");
    <script>
</head>
<body>
    <p>你好</p>
</body>
````

> 上面script会在css加载完毕之后再执行，然后script标签会阻塞dom解析，所以如果link标签后面有script标签，看起来css是会阻塞dom解析，其实是js再等待css加载完成，js阻塞了后面的dom解析

结论:
+ css加载不会阻塞DOM树的解析
+ css加载会阻塞DOM树的渲染
+ css加载会阻塞后面js语句的执行、


#### DOMContentLoaded

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载

````html
<link rel="stylesheet" href="sellp.css?s=2000">
<script>
document.addEventListener('DOMContentLoaded',function(){
    console.log('3 seconds passed');
});
</script>
````

> 然后这种情况还是会再3秒后执行，那是因为script在等待css加载完成，所以整个dom解析并没有完成，造成了看起来DOMContentLoaded没有生效的感觉

所以下面这种方式是正确的

````html
<script>
document.addEventListener('DOMContentLoaded',function(){
    console.log('3 seconds passed');
});
</script>
<link rel="stylesheet" href="sellp.css?s=2000">
````

> 这里的DOMContentLoaded是会立即执行的，并不会等待css加载完成

然后还有一种情况

````html
<script>
document.addEventListener('DOMContentLoaded',function(){
    console.log('3 seconds passed');
});
</script>
<link rel="stylesheet" href="sellp.css?s=2000">
<script>
</script>
````

> 这里的结果是和第一种一样的，会等待三秒输出，还是那个原因，最后一个script在等待css加载完成，造成dom解析没有完成，DOMContentLoaded没有触发

#### 图解浏览器的基本工作原理

https://zhuanlan.zhihu.com/p/47407398


#### 前端性能优化方案
这个其实方案还是比较多的，可以从DOM层面，CSS样式层面和JS逻辑层面分别入手，大概给出以下几种：  
(1) 减少DOM的访问次数，可以将DOM缓存到变量中；  
(2) 减少重绘和回流，任何会导致重绘和回流的操作都应减少执行，可将多次操作合并为一次；  
(3) 尽量采用事件委托的方式进行事件绑定，避免大量绑定导致内存占用过多；  
(4) css层级尽量扁平化，避免过多的层级嵌套，尽量使用特定的选择器来区分；  
(5) 动画尽量使用CSS3动画属性来实现，开启GPU硬件加速；  
(6) 图片在加载前提前指定宽高或者脱离文档流，可避免加载后的重新计算导致的页面回流；  
(7) css文件在<head>标签中引入，js文件在<body>标签中引入，优化关键渲染路径；  
(8) 加速或者减少HTTP请求，使用CDN加载静态资源，合理使用浏览器强缓存和协商缓存，小图片可以使用Base64来代替，合理使用浏览器的预取指令prefetch和预加载指令preload；  
(9) 压缩混淆代码，删除无用代码，代码拆分来减少文件体积；  
(10) 小图片使用雪碧图，图片选择合适的质量、尺寸和格式，避免流量浪费。  