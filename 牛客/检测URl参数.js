let { readline, print } = require('./profill');
readline = readline(`
http://www.google.com/?q=sangfor&temp=0
q
`);

let handle = function(url, p) {
  let s = url.split('?')[1];
  if (!s) return false;
  s = s.replace(/#.*/g, '');
  let arr = s.split('&');
  let hash = {};
  arr = arr.forEach(item => {
    if (!item) return;
    item = item.trim();
    let temp = item.split('=');
    hash[decodeURIComponent(temp[0])] = temp[1];
  });
  return hash.hasOwnProperty(p);
};

let url;

while ((url = readline())) {
  let p = readline();
  print(handle(url, p));
}
