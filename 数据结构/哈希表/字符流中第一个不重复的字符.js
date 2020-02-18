/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let arr = s.split('');
  let len = arr.length;
  let hash = {};
  for (let i = 0; i < len; i++) {
    let item = arr[i];
    if (hash.hasOwnProperty(item)) {
      hash[item]++;
    } else {
      hash[item] = 1;
    }
  }
  for (let i = 0; i < len; i++) {
    if (hash[arr[i]] === 1) return i;
  }
  return -1;
};


console.log(firstUniqChar("leetcode"));

setTimeout(console.log, 3600 * 60);