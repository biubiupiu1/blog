/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
  this.minnum = Infinity;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (this.stack.length === 0) {
    this.stack.push(0);
    this.minnum = x;
    return;
  }
  this.stack.push(x - this.minnum);
  if (x < this.minnum) {
    this.minnum = x;
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  let pop = this.stack.pop();
  if (pop < 0) {
    let res = this.minnum;
    this.minnum = this.minnum - pop;
    return res;
  } else {
    return pop + this.minnum;
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  let top = this.stack[this.stack.length - 1];
  if (top < 0) {
    return this.minnum;
  } else {
    return top + this.minnum;
  }
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
  return this.minnum;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */

let obj = new MinStack();
obj.push(1);
obj.push(1);
obj.push(2147483647);

obj.pop();
obj.pop();
obj.pop();

obj.push(2147483647);
console.log(obj.top());
console.log(obj.min());

setTimeout(console.log, 3600 * 60);
