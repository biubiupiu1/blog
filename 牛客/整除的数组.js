let { readline: read_line, print } = require('./profill');
read_line = read_line(`
9 1 1 3
`);

/**
 * @param {number} n
 * @param {number} k
 * @param {number} L
 * @param {number} R
 * @returns {number}
 */
let handle = function(n, k, L, R) {
  let num = ((R / k) >> 0) - (((L - 1) / k) >> 0);
  let res = 1;
  if (!num) return 0;
  for (let i = 0; i < n; i++) {
    res = ((res * num) % (1e9 + 7));
  }
  return res;
};

let s;

while ((s = read_line())) {
  let [n, k, L, R] = s.split(' ').map(item => +item);
  print(handle(n, k, L, R));
}

setTimeout(console.log, 3600 * 60);
