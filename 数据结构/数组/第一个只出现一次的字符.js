/**
 * 描述 第一次出现一次的字符
 * @date 2020-02-13
 * @param {String} str
 * @returns {String}
 */
function FirstNotRepeatingChar1(str) {
  let arr = str.split('');
  let len = arr.length;
  let hash = {};
  for (let i = 0; i < len; i++) {
    let item = str[i];
    hash[item] = hash[item] ? hash[item] + 1 : 1;
  }
  for (let i = 0; i < len; i++) {
    let item = str[i];
    if (hash[item] === 1) {
      return item;
    }
  }
  return -1;
}


/**
 * 描述 第一次出现一次的字符
 * 使用js的array提供的indexOf和lastIndexOf方法

  遍历字符串，比较每个字符第一次和最后一次出现的位置是否相同。

  indexOf的时间复杂度为O(n)，所以整体的时间复杂度为O(n2)，空间复杂度为0。
 * @date 2020-02-13
 * @param {String} str
 * @returns {String}
 */
function FirstNotRepeatingChar2(str) {
  let arr = str.split('');
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
      return arr[i];
    }
  }
  return -1;
}
console.log(FirstNotRepeatingChar2('2'));

setTimeout(console.log, 3600 * 60);
