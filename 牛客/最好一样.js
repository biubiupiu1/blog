let { readline: read_line, print } = require('./profill');
read_line = read_line(`
5 3
3 1 3 2 5 4 0 5 15 121 5 0 0
`);

/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {any}
 */
let handle = function(arr, n) {
  let len = arr.length;
  if (!len) return 0;
  let hash = {};
  for (let i = 0; i < len; i++) {
    let [n1, n2] = [arr[i], arr[i] | n];
    if (n1 === n2) {
      hash[n1] = n1 in hash ? ++hash[n1] : 1;
    } else {
      hash[n1] = n1 in hash ? ++hash[n1] : 1;
      hash[n2] = n2 in hash ? ++hash[n2] : 1;
    }
  }
  let max = -Infinity;
  for (let i in hash) {
    max = Math.max(hash[i], max);
  }
  return max;
};

let s;
while ((s = read_line())) {
  let [n, x] = s.split(' ').map(item => +item);
  arr = read_line()
    .split(' ')
    .map(item => +item);
  print(handle(arr, x));
}

setTimeout(console.log, 3600 * 60);
