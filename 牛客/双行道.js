let { readline: read_line, print } = require('./profill');
read_line = read_line(`
5
..X.X
XX...
`);

/**
 * @param {string[][]} arr
 * @returns {any}
 */
let handle = function(arr) {
  let len = arr[0].length;
  if(!len) return 0;
  let dp = [[], []];
  dp[0][0] = arr[0][0] === 'X' ? 0 : 1;
  dp[1][0] = 0;
  for (let i = 1; i < len; i++) {
    dp[0][i] = arr[0][i] === 'X' ? 0 : dp[0][i - 1] + dp[1][i - 1];
    dp[1][i] = arr[1][i] === 'X' ? 0 : dp[0][i - 1] + dp[1][i - 1];
  }
  return dp[1][len - 1] === 0 ? -1 : dp[1][len - 1];
};

let s;
let n = +read_line();
let arr = [];
while ((s = read_line())) {
  let s2 = read_line();
  arr.push(s.split(''));
  arr.push(s2.split(''));
  print(handle(arr, +n));
}

setTimeout(console.log, 3600 * 60);
