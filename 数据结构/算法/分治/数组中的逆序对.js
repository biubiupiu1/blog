/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums, left = 0, right = nums.length - 1) {
  if (left >= right) return 0;
  let mid = ((left + right) / 2) >> 0;
  let i = reversePairs(nums, left, mid);
  let j = reversePairs(nums, mid + 1, right);
  let m = merge(nums, left, right, mid);
  return i + j + m;
};

/**
 * 描述 合并数组
 * @date 2020-02-19
 * @param {number []} nums
 * @param {number} left
 * @param {number} right
 * @param {number} mid
 * @returns {any}
 */
var merge = function(nums, left, right, mid) {
  let i = mid;
  let j = right;
  let temp = [];
  let count = 0;
  let tempIndex = right - left;
  while (i >= left && j >= mid + 1) {
    if (nums[i] > nums[j]) {
      temp[tempIndex--] = nums[i--];
      count += j - mid;
    } else {
      temp[tempIndex--] = nums[j--];
    }
  }
  while (i >= left) {
    temp[tempIndex--] = nums[i--];
  }
  while (j >= mid + 1) {
    temp[tempIndex--] = nums[j--];
  }
  for (let i = 0; i < temp.length; i++) {
    nums[i + left] = temp[i];
  }
  return count;
};

let arr = [1, 3, 2, 3, 1];

console.log(reversePairs(arr));
console.log(arr);

setTimeout(console.log, 3600 * 60);
