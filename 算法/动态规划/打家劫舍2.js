/**
 * 这里因为首尾不能同时偷，就会出现后面的 dp 选择影响到前面的 dp 结果 
 * 所以我们可以将队列分为两个 0 -> n - 1 和 1 -> n;
 * 分别进行计算，然后取最大的
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let len = nums.length;
  if (!len) return 0;
  if (len < 2) return nums[0];
  let dp = [];
  for (let i = 0; i < len; i++) {
    dp.push([]);
  }
  dp[0][0] = 0;
  dp[0][1] = nums[0];

  for (let i = 1; i < len - 1; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  let max = Math.max(...dp[len - 2]);

  dp[1][0] = 0;
  dp[1][1] = nums[1];

  for (let i = 2; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  return Math.max(...dp[len - 1], max);
};

console.log(rob([1, 2, 3, 1]));

setTimeout(console.log, 3600 * 60);
