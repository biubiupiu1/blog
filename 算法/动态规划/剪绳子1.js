/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;
  function loop(num) {
    if (dp[num]) return dp[num];
    let max = 1;
    for (let i = 2; i < num; i++) {
      max = Math.max(max, i * loop(num - i), i * (num - i));
    }
    dp[num] = max;
    return max;
  }
  return loop(n);
};

console.log(cuttingRope(10));

setTimeout(console.log, 3600 * 60);
