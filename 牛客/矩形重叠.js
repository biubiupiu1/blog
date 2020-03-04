let { readline, print } = require('./profill');
readline = readline(`
2
0 90
0 90
100 200
100 200
`);

/**
 * @param {number []} x1
 * @param {number []} x2
 * @param {number []} y1
 * @param {number []} y2
 * @returns {number}
 */
let handle = function(x1, x2, y1, y2) {
  let n = x1.length;

  let total = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let temp = 0;
      let sx = +x1[i];
      let sy = +y1[j];
      for (let k = 0; k < n; k++) {
        if (sx >= +x1[k] && sx < +x2[k] && sy >= +y1[k] && sy < +y2[k]) {
          temp++;
        }
      }
      total = Math.max(total, temp);
    }
  }

  return total;
};

let n;
readline();
let x1 = [];
let x2 = [];
let y1 = [];
let y2 = [];
x1 = readline().split(' ');
y1 = readline().split(' ');
x2 = readline().split(' ');
y2 = readline().split(' ');
print(handle(x1, x2, y1, y2));
