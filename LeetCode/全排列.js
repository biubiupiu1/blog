/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let len = nums.length;
  if (len <= 1) {
    return [nums];
  }

  let res = [];

  for (let i = 0; i < len; i++) {
    let item = nums[i];
    let sub = nums.slice(0, i).concat(nums.slice(i + 1));
    sub = permute(sub);
    sub = sub.map(cur => [item].concat(cur));
    res = res.concat(sub);
  }

  return res;
};

console.log(permute([1, 2, 3]));

setTimeout(console.log, 3600 * 60);
