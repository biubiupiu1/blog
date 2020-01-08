/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(str) {
  let len = str.length;
  let dp = new Array(len).fill(0);
  dp = dp.map(() => new Array(len).fill(false));

  let maxLen = 0;
  let start = 0;

  if (str.length <= 1) {
    return str;
  }

  for (let i = 0; i < len; i++) {
    dp[i][i] = true;
  }
  for (let j = 1; j < len; j++) {
    for (let i = 0; i < j; i++) {
      if (str[i] === str[j]) {
        if (j - i < 3) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      } else {
        dp[i][j] = false;
      }
      if (dp[i][j]) {
        let temp = j - i + 1;
        if (temp > maxLen) {
          maxLen = temp;
          start = i;
        }
      }
    }
  }
  return str.slice(start, start + maxLen);
};
