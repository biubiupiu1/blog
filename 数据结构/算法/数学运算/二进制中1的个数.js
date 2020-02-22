/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let res = 0;
  let flag = 1;
  while (flag) {
    if (flag & n) res++;
    flag = flag << 1;
  }
  return res;
};

console.log(hammingWeight(11));

setTimeout(console.log, 3600 * 60);
