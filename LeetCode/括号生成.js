/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let res = [];
  function loop(left, right, str) {
    if (left > n || right > left) return;
    if (left === n && right === n) {
      res.push(str);
    }
    loop(left + 1, right, str + '(');
    loop(left, right + 1, str + ')');
  }
  loop(0, 0, '');
  return res;
};

console.log(generateParenthesis(3));

setTimeout(console.log, 3600 * 60);
