/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
  this.list = [];
  this.hash = {};
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  if (this.hash.hasOwnProperty(val)) return false;
  this.list.push(val);
  this.hash[val] = this.list.length - 1;
  return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  let { list, hash } = this;
  if (!hash.hasOwnProperty(val)) return false;
  let lastVal = list[list.length - 1];
  [list[hash[val]], list[list.length - 1]] = [
    list[list.length - 1],
    list[hash[val]]
  ];
  hash[lastVal] = hash[val];
  list.pop();
  delete hash[val];
  return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
  let r = Math.floor(Math.random() * this.list.length);
  return this.list[r];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

let obj = new RandomizedSet();
console.log(obj.insert(1));
console.log(obj.remove(2));
console.log(obj.insert(2));
console.log(obj.remove(1));
console.log(obj);

setTimeout(console.log, 3600 * 60);
