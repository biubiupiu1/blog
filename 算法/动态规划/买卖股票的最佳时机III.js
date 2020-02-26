/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let len = prices.length;
  if (!len) return 0;
  let dp = [];
  for (let i = 0; i < len; i++) {
    dp.push([]);
  }
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  for (let i = 2; i < 5; i++) {
    dp[0][i] = -Infinity;
  }

  let res = 0;

  for (let i = 1; i < len; i++) {
    dp[i][0] = 0;
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
    dp[i][4] = Math.max(dp[i - 1][3] + prices[i], dp[i - 1][4]);
    res = Math.max(res, dp[i][0], dp[i][1], dp[i][2], dp[i][3], dp[i][4]);
  }

  return res;
};

console.log(maxProfit([3, 2, 6, 5, 0, 3]));

setTimeout(console.log, 3600 * 60);
