## Network

### timing 

![](http://dev.biubiupiu.cn/20191202160759.png)

+ `Queueing`：浏览器将请求排入队列，按照请求的优先级和先后顺序。
  + 该请求被渲染引擎推迟了，因为它被认为比关键资源（例如脚本/样式）的优先级低。这通常发生在图像上。
  + 该请求被暂停以等待即将释放的TCP套接字。(浏览器对一个host限制最大6个tcp连接)
  + 制作磁盘缓存条目上的时间（通常非常快。）
+ `Stalled/Blocking`：出于队列中描述的任何原因，请求都可能停滞，此外，此时间包括在代理协商中花费的任何时间（大部分是因为tcp连接不够而停滞）。
+ `DNS Lookup`浏览器正在解析请求的IP地址。
+ `Proxy negotiation`：浏览器正在与代理服务器协商请求。
+ `Initial Connection / Connecting`：建立连接所花费的时间，包括TCP握手/重试和协商SSL
+ `SSL`:完成SSL握手所花费的时间。
+ `Request Sent / Sending`：发出网络请求所花费的时间。通常为一毫秒的时间。
+ `Waiting (TTFB)`：等待初始响应所花费的时间，也称为第一个字节的时间。除了等待服务器传递响应所花费的时间之外，该时间还捕获了到服务器的往返延迟。
+ `Content Download / Downloading`：接收响应数据所花费的时间。

![](http://dev.biubiupiu.cn/20191202162141.png)

> 上面这张图可以看出，浏览器对于一个host的tcp连接限制为6个，当有tcp完成了http请求之后，再进行复用该连接

当我们对coontionID进行排序后

![](http://dev.biubiupiu.cn/20191202162348.png)

> 我们会很直观的发现，在一个connectionID上进行的http请求时按照顺序来的。

浏览器刷新其实tcp连接还是会短暂的存在的，所以有时候刷新浏览器会发现没有进行dns查询和tcp连接。

![](http://dev.biubiupiu.cn/20191202162550.png)

> 上面这张图是进行了dns查询和tcp连接的。


### 如何解决浏览器对同一个host的限制

+ 域名分片，对一个页面下的资源分成多个资源来加载
+ 升级到http2，http2可以实现一个tcp同时进行多个http请求
+ 提升重要资源的加载优先级(preload)，将资源优先级规划

[参考链接1](https://developers.google.com/web/tools/chrome-devtools/network/understanding-resource-timing?hl=zh-cn)

[参考链接2](https://zhuanlan.zhihu.com/p/93586950)