let arr = [1, 2];
for (let key in arr) {
    console.log(key, arr[key]);
}
let myClass = function() {
    this.a = 1;
    this.b = 2;
};
myClass.prototype.c = 3;
// let obj = new myClass();
// for (let key in obj) {
//     console.log(key, obj[key]);
// }
let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
}
let $iterator1 = iterable[Symbol.iterator]();
console.log($iterator1.next(), $iterator1.next());
let $iterator2 = iterable[Symbol.iterator]();
console.log($iterator2.next(), $iterator2.next());


let map = new Map().set('a', 1).set('b', 2);
for (let [key, val] of map) {
    console.log(key, val);
}

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
let arr1Iterator = arr1[Symbol.iterator]();
let arr2Iterator = arr2[Symbol.iterator]();
console.log(arr1Iterator === arr1Iterator[Symbol.iterator]());
console.log(arr2Iterator === arr1Iterator[Symbol.iterator]())
