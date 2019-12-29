import * as lib1 from './lib';
import lib2 from './lib';
import { default as lib3 } from './lib';
import { a, b } from './lib';
const lib4 = require('./lib');

import { c, d } from './cjs';
import cjs1 from './cjs';
import * as cjs2 from './cjs';

console.log(lib1);
console.log(lib2);
console.log(lib3);
console.log(a);
setTimeout(() => {
  console.log('setTimeout a: ', a);
}, 100);
console.log(b);
console.log(lib4);

console.log(c);
console.log(d);
console.log(cjs1);
console.log(cjs2);
