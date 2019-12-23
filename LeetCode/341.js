// /**
//  * // This is the interface that allows for creating nested lists.
//  * // You should not implement it, or speculate about its implementation
//  * function NestedInteger() {
//  *
//  *     Return true if this NestedInteger holds a single integer, rather than a nested list.
//  *     @return {boolean}
//  *     this.isInteger = function() {
//  *         ...
//  *     };
//  *
//  *     Return the single integer that this NestedInteger holds, if it holds a single integer
//  *     Return null if this NestedInteger holds a nested list
//  *     @return {integer}
//  *     this.getInteger = function() {
//  *         ...
//  *     };
//  *
//  *     Return the nested list that this NestedInteger holds, if it holds a nested list
//  *     Return null if this NestedInteger holds a single integer
//  *     @return {NestedInteger[]}
//  *     this.getList = function() {
//  *         ...
//  *     };
//  * };
//  */
// /**
//  * @constructor
//  * @param {NestedInteger[]} nestedList
//  */
// var NestedIterator = function(nestedList) {
//   const flat = arr => {
//     return arr.reduce((acc, cur) => {
//       return acc.concat(cur.isInteger() ? cur.getInteger() : flat(cur.getList()));
//     }, []);
//   };
//   this.arr = flat(nestedList);
//   this.index = 0;
// };

// /**
//  * @this NestedIterator
//  * @returns {boolean}
//  */
// NestedIterator.prototype.hasNext = function() {
//   return this.index < this.arr.length;
// };

// /**
//  * @this NestedIterator
//  * @returns {integer}
//  */
// NestedIterator.prototype.next = function() {
//   return this.arr[this.index++];
// };

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
  this.list = nestedList;
  this.it = null;
  this.index = 0;
};

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  if (this.it != null) {
    if (this.it.hasNext()) return true;
    this.index++;
    this.it = null;
  }
  if (this.index >= this.list.length) return false;
  let integer = this.list[this.index];
  if (integer.isInteger()) {
    return true;
  } else {
    this.it = new Iterator(integer.getList());
    return this.hasNext();
  }
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  if (this.it) {
    if (this.it.hasNext()) {
      return this.it.next();
    } else {
      this.it = null;
      this.index++;
    }
  }
  let cur = this.list[this.index];
  if (!cur.isInteger) {
    this.it = new Iterator(cur.getList());
    return this.next();
  } else {
    this.index++;
    return cur.getInteger();
  }
};

setTimeout(() => {}, 3600 * 60);
