/**
 * 描述 和为S的两个数字
 * 
 * 双指针
 * 
 * @date 2020-02-04
 * @param {Array} arr
 * @param {Number} sum
 * @returns {Array}
 */
function FindNumbersWithSum(arr, sum) {
  let len = arr.length;
  let start = 0;
  let end = len - 1;

  while (start < end) {
    let num = arr[start] + arr[end];
    if (num < sum) {
      start++;
    } else if (num > sum) {
      end--;
    } else {
      return [arr[start], arr[end]];
    }
  }

  return [];
}

console.log(FindNumbersWithSum([1, 2, 3, 5, 7, 10], 8));

setTimeout(console.log, 3600 * 60);
