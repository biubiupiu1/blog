/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
  let lenJ = J.length;
  let lenS = S.length;
  let hash = {};
  let result = 0;

  for (let i = 0; i < lenJ; i++) {
    hash[J[i]] = 1;
  }

  for (let i = 0; i < lenS; i++) {
    if (hash[S[i]]) {
      result++;
    }
  }

  return result;
};

console.log(numJewelsInStones('aA', 'aAAbbbb'));

setTimeout(console.log, 3600 * 60);
