let { readline, print } = require('./profill');
readline = readline(`
43487 0
`);

/**
 * @param {number} n
 * @param {number} k
 * @returns {number}
 */
let handle = function(n, k) {
  let total = 0;

  for (let i = k + 1; i <= n; i++) {
    let d = (n / i) >> 0;
    let mod = n % i;
    total += (i - k) * d;
    if (mod >= k) {
      if (k) {
        total += mod - k + 1;
      } else {
        total += mod;
      }
    }
  }

  return total;
};

let s;
while ((s = readline())) {
  let [m, n] = s.split(' ');
  print(handle(+m, +n));
}

setTimeout(console.log, 3600 * 60);
