*symbol 是一种基本数据类型 （primitive data type）。*

#### 声明
````javascript
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');
````
**Symmbol作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"**

> 每个从`Symbol()`返回的`symbol`值都是唯一的。一个`symbol`值能作为对象属性的标识符；这是该数据类型仅有的目的。更进一步的解析见—— glossary entry for Symbol。

`symbol` 是一种基本数据类型 `（primitive data type）`。


下面使用 `new` 运算符的语法将会抛出一个 `TypeError` 错误：

````javascript
var sym = new Symbol(); // TypeError
````

这会阻止创建一个显式的 `Symbol` 包装器对象而不是一个 `Symbol` 值。围绕原始数据类型创建一个显式包装器对象从 `ECMAScript 6` 开始不再被支持。 然而，现有的原始包装器对象，如 `new Boolean、new String`以及`new Number`因为遗留原因仍可被创建。

如果你真的想创建一个 `Symbol` 包装器对象 `(Symbol wrapper object)`，你可以使用 `Object()` 函数：

````javascript
var sym = Symbol("foo");
typeof sym;     // "symbol"
var symObj = Object(sym);
typeof symObj;  // "object"
````

#### Symbol.for

和 `Symbol()` 不同的是，用 `Symbol.for()` 方法创建的的 `symbol` 会被放入一个全局 `symbol` 注册表中。`Symbol.for()` 并不是每次都会创建一个新的 `symbol`，它会首先检查给定的 `key` 是否已经在注册表中了。假如是，则会直接返回上次存储的那个。否则，它会再新建一个。

![](http://dev.biubiupiu.cn/20191110204620.png)

````javascript
Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol


Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol


var sym = Symbol.for("mario");
sym.toString(); 
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串
````

为了防止冲突，最好给你要放入 symbol 注册表中的 `symbol` 带上键前缀。

````javascript
Symbol.for("mdn.foo");
Symbol.for("mdn.bar");
````

#### Symbol.keyFor

> 根据Symbol值来获取键值

````javascript
// 创建一个 symbol 并放入 Symbol 注册表，key 为 "foo"
var globalSym = Symbol.for("foo"); 
Symbol.keyFor(globalSym); // "foo"

// 创建一个 symbol，但不放入 symbol 注册表中
var localSym = Symbol(); 
Symbol.keyFor(localSym); // undefined，所以是找不到 key 的

// well-known symbol 们并不在 symbol 注册表中
Symbol.keyFor(Symbol.iterator) // undefined
````

> 只有Symbol.for才能将键值放入全局中

#### 遍历

````javascript
var obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (var i in obj) {
   console.log(i); // logs "c" and "d"
}
````

> for in遍历不能遍历出Symbol数据

**只能通过 Object.getOwnPropertySymbols、Reflect.ownKeys获取得到Symbol数据**


除了定义自己使用的 `Symbol` 值以外，`ES6` 还提供了 `11` 个内置的 `Symbol` 值，指向语言内部使用的方法。

比如 `hasInstance` 、 `iterator`之类的