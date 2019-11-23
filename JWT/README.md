### 用户身份认证

- session + cookie
- jwt
  
### session + cookie

![](http://dev.biubiupiu.cn/20191123154333.png)

session的不足：

![](http://dev.biubiupiu.cn/20191123160856.png)


### jwt

![](http://dev.biubiupiu.cn/20191123154446.png)

> 无状态登录，对于上面的第二种方法，由于客户端发过来的token可能被篡改，所以有了第三种方法，他是对用户的一些信息base64存储和加密后的字符串拼起来的，达到了一个类似数字签名的效果，可以防止token篡改。

他是由三个部分用`.`连接拼成

- Header
- Payload
- Signature 

![](http://dev.biubiupiu.cn/20191123154726.png)

![](http://dev.biubiupiu.cn/20191123154759.png)

### 无状态 VS 有状态

![](http://dev.biubiupiu.cn/20191123155421.png)