/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
  let num = 0;
  for (let i = 1; i <= 10; i++) {
    let j = Math.pow(10, i - 1);
    let cur = i * j * 9;
    num += cur;
    if (num >= n) {
      let index = n - (num - cur);
      let dit = index / i;
      let bb = index % i;
      let temp = (j + dit - (bb ? 0 : 1)).toString();
      return temp[bb ? bb - 1 : temp.length - 1];
    }
  }
};

console.log(findNthDigit(15));

setTimeout(console.log, 3600 * 60);
