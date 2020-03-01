/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  let lenS = s.length;
  let lenP = p.length;
  let dp = [];
  for (let i = 0; i <= lenS; i++) {
    dp[i] = [!i];
  }
  for (let i = 1; i <= lenP; i++) {
    if (p[i - 1] === '*') {
      dp[0][i] = dp[0][i - 2];
    } else {
      dp[0][i] = false;
    }
  }

  for (let i = 1; i <= lenS; i++) {
    for (let j = 1; j <= lenP; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        dp[i][j] =
          dp[i][j - 2] ||
          ((p[j - 2] === s[i - 1] || p[j - 2] === '.') && dp[i - 1][j]);
      } else {
        dp[i][j] = false;
      }
    }
  }

  return dp[lenS][lenP];
};

console.log(isMatch('aa', '..'));

setTimeout(console.log, 3600 * 60);
