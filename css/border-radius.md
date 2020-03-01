# 参数介绍

缩写

````css
border-radius: 300px
````

还原出来是这样的

````css
border-radius: 300px 300px 300px 300px/300px 300px 300px 300px;
````

````css
border-radius: 左上角水平圆角半径大小 右上角水平圆角半径大小 右下角水平圆角半径大小 左下角水平圆角半径大小/左上角垂直圆角半径大小 右上角垂直圆角半径大小 右下角垂直圆角半径大小 左下角垂直圆角半径大小;
````

![](http://dev.biubiupiu.cn/20191221163657.png)

当我们这样设置百分比的时候

````css
border-radius: 10%
````

其实是这样

````css
border-radius: 10% 10% 10% 10%/10% 10% 10% 10%;
````

这里前面是水平方向 , 后面是垂直方向 , 也就是他们相对的值也是不一样的 , 前面相对的值也就是宽度 , 后面相对的值就是高度

# 例子

## 大值特性

一个正方形当我们设置

````css
border-top-left-radius: 50%;
````

是这样的

![](http://dev.biubiupiu.cn/20191221165737.png)

那我们设置 100% 

````css
border-top-left-radius: 100%;
````

结果是这样的

![](http://dev.biubiupiu.cn/20191221165859.png)


那我们设置 200% 

````css
border-top-left-radius: 200%;
````

结果还是这样的

![](http://dev.biubiupiu.cn/20191221165859.png)

> 那是因为我们设置的半径是不能够超过边长的


试下

````css
border-radius: 50%
````

结果是一个圆形

![](http://dev.biubiupiu.cn/20191221165606.png)

当我们设置 100% 结果是一样的

````css
border-radius: 100%
````

![](http://dev.biubiupiu.cn/20191221165606.png)

那这个是因为什么呢？


> 在 Lea Verou 的演讲 The Humble Border Radius 中，她说到 W3C 对于重合曲线有这样的规范：如果两个相邻的角的半径和超过了对应的盒子的边的长度，那么浏览器要重新计算保证它们不会重合。

> 所以上面左上角和左下角加起来的半径长度已经是 200% 了 , 说明已经超过的变长了 , 所以浏览器需要平均分一下

![](http://dev.biubiupiu.cn/20191221170325.png)



## 等比例特性

![](http://dev.biubiupiu.cn/20191221164136.png)

这样元素的宽度是200px 高度是 300px

![](http://dev.biubiupiu.cn/20191221164205.png)

> `大家发现没，原本设置的是300像素*300像素，结果最后显示的却是200像素*200像素半径下的圆弧效果，这显然不符合认知啊！！`

> 实际上是这样的，CSS3圆角除了大值特性，还有一个等比例特性，就是水平半径和垂直半径的比例是恒定不变的。

> `回到上面例子，由于我们的元素占据宽度200像素，高度300像素。所以，根据大值特性，水平方向的300像素只能按照200像素半径渲染；再根据等比例特性，虽然垂直方向理论上的最大半径是300像素，但是受制于当初设定的300px*300px的1:1比例，垂直方向最终渲染的半径大小也是200像素。于是，我们最后得到的只是一个200像素*200像素的圆弧。`

## 一些写法

前面说了

````css
border-radius: 300px
````
等同于
````css
border-radius: 300px 300px 300px 300px/300px 300px 300px 300px;
````
等同于
````css
border-radius: 300px/300px;
````

那么如果单单指定一个角来写属性的话

````css
  border-top-left-radius: 200px 100px;
````

等同于
````css
border-radius: 200px 0 0 0 / 100px 0 0 0;
````

> 也就是说单角写属性是不支持 / , 取而代之的是用空格分开来表示