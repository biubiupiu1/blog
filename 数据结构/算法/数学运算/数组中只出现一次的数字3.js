/** 这里 3 可以为任何数
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let len = nums.length;
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    let count = 0;
    for (let j = 0; j < len; j++) {
      if ((nums[j] >>> i) & 1) {
        count++;
      }
    }
    if (count % 3) {
      ans = ans | (1 << i);
    }
  }
  return ans;
};

console.log(singleNumber([0, 2, 2, 2]));

setTimeout(console.log, 3600 * 60);
