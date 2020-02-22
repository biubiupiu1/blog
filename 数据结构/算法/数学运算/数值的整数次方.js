/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n === -1) return 1 / x;
  let half = myPow(x, (n / 2) >> 0);
  let mod = myPow(x, n % 2);
  return half * half * mod;
};

console.log(myPow(2, -2));

setTimeout(console.log, 3600 * 60);
