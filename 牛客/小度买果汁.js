let { readline, print } = require('./profill');
readline = readline(`
5 3
1 2 1 1 2
`);

/**
 * @param {number []} arr
 * @param {number} n
 * @returns {any}
 */
function handle(arr, n) {
  let hash = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    hash[item] = item in hash ? ++hash[item] : 1;
  }

  let num = 0;

  for (let i in hash) {
    num += Math.ceil(hash[i] / 2);
  }

  return num;
}

let s;
while ((s = readline())) {
  let [m, n] = s.split(' ');
  let arr = readline()
    .split(' ')
    .map(item => +item);
  print(handle(arr, +n));
}

setTimeout(console.log, 3600 * 60);
