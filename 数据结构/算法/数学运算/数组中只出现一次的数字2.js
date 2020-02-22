/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let n = nums.reduce((acc, item) => {
    return acc ^ item;
  });
  let bit = 1;
  let index = 0;
  while (bit) {
    if (bit & n) {
      break;
    }
    index++;
    bit = bit << 1;
  }
  let len = nums.length;
  let res1 = 0;
  let res2 = 0;
  for (let i = 0; i < len; i++) {
    if (isIndexOne(nums[i], index)) {
      res1 = res1 ^ nums[i];
    } else {
      res2 = res2 ^ nums[i];
    }
  }
  return [res1, res2];
};

function isIndexOne(num, index) {
  return 1 & (num >> index);
}

console.log(singleNumber([0, 0, 1, 2]));

setTimeout(console.log, 3600 * 60);
