/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let len = nums.length;
  if (!len) return 0;
  let pre = nums[0];
  let max = nums[0];
  for (let i = 1; i < len; i++) {
    pre = Math.max(nums[i], nums[i] + pre);
    max = Math.max(max, pre);
  }
  return max;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

setTimeout(console.log, 3600 * 60);
