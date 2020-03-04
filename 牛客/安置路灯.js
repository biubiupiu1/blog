let { readline, print } = require('./profill');
readline = readline(`
2
3
X
11
...XX....XX
`);

/**
 * @param {string} s
 * @returns {number}
 */
var handle = function(s) {
  let len = s.length;
  let dp = [];
  for (let i = 0; i < len; i++) {
    if (s[i] === 'X') {
      dp[i] = dp[i - 1] || 0;
    } else {
      dp[i] = (dp[i - 3] || 0) + 1;
    }
  }
  return dp[len - 1];
};

let n;
readline();
while ((n = readline())) {
  let s = readline();
  print(handle(s));
}

setTimeout(console.log, 3600 * 60);
