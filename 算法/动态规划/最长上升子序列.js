/**
 * 遍历每一个的时候往前找所有比当前数字小的数, 然后选其中 dp 最大的数
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  let len = nums.length;
  if (!len) return 0;
  let dp = [];
  dp[0] = 1;
  let max = 1;
  for (let i = 1; i < len; i++) {
    let j = i;
    let temp = 0;
    while (j > 0) {
      if (nums[i] > nums[j - 1]) {
        temp = Math.max(dp[j - 1], temp);
      }
      j--;
    }
    dp[i] = temp + 1;
    max = Math.max(max, dp[i]);
  }
  return max;
};

console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]));

setTimeout(console.log, 3600 * 60);
