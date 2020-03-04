let { readline, print } = require('./profill');
readline = readline(`
3 3
1
2
3
`);

/**
 * @param {number[]} arr
 * @param {number} n
 * @param {number} index
 * @param {number []} stack
 * @returns {string[]}
 */
let handle = function(arr, n, index, stack) {
  let item = +arr[index];
  if (index === arr.length) {
    if (n === 0) {
      print(stack.join(''));
    }
    return;
  }
  for (let i = 0; i <= Math.min(n, item); i++) {
    stack.push(i);
    handle(arr, n - i, index + 1, stack);
    stack.pop();
  }
};

let arr = [];
let n = +readline().split(' ')[1];
while ((s = readline())) {
  arr.push(+s);
}

handle(arr, n, 0, []);

setTimeout(console.log, 3600 * 60);
