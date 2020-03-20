/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets1 = function(nums, start = 0) {
  if (start >= nums.length) return [[]];
  let prev = subsets1(nums, start + 1);
  let len = prev.length;
  for (let i = 0; i < len; i++) {
    let temp = prev[i].slice();
    temp.push(nums[start]);
    prev.push(temp);
  }
  return prev;
};

/**
 * @param {number[]} nums
 * @param {number} start=0
 * @returns {string []}
 */
function subsets2(nums, start = 0, stack = [], res = []) {
  res.push(stack.slice());
  for (let i = start; i < nums.length; i++) {
    stack.push(nums[i]);
    subsets2(nums, i + 1, stack, res);
    stack.pop();
  }
  return res;
}

console.log(subsets2([1, 2, 3]));

setTimeout(console.log, 3600 * 60);
