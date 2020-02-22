/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  let arr = [1];
  let i = 0;
  let j = 0;
  let k = 0;
  while (arr.length < n) {
    arr.push(Math.min(arr[i] * 2, arr[j] * 3, arr[k] * 5));
    let cur = arr[arr.length - 1];
    while (arr[i] * 2 <= cur) {
      i++;
    }
    while (arr[j] * 3 <= cur) {
      j++;
    }
    while (arr[k] * 5 <= cur) {
      k++;
    }
  }
  return arr[arr.length - 1];
};

console.log(nthUglyNumber(10));

setTimeout(console.log, 3600 * 60);
