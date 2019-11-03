#### Set
类似于数组，只不过Set不允许有重复值，利用这个特性可以对数组去重`[...new Set(array)]`

> 构造函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数

````javascript
new Set([1, 2, 3, 4])

ne Set(document.querySelectorAll('div'))
````

#### WeakSet 
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值（Symbol也不能），而Set的成员都可以是

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。由于这个特性，因此 ES6 规定 WeakSet 不可遍历。

> 作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。

````javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
````

一个WeakSet应用例子

````javascript
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
````

> 上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏

#### Map

Object只能用字符串作为键值，Map可以使用对象作为键值；Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

> 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

其实Map里面可以看做是一个二维数组，里面每一个数组都是长度为二的数组，第一个值为键，第二个值为值。

````javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

//其实执行的是
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);

//分解Map
console.log(...map) //['name', '张三'],['title', 'Author']

//以下new Map也是可以的，事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数

const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3

````


#### WeakMap
WeakMap结构与Map结构类似，也是用于生成键值对的集合。

````javascript
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
````
WeakMap与Map的区别有两点。

首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名，且对键名的引用也是弱引用

> WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用

一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
````javascript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"

//一旦节点被删除，WeakMap记录就会自动被移除
````

#### 总结

- Set
1. 成员唯一、无序且不重复
2. [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
3. 可以遍历，方法有：add、delete、has
- WeakSet
1. 成员都是对象
2. 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
3. 不能遍历，方法有add、delete、has
- Map
1. 本质上是键值对的集合，类似集合
2. 可以遍历，方法很多可以跟各种数据格式转换
- WeakMap
1. 只接受对象作为键名（null除外），不接受其他类型的值作为键名
2. 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
3. 不能遍历，方法有get、set、has、delete

````javascript
let set = new Set([1, 2]);
let map = new Map([[1, 2], [3, 4]]);

console.log(...set.values()) //1 2
console.log(...set) //1 2
console.log(set[Symbol.iterator] === set.values) //true

console.log(...map.entries())   //[1, 2] [3, 4]
console.log(...map)   //[1, 2] [3, 4]
console.log(map[Symbol.iterator] === map.entries)

//其实就是Set没有键值，所以他把数据存起来类似于[值， 值]
//而Map有键值，所以他数据类似于[键，值]
//所以Set遍历只需提取值，Map遍历都需要提取
````