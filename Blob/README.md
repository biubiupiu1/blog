### Blob

![](http://dev.biubiupiu.cn/20200309193610.png)

Blob 是一个类文件对象，所以可以通过 `URL.createObjectURL(blobArr)` 创建一个 `blob url`:

````javascript
let u8Buf = new Uint8Array([60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 60, 47, 100, 105, 118, 62])
let blobArr = new Blob([u8Buf], { type: 'text/html' })
let iframe = document.createElement('iframe');
let blobUrl = URL.createObjectURL(blobArr);
//blob:http://127.0.0.1:5502/492b9c77-ab17-40ae-8064-f5cd085cdba5
iframe.src = blobUrl;
document.body.appendChild(iframe)
````

![](http://dev.biubiupiu.cn/20200309211148.png)

### File

![](http://dev.biubiupiu.cn/20200309220017.png)

File 继承了 Blob 并且扩展了一些属性

![](http://dev.biubiupiu.cn/20200309220045.png)

### URL.createObjectURL

![](http://dev.biubiupiu.cn/20200309220955.png)

给定的参数可以是 File、Blob、MediaSource 对象

所以根据这些特性可以很容易做出用户上传一张图片然后进行预览

````html
<input id='file' type="file" />
<img src="" id='img' alt="">
````

````javascript
document.querySelector('#file').onchange = function(files) {
  let blob = this.files[0];
  let url = URL.createObjectURL(blob);
  document.querySelector('#img').src = url;
}
````

### FileReader

![](http://dev.biubiupiu.cn/20200309220205.png)

FileReader 可以将 File 转化为 Blob 转化为 ArrayBuffer、原始二进制数据、Base64 和 text

![](http://dev.biubiupiu.cn/20200309220729.png)