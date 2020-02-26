/**
 * 动态规划，dp[i][0] 表示前 i 个乘积最大的值 dp[i][0] = Math.max(
      nums[i],
      nums[i] * dp[i - 1][0],
      nums[i] * dp[i - 1][1]
    );
    他是一定包括 nums[i] 的

    为了防止负负得正的情况 , 我们还需要维护一个最小值 dp[i][1]
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let len = nums.length;
  if (!len) return 0;
  let dp = [];
  for (let i = 0; i < len; i++) {
    dp[i] = [];
  }
  dp[0][0] = nums[0];
  dp[0][1] = nums[0];
  let max = nums[0];
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(
      nums[i],
      nums[i] * dp[i - 1][0],
      nums[i] * dp[i - 1][1]
    );
    dp[i][1] = Math.min(
      nums[i],
      nums[i] * dp[i - 1][1],
      nums[i] * dp[i - 1][0]
    );
    max = Math.max(dp[i][0], max);
  }
  return max;
};

console.log(maxProduct([-1, -2, -9, -6]));

setTimeout(console.log, 3600 * 60);
