/**
 * 选择排序
 * 
 * 不稳定排序
 * 时间复杂度 O(n2)
 * 空间复杂度 O(1)
 */

const arr = [6, 1, 5, 2, 4, 3];

/**
 * 描述 选择排序
 * @date 2020-02-03
 * @param {Array} arr
 * @returns {Array}
 */
function selectionSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i; j < len; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

console.log(selectionSort(arr));

setTimeout(console.log, 3600 * 60);
