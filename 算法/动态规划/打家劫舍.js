/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let len = nums.length;
  if (!len) return 0;
  let dp = [];
  for (let i = 0; i < len; i++) {
    dp.push([]);
  }
  dp[0][0] = 0;
  dp[0][1] = nums[0];

  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  return Math.max(...dp[len - 1]);
};

console.log(rob([2, 7, 9, 3, 1]));

setTimeout(console.log, 3600 * 60);
