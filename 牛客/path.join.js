let { readline, print } = require('./profill');
readline = readline(`
/,abc/,/def/,g
//,//abc/,/def/,.././g/
/,abc/,/def/,g
`);

const path1 = require('path');

/**
 * @param {string} s
 * @returns {string}
 */
let handle = function(s) {
  s = s.split(',');
  let res = [];

  s.forEach((item, index) => {
    let temp = item.split('/');
    temp.forEach(cur => {
      if (cur === '..') {
        res.pop();
      }
    });
    item = item.replace(/^(\.+\/)+/g, '');
    if (item) res.push(item);
  });

  return res.reduce((acc, item) => {
    acc = acc.replace(/\/+$/g, '');
    item = item.replace(/^\/+/g, '');
    return acc + '/' + item;
  }, '');
};

let path;

while ((path = readline())) {
  print(handle(path));
  console.log(path1.join(...path.split(',')));
}

console.log('../d/'.split('/'));
