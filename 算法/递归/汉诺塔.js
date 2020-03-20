/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
  if (!A.length) return C;
  move(A, C, B, A.length);
  return C;
};

var move = function(_from, _to, _cache, n) {
  if (n === 1) {
    _to.push(_from.pop());
  } else {
    move(_from, _cache, _to, n - 1);
    _to.push(_from.pop());
    move(_cache, _to, _from, n - 1);
  }
};

console.log(hanota([3], [], []));

setTimeout(console.log, 3600 * 60);
