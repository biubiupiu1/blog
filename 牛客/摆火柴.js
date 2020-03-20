let { readline, print } = require('./profill');
readline = readline(`
20 4
3 7 8 4
`);

const CONFIG = [2, 5, 5, 4, 5, 6, 3, 7, 6];

/**
 * @param {number []} arr
 * @param {number} n
 * @returns {any}
 */
function handle(arr, n) {
  arr = arr.sort((a, b) => {
    let ta = CONFIG[a - 1];
    let tb = CONFIG[b - 1];
    if ((ta === tb)) {
      return b - a;
    } else {
      return CONFIG[a - 1] - CONFIG[b - 1];
    }
  });

  return DFS(arr, n, []);
}

function DFS(arr, n, stack) {
  if (n === 0) return stack;
  if (n < 0) return null;
  for (let i = 0; i < arr.length; i++) {
    stack.push(arr[i]);
    let temp = DFS(arr, n - CONFIG[arr[i] - 1], stack);
    if (temp) return +stack.join('');
    stack.pop();
  }
}

let s;
while ((s = readline())) {
  let [m, n] = s.split(' ');
  let arr = readline()
    .split(' ')
    .map(item => +item);
  print(handle(arr, +m));
}

setTimeout(console.log, 3600 * 60);
