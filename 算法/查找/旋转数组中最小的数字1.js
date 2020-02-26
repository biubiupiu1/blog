/**
 * 寻找旋转数组的旋转点 ，即 nums[mid] < nums[mid - 1]
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let len = nums.length;
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    } else if (nums[mid] < nums[left]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return nums[0];
};
