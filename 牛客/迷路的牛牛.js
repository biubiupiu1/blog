let { readline, print } = require('./profill');
readline = readline(`
3
LRR
`);

/**
 * @param {string} s
 * @returns {string}
 */
let handle = function(s) {
  let index = 0;
  let len = s.length;
  for (let i = 0; i < len; i++) {
    if (s[i] === 'R') {
      index++;
    } else {
      index--;
    }
  }
  let hash = ['N', 'E', 'S', 'W'];
  index = index % 4;
  index = index > 0 ? index : index + 4;
  index = index % 4;
  return hash[index];
};

let n;
while ((n = readline())) {
  let s = readline();
  print(handle(s));
}

setTimeout(console.log, 3600 * 60);
