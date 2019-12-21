/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
  let len = s.length;
  let i = 0;
  let total = 0;
  while (i < len) {
    let ac = s[i].charCodeAt() - 65;
    total += ac * Math.pow(26, len - i - 1);
    i++;
  }
  return total;
};
