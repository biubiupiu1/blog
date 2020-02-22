/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n = 8103) {
  let total = 0;

  let len = n.toString().length;

  for (let i = 0; i < len; i++) {
    let m = Math.pow(10, i);
    let low = n % m;
    let mid = ((n / m) >> 0) % 10;
    let hight = (n / m / 10) >> 0;
    if (mid > 1) {
      total += (hight + 1) * m;
    } else if (mid === 1) {
      total += hight * m + low + 1;
    } else {
      total += hight * m;
    }
  }
  return total;
};

console.log(countDigitOne(8103));

setTimeout(console.log, 3600 * 60);
