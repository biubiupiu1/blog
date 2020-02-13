/**
 * 描述 两数之和
 * @date 2020-02-04
 * @param {Array} arr
 * @param {Number} sum
 * @returns {Array}
 */
function twoSum(arr, sum) {
  let len = arr.length;
  let map = {};
  for (let i = 0; i < len; i++) {
    if (map[sum - arr[i]]) {
      return [sum - arr[i], arr[i]];
    } else {
      map[arr[i]] = 1;
    }
  }
  return [];
}

console.log(twoSum([1, 2, 3, 5, 7, 10], 12));

setTimeout(console.log, 3600 * 60);
