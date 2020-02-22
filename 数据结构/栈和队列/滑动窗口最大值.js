/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  if (!nums.length) return [];
  let temp = [];
  let res = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (temp[0] <= i - k) {
      temp.shift();
    }
    let j = temp.length - 1;
    while (j >= 0 && nums[temp[j]] < nums[i]) {
      temp.pop();
      j--;
    }
    temp.push(i);
    if (i >= k - 1) {
      res.push(nums[temp[0]]);
    }
  }
  return res;
};

console.log(maxSlidingWindow([1], 1));

setTimeout(console.log, 3600 * 60);
