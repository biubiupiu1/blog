/**
 * 插入排序
 * 
 * 稳定排序
 * 时间复杂度 O(n2)
 * 空间复杂度 O(1)
 */


const arr = [5, 8, 6, 3, 9, 2, 1, 7];

/**
 * 描述 插入排序
 * @date 2020-02-03
 * @param {Array} arr
 * @returns {Array}
 */
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let temp = arr[i];
    for (; j >= 0; j--) {
      if (temp < arr[j]) {
        arr[j + 1] = arr[j];
      } else {
        break
      }
    }
    arr[j + 1] = temp;
  }
  return arr;
}

console.log(insertSort(arr));

setTimeout(console.log, 3600 * 60);
