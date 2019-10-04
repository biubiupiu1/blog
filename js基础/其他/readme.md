##### Object.create()

```javascript
// new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
```

##### `__proto__` 属性
> 目前只有浏览器环境必须部署有这个属性，其他运行环境不一定要部署，因此不建议使用这个属性，而是使用下面这些来 Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

##### Object.assign() 

> Object.assing 是不能拷贝到继承或原型上的方法的

> Object.assign() 方法不能正确拷贝 get ，set 属性

##### Object.getPrototypeOf

> 获取对象的原型对象

```javascript
let test = Object.assign({test: 1});

Object.getPrototypeOf(test)     // {test: 1}

class  MyClass {
  
}

class ChildClass extends MyClass {
    
}

Object.getPrototypeOf(ChildClass) ===  MyClass  // true
ChildClass.__proto__ === MyClass  //true (浏览器环境)
```

#### 枚举属性 enumeration

1、JavaScript对象的属性可分为可枚举和不可枚举，它是由属性的 enumeration 值决定的，true 为可枚举，false为不可枚举

2、原生构造函数(Boolean, Number, String 等)的内置属性(例如 toSring、 constructor等) 和 引擎内置对象的属性(Math 的 random 等) 一般是不可枚举的，而自己定义的属性(不管是原型上的还是自身的)一般是可枚举的。

+ （1）for...in  
　　for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
+ （2）Object.keys(obj)  
　　Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
+ （3）Object.getOwnPropertyNames(obj)  
　　Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
+ （4）Object.getOwnPropertySymbols(obj)  
　　Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
+ （5）Reflect.ownKeys(obj)  
　　Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

![Alt text](https://static.biubiupiu.cn/7513201-05e5eb62464f3493.png)

````javascript
let a = {};
a.b = undefined;
a.c = null;
'b' in a //true
'c' in a //true
````

#### Array

+ splice()

````javascript
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
````

方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组

> start如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

>如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。

````javascript
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

````

+ slice()

````javascript
array.slice([begin, end])
````

slice() 方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。

> 如果省略 begin，则 slice 从索引 0 开始。

> 如果 end 被省略，则slice 会一直提取到原数组末尾

````javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
````

#### Math

+ Math.floor()

>  返回小于或等于一个给定数字的最大整数。**当是负数时**

+ Math.ceil() 

>  返回大于或等于一个给定数字的最大整数。**当是负数时**

````javascript
Math.floor( 45.95); // 45 
Math.floor( 45.05); // 45 
Math.floor( 4 ); // 4 
Math.floor(-45.05); // -46 
Math.floor(-45.95); // -46

Math.ceil(.95);    // 1
Math.ceil(4);      // 4
Math.ceil(7.004);  // 8
Math.ceil(-0.95);  // -0
Math.ceil(-4);     // -4
Math.ceil(-7.004); // -7
````

+ Math.round()

> 函数返回一个数字四舍五入后最接近的整数。如果参数部分大于0.5则舍入到相邻绝对值更大的数，
如果小于0.5则舍入到相邻绝对值更小的数，**如果恰好等于0.5则舍入到正无穷方向上的整数**

````javascript
x = Math.round(20.49);      //20
x = Math.round(20.5);       //21
x = Math.round(-20.49);     //-20
x = Math.round(-20.5);      //-20
x = Math.round(-20.51)      //-21
````

+ Math.random()

>  函数返回一个浮点,  伪随机数在范围[0，1)，也就是说，从0（包括0）往上，但是不包括1（排除1）

````javascript
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min; 
}
//得到一个两数之间的随机数
````

````javascript
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
//得到一个两数之间的随机整数（能取最小不能取最大）
//试试 （都能取到最小和最大）
````
