/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  return nums.reduce((acc, item) => {
    return acc ^ item;
  });
};

console.log(singleNumber([1, 1, 2, 4, 4]));

setTimeout(console.log, 3600 * 60);
