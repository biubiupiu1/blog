let { readline, print } = require('./profill');
readline = readline(`
5,4,3,2,100,101-105,103
`);

/**
 * @param {number[][]} arr
 * @returns {any}
 */
let handle = function(arr) {
  arr = arr.sort((a, b) => a[0] - b[0]);
  let res = [];
  let len = arr.length;
  let start = arr[0][0];
  let end = arr[0][1];
  for (let i = 1; i < len; i++) {
    if (arr[i][0] <= end + 1) {
      end = Math.max(arr[i][1], end);
    } else {
      res.push([start, end]);
      start = arr[i][0];
      end = arr[i][1];
    }
  }
  res.push([start, end]);
  return res;
};

let port;

while ((port = readline())) {
  let arr = port.split(',');
  arr = arr.map(item => {
    if (item.indexOf('-') !== -1) {
      let temp = item.split('-');
      return [+temp[0], +temp[1]];
    } else {
      return [+item, +item];
    }
  });
  let res = handle(arr);
  res = res.map(item => {
    if (item[0] === item[1]) {
      return item[0];
    } else {
      return item.join('-');
    }
  });
  print(res.join());
}
