/**
 * 描述 连续子数组的最大和
 * @date 2020-02-13
 * @param {Array} array
 * @returns {Number}
 */
function FindGreatestSumOfSubArray(array) {
  let prev = array[0];
  let max = prev;
  let len = array.length;
  for (let i = 1; i < len; i++) {
    let item = array[i];
    if (prev + item < item) {
      prev = item;
    } else {
      prev += item;
    }
    max = Math.max(prev, max);
  }
  return max;
}

console.log(FindGreatestSumOfSubArray([6, -3, -2, 7, -15, 1, 2, 2]));

setTimeout(console.log, 3600 * 60);
