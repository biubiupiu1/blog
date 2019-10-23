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
import {helloworld, foo} from "./helloworld.js";
console.log(helloworld)
console.log(foo)

//被转化成

/* harmony import */ var _helloworld_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _helloworld_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helloworld_js__WEBPACK_IMPORTED_MODULE_3__);


console.log(_helloworld_js__WEBPACK_IMPORTED_MODULE_3__["helloworld"]);
console.log(_helloworld_js__WEBPACK_IMPORTED_MODULE_3__["foo"]);

````

````javascript
//es6.js
let test = 2;
export default test;
export let test2 = 3;

//main.js
import { default as test, test2 } from "./es6"
console.log(test)
console.log(test2)

//被转化成

/* harmony import */ var _es6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);

console.log(_es6__WEBPACK_IMPORTED_MODULE_4__["default"]);
console.log(_es6__WEBPACK_IMPORTED_MODULE_4__["test2"]);

````

> 以上这两种方法其实没有太大的区别


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