/**
 * 例如 [1, 0, 1, 1, 1] 和 [1, 1, 1, 0, 1] ，在 left = 0, right = 4, mid = 2 时，无法判断 midmid 在哪个排序数组中。
  我们采用 left++ 解决此问题，
  因为 left 不是唯一解，如果是唯一解那么就不会 nums[mid] == nums[left];
 * @param {number[]} nums
 * @return {number}
 */
var minArray = function(nums) {
  let len = nums.length;
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    // 当前数组没有翻转
    if (nums[left] < nums[right]) {
      return nums[left];
    }
    let mid = (left + right) >> 1;
    // 即使转折点
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];
    } else if (nums[left] == nums[mid]) {
      left++;
    } else if (nums[mid] < nums[left]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return nums[right];
};
