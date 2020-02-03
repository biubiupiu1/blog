/**
 * 冒泡排序
 * 
 * 稳定排序
 * 时间复杂度 O(n2)
 * 空间复杂度 O(1)
 */

const arr = [6, 1, 5, 2, 4, 3];

/**
 * 冒泡排序第一版
 * @date 2020-02-03
 * @param {Array} arr
 * @returns {Array}
 */
function bubbleSort1(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

/**
 * 冒泡排序第一版
 * @date 2020-02-03
 * @param {Array} arr
 * @returns {Array}
 */
function bubbleSort2(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    // 标志当前轮次是否已经排好序了
    let flag = false;
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (!flag) break;
  }
  return arr;
}

/**
 * 冒泡排序第三版
 * @date 2020-02-03
 * @param {Array} arr
 * @returns {Array}
 */
function bubbleSort3(arr) {
  let len = arr.length;
  // 记录交换的最后边界
  let lastExchangeIndex = 0;
  // 已排序区边界
  let sortBorder = len - 1;
  for (let i = 0; i < len; i++) {
    // 标志当前轮次是否已经排好序了
    let flag = false;
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
        lastExchangeIndex = j;
      }
    }
    sortBorder = lastExchangeIndex;
    if (!flag) break;
  }
  return arr;
}

console.log(bubbleSort3(arr));

setTimeout(console.log, 3600 * 60);
