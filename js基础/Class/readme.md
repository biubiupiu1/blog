#### 与es5实现的区别

```javascript

class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

```

> 上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

```javascript

var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

```

> 上面代码采用 ES5 的写法，toString方法就是可枚举的。

```javascript

class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);

```

> 生成类的实例的写法，与 ES5 完全一样，也是使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。

#### 注意点

- 严格模式
> 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

- 不存在提升

> 类不存在变量提升（hoist），这一点与 ES5 完全不同。

```javascript
new Foo(); // ReferenceError
class Foo {}
```

- name 属性
> 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

```javascript
class Point {}
Point.name // "Point"
```

- Generator 方法
> 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。


```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

#### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

> 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例

```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```
> 上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```
> 父类的静态方法，可以被子类继承

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

> 静态方法也是可以从super对象上调用的。


#### 静态属性

```javascript
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```
> 目前，只有老写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上static关键字。

#### new.target 属性

new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
> 上面代码确保构造函数只能通过new命令调用。

```javascript   
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```
> Class 内部调用new.target，返回当前 Class

``` javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
```
> 需要注意的是，子类继承父类时，new.target会返回子类

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
> 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。上面代码中，Shape类不能被实例化，只能用于继承

#### 类的继承

Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class Point {
}

class ColorPoint extends Point {
}
```
> 上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码

```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```
> 上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。
ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

> 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错

```javascript
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

> 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

#### super 关键字

super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

1、第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。

````javascript
class A {}

class B extends A {
  constructor() {
    super();
  }
}
````
> 上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。
super()在这里相当于A.prototype.constructor.call(this)。


````javascript

class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}

````
> 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

2、第二种情况，super作为对象时，在普通方法中，**指向父类的原型对象**；在静态方法中，**指向父类**。

````javascript

class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined


class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();

````

如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。

````javascript

class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2

````
> 上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

````javascript

class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B.x = 3;
B.m() // 3

````
> 另外，在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例

````javascript
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
````
> 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

#### 类的 prototype 属性和__proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

````javascript
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
````
> （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
>
> （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

````javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
````
> 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型
