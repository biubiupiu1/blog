/**
 * 迭代算法，寻找最小值之后与峰值的最大差值，即为股票的最佳时机
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0];
  let res = 0;
  let len = prices.length;

  for (let i = 1; i < len; i++) {
    res = Math.max(prices[i] - min, res);
    min = Math.min(prices[i], min);
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
  let dp = [];
  for (let i = 0; i < len; i++) {
    dp.push([]);
  }
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }

  return dp[len - 1][0];
};

console.log(maxProfit2([7, 1, 5, 3, 6, 4]));

setTimeout(console.log, 3600 * 60);
