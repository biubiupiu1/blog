/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
  var hash = {};
  for (let i = 0; i < m; i++) {
    hash[i] = [];
  }
  function dfs(i, j) {
    if (sum(i, j) > k) return 0;
    else {
      hash[i][j] = 1;
      let right = j < n - 1 && !hash[i][j + 1] ? dfs(i, j + 1) : 0;
      let bot = i < m - 1 && !hash[i + 1][j] ? dfs(i + 1, j) : 0;
      return right + bot + 1;
    }
  }
  return dfs(0, 0, k);
};

function sum(num1, num2) {
  let total = 0;
  while (num1) {
    let n = num1 % 10;
    total += n;
    num1 = (num1 / 10) >> 0;
  }

  while (num2) {
    let n = num2 % 10;
    total += n;
    num2 = (num2 / 10) >> 0;
  }
  return total;
}

console.log(movingCount(3, 2, 17));

setTimeout(console.log, 3600 * 60);
