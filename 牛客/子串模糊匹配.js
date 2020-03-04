let { readline, print } = require('./profill');
readline = readline(`
aabcddefg
a?d
`);

/**
 * @param {string} s
 * @param {string} p
 * @returns {number}
 */
let handle = function(s, p, i, j) {
  if (!i) i = 0;
  if (!j) j = 0;

  if (j === p.length) return 0;
  if (i >= s.length) return -1;

  if (s[i] === p[j]) {
    let next = handle(s, p, i + 1, j + 1);
    if (next === -1) return -1;
    else {
      return next + 1;
    }
  } else if (p[j] === '?') {
    let t1 = handle(s, p, i + 1, j + 1);
    let t2 = handle(s, p, i + 2, j + 1);
    let t3 = handle(s, p, i + 3, j + 1);
    t1 = t1 === -1 ? Infinity : t1 + 1;
    t2 = t2 === -1 ? Infinity : t2 + 2;
    t3 = t3 === -1 ? Infinity : t3 + 3;
    let min = Math.min(t1, t2, t3);
    return min === Infinity ? -1 : min;
  } else {
    return -1;
  }
};

let s;
while ((s = readline())) {
  let p = readline();
  print(handle(s, p));
}
