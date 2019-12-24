/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  let stack = [];
  let symbol = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (a / b) >> 0
  };

  tokens.forEach(item => {
    let handle = symbol[item];
    if (handle) {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(handle(+a, +b));
    } else {
      stack.push(item);
    }
  });

  return stack[0];
};

console.log(evalRPN(['4', '13', '5', '/', '+']));
