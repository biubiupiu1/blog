/**
 * 描述 调整堆
 * @date 2020-02-13
 * @param {Array} array
 * @param {Number} index
 * @param {Number} length
 * @returns {any}
 */
function adjustMaxHeap(array, index, length) {
  for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
    if (i + 1 < length && array[i + 1] > array[i]) {
      i++;
    }
    if (array[i] > array[index]) {
      [array[i], array[index]] = [array[index], array[i]];
      index = i;
    } else {
      break;
    }
  }
}

/**
 * 描述 创建最大堆
 * @date 2020-02-13
 * @param {Array} arr
 * @param {Number} length
 * @returns {any}
 */
function createMaxHeap(arr, length) {
  let len = arr.length;
  for (let i = (len / 2) >> 0; i >= 0; i--) {
    adjustMaxHeap(arr, i, len);
  }
  return arr;
}

console.log(createMaxHeap([1, 2, 3, 4, 5, 6, 7]));

setTimeout(console.log, 3600 * 60);
