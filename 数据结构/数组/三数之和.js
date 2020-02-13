/**
 * 描述 三数之和
 * @date 2020-02-12
 * @param {Array} nums
 * @returns {Array}
 */
function threeSum(nums) {
  let res = [];
  let len = nums.length;

  nums.sort((a, b) => a - b);

  for (let j = 0; j < len - 2; j++) {
    if (nums[j] === nums[j - 1]) continue;
    let start = j + 1;
    let end = len - 1;
    while (start < end) {
      let curNum = nums[j] + nums[start] + nums[end];
      if (curNum > 0) {
        end--;
      } else if (curNum < 0) {
        start++;
      } else {
        res.push([nums[j], nums[start], nums[end]]);
        while (nums[start] === nums[++start]) {}
        while (nums[end] === nums[--end]) {}
      }
    }
  }

  return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

setTimeout(console.log, 3600 * 60);
