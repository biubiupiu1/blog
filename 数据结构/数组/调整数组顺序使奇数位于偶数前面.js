/**
 * 描述 调整数组顺序使奇数位于偶数前面(改变原有顺序)
 * @date 2020-02-04
 * @param {Array} array
 * @returns {Array}
 */
function reOrderArray1(array) {
  let len = array.length;

  let start = 0;
  let end = len - 1;

  while (start < end) {
    while (array[start] % 2 !== 0) {
      start++;
    }
    while (array[end] % 2 === 0) {
      end--;
    }
    [array[start], array[end]] = [array[end], array[start]];
  }

  return array;
}

/**
 * 描述 调整数组顺序使奇数位于偶数前面(不改变原先顺序，冒泡排序改版)
 * @date 2020-02-04
 * @param {Array} array
 * @returns {Array}
 */
function reOrderArray2(array) {
  let len = array.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] % 2 === 0 && array[j + 1] % 2 === 1) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}

const arr = [8, 4, 1, 6, 7, 4, 9, 6, 4];

console.log(reOrderArray2(arr));

setTimeout(console.log, 3600 * 60);
