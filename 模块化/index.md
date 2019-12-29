##### export import

> 有两种不同的导出方式，命名导出和默认导出。你能够在每一个模块中定义多个命名导出，但是只允许有一个默认导出。每种方式对应于上述的一种语法：

###### export

````javascript
export default function() {}
export function a () {}

var b = 'xxx';
export {b}; // 这是ES6的写法，实际上就是{b:b}
setTimeout(() => b = 'ooo', 1000);
export var c = 100;
````

###### import

````javascript
import $ from 'jquery';
import * as _ from '_';
import {a,b,c} from './a';
import {default as alias, a as a_a, b, c} from './a'
````

##### as

````javascript
// a.js
var a = function() {};
export {a as fun};

// b.js
import {fun as a} from './a';
a();

//其实

export {a, b}

//等同于

export {a as a, b as b}
````

##### default

````javascript
// d.js
export default function() {}

// 等效于：
function a() {};
export {a as default};


import a from './d';

// 等效于，或者说就是下面这种写法的简写，是同一个意思
import {default as a} from './d';
````

````javascript

export default function common() {
    return "common hello";
}
//转化成
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return common; });
function common() {
  return "common hello";
}

/***/ }),




let test = 2;
export default test;
export let test2 = 3;

//转化成
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test2", function() { return test2; });
var test = 2;
/* harmony default export */ __webpack_exports__["default"] = (test);
var test2 = 3;

/***/ })




// eslint-disable-next-line import/prefer-default-export
module.exports.helloworld = function () {
    return "hello world"
}
//转化成
(function(module, exports) {

// eslint-disable-next-line import/prefer-default-export
module.exports.helloworld = function () {
  return "hello world";
};

/***/ }),


````

````javascript
//helloworld.js
module.exports.helloworld = function () {
    return "hello world"
}

module.exports.foo = function () {
    return "foo"
}

//main.js
import helloworld from "./helloworld.js";
console.log(helloworld)

//被转化成

/* harmony import */ var _helloworld_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);

//这里是返回一个 {a: module && module.__esModule ? module['default'] : module}
//也就是当是esModule时返回default, commone module是返回整个module

//那么，当通过es模块的方式去import一个commonjs规范的模块时，就会把require得到的module进行一层包装

//但是用require方式引入es模块却不会出现这个函数

/* harmony import */ var _helloworld_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helloworld_js__WEBPACK_IMPORTED_MODULE_3__);

/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

console.log(_helloworld_js__WEBPACK_IMPORTED_MODULE_3___default.a);

````

+ 当我们用 require 去引入 es 模块的时候 , 导入的是整个包

````javascript
{
    a: 1,
    b: 2,
    default: 3
    __esModule: true
}
````

+ 当我们用 require 去引入 cjs 模块的时候 , 导入的还是是整个包

````javascript
{
    a: 1,
    b: 2,
}
````

+ 当我们用 import 去引入 cjs 模块的时候
    + 默认导入： 这个时候需要去判断是否有 __esModule 属性 , 如果有则导入 default 属性 ， 没有则导入整个包
    +  name import： 对应的是 cjs 上 exports 的相应属性
    +  * import： 导入整个 exports


+ 当我们用 import 去引入 es 模块的时候
    + 默认导入： 直接取 exports 对象的 default 属性
    +  name import： 对应的是 exports 的相应属性
    +  * import： 导入整个 exports


> 这里面需要注意 es 模块会做特殊处理 , 会对默认导出添加到 exports.default , name export 添加到 exports 上 , 并且所有属性都是绑定的 get , 也就是说在 es 模块内部更改一个导出的值 , 相应的导入处也是会改变的 , 不管这个属性是原始值还是对象值

````javascript
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return say; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
function say() {}
let a = 1;

setTimeout(() => {
  a = 2;
});
/***/ }),
````
