/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
  this.min = Infinity;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (this.stack.length === 0) {
    this.min = x;
    this.stack.push(0);
  } else {
    this.stack.push(x - this.min);
    if (x < this.min) {
      this.min = x;
    }
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  let num = this.stack.pop();
  let min = this.min;
  if (num > 0) {
  } else {
    this.min = min - num;
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  let pop = this.stack[this.stack.length - 1];
  if (pop < 0)
    return this.min;
  else 
    return this.min + pop
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());
console.log(minStack.pop());
console.log(minStack.top());
console.log(minStack.getMin());

setTimeout(console.log, 3600 * 60 * 60);
