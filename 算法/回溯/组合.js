/**
 * @param {number} n
 * @param {number} k
 * @returns {any}
 */
function solution(n, k, start = 1, stack = [], res = []) {
  if (k <= stack.length) {
    res.push(stack.join(''));
    return res;
  }

  for (let i = start; i <= n; i++) {
    stack.push(i);
    solution(n, k, i + 1, stack, res);
    stack.pop();
  }

  return res;
}

console.log(solution(4, 2));

setTimeout(console.log, 3600 * 60);
