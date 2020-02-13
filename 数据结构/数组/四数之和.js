/**
 * 描述 四数之和
 * @date 2020-02-12
 * @param {Array} nums
 * @param {Number} target
 * @returns {Array}
 */
function fourSum(nums, target) {
  let res = [];
  let len = nums.length;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < len - 3; i++) {
    if (nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let start = j + 1;
      let end = len - 1;
      while (start < end) {
        let curSum = nums[i] + nums[j] + nums[start] + nums[end];
        if (curSum < target) {
          start++;
        } else if (curSum > target) {
          end--;
        } else {
          res.push([nums[i], nums[j], nums[start], nums[end]]);
          while (nums[start] === nums[++start]) {}
          while (nums[end] === nums[--end]) {}
        }
      }
    }
  }

  return res;
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));

setTimeout(console.log, 3600 * 60);
