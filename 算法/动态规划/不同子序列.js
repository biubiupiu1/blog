/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
  let lenS = s.length;
  let lenT = t.length;
  let dp = new Array(lenT + 1).fill(1);
  dp = dp.map(() => []);
  for (let i = 0; i <= lenS; i++) {
    dp[0][i] = 1;
  }
  for (let i = 1; i <= lenT; i++) {
    dp[i][0] = 0;
  }

  for (let i = 1; i <= lenT; i++) {
    for (let j = 1; j <= lenS; j++) {
      if (t[i - 1] === s[j - 1]) {
        dp[i][j] = dp[i][j - 1] + dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  return dp[lenT][lenS];
};

console.log(numDistinct('babgbag', 'bag'));

setTimeout(console.log, 3600 * 60);
