### 正向代理

> 正向代理，意思是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。

**正向代理**是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。

**正向代理**对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。

![](http://dev.biubiupiu.cn/20191116170447.png)

### 反向代理

> **反向代理**（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

**反向代理**是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。

**反向代理**对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。

![](http://dev.biubiupiu.cn/20191116170500.png)

### 匹配规则

![](http://dev.biubiupiu.cn/20191116170614.png)

![](http://dev.biubiupiu.cn/20191116170644.png)

![](http://dev.biubiupiu.cn/20191116170735.png)

### URL的尾部需不需要

![](http://dev.biubiupiu.cn/20191116170804.png)


### try_files

````
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
````
当用户请求 http://localhost/example 时，这里的 $uri 就是 /example。 

try_files 会到硬盘里尝试找这个文件。如果存在名为 /$root/example（其中 $root 是项目代码安装目录）的文件，就直接把这个文件的内容发送给用户。 


显然，目录中没有叫 example 的文件。然后就看 $uri/，增加了一个 /，也就是看有没有名为 /$root/example/ 的目录。 
又找不到，就会 fall back 到 try_files 的最后一个选项 /index.php，发起一个内部 “子请求”，也就是相当于 nginx 发起一个 HTTP 请求到 http://localhost/index.php。 

````
location /dist {
    alias dist;
    try_files $uri $uri/ /dist/index.html;
    index  index.html index.htm;
}
````

> 可以使用以上代码处理vue-router的history 模式中404的问题，具体逻辑就是访问/dist/about/ , nginx尝试找有没有这个路径的文件，没有就加上/ 看有没有这个文件夹，再没有就直接返回dist目录下的index.html了