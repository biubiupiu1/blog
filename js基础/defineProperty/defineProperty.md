```javascript
/*
 *@param obj 要在其上定义属性的对象。
 *@param prop 要定义或修改的属性的名称。
 *@param descriptor 将被定义或修改的属性描述符。
*/
Object.defineProperty(obj, prop, descriptor);

//简单使用
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});

```

##### 属性描述符(descriptor)分为：
> 数据描述符：(value, writable)
> 存取描述符: (get, set)

而且这两个是不能同时存在的，即有(value | writable)不能有 set 和 get，有(set | get) 不能有value 和 writable

```javascript
	let obj = {};
    Object.defineProperty(obj, "name", {
        value: "jack",
        get() {
          return "rouse"
        }
    })
	//type error
	Object.defineProperty(obj, "name", {
        get() {
            return "rouse"
        },
        writable: true
    })
	//type error
```

即以上代码都是是错误的

> 记住，这些选项不一定是自身属性，如果是继承来的也要考虑。为了确认保留这些默认值，你可能要在这之前冻结 Object.prototype，明确指定所有的选项，或者通过 Object.create(null)将__proto__属性指向null。

```javascript
    let obj = {};

    let desc = function () {
    };

    desc.prototype.writable = true;

    let descriptor = new desc();
    descriptor.get = function () {
        return "rouse"
    };

    Object.defineProperty(obj, "name", descriptor)
	//type error
```
所以上面代码也是报错的

> 如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符


##### 数据描述符和存取描述符均具有（configurable， enumerable）键值
> configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改。

上面提到的两个特例：

````javascript
	//这样是可以的
    Object.defineProperty(obj2, "name", {
        configurable: false,
        writable: true
    })
    Object.defineProperty(obj2, "name", {
        value: "4",
    })
	//这样是不可以的
	Object.defineProperty(obj2, "name", {
        configurable: false,
        writable: false
    })
    Object.defineProperty(obj2, "name", {
        value: "4",
    })
````

````javascript
	//这样是可以的
    Object.defineProperty(obj2, "name", {
        configurable: false,
        writable: true
    })
    Object.defineProperty(obj2, "name", {
        writable: false,
    })
	//这样是不可以的
	Object.defineProperty(obj2, "name", {
        configurable: false,
        writable: false
    })
    Object.defineProperty(obj2, "name", {
        writable: false,
		//writable: true,
    })
````

> enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。


