/**
 * @param {number} n
 * @return {number[]}
 */
var twoSum = function(n) {
  let dp = [];
  dp[1] = new Array(6).fill(1 / 6);
  for (let i = 2; i <= n; i++) {
    dp[i] = [];
    for (let j = i; j <= 6 * i; j++) {
      dp[i][j - 1] = 0;
      for (let k = 1; k <= 6; k++) {
        if (j - k >= i - 1 && j - k <= (i - 1) * 6) {
          dp[i][j - 1] += dp[i - 1][j - k - 1];
        }
      }
      dp[i][j - 1] = dp[i][j - 1] * (1 / 6);
    }
  }
  return dp[n].slice(n - 1);
};

/**
 * @param {number} n
 * @return {number[]}
 */
var twoSum2 = function(n) {
  if (n < 1) {
    return [];
  }
  const res = [0, 1, 1, 1, 1, 1, 1];
  for (let i = 1; i < n; i++) {
    for (let j = 6 * n; j > 0; j--) {
      res[j] = res
        .slice(Math.max(0, j - 6), j)
        .reduce((acc, cur) => acc + cur, 0);
    }
  }
  return res
    .slice(1)
    .map(num => num / Math.pow(6, n))
    .filter(Boolean);
};

console.log(twoSum2(2));

setTimeout(console.log, 3600 * 60);
