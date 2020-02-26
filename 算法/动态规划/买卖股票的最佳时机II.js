/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let len = prices.length;
  let res = 0;

  for (let i = 1; i < len; i++) {
    if (prices[i] > prices[i - 1]) res += prices[i] - prices[i - 1];
  }

  return res;
};

/**
 * 动态规划，二维数组的[x][y]  x 代表天数 , y 代表是否持股 (0不持股, 1持股)
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit2 = function(prices) {
  let len = prices.length;
  if (!len) return 0;
  let dp = [];
  for (let i = 0; i < len; i++) {
    dp.push([]);
  }
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[len - 1][0];
};

console.log(maxProfit2([7, 1, 5, 3, 6, 4]));

setTimeout(console.log, 3600 * 60);
