/**
 * 描述 调整堆
 * @date 2020-02-13
 * @param {Array} array
 * @param {Number} index
 * @param {Number} length
 * @returns {any}
 */
function adjustMinHeap(array, index, length) {
  for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
    if (i + 1 < length && array[i + 1] < array[i]) {
      i++;
    }
    if (array[i] < array[index]) {
      [array[i], array[index]] = [array[index], array[i]];
      index = i;
    } else {
      break;
    }
  }
}

/**
 * 描述 创建最小堆
 * @date 2020-02-13
 * @param {Array} arr
 * @returns {any}
 */
function createMinHeap(arr) {
  let len = arr.length;
  for (let i = (len / 2) >> 0 - 1; i >= 0; i--) {
    adjustMinHeap(arr, i, len);
  }
  return arr;
}
/**
 * 描述 最小堆添加元素
 * @date 2020-02-13
 * @param {Array} arr
 * @param {Number} num
 * @returns {Array}
 */
function minHeapAdd(arr, num) {
  arr.push(num);
  let index = arr.length - 1;
  let target = ((index - 1) / 2) >> 0;
  while (target >= 0) {
    if (arr[target] > arr[index]) {
      [arr[target], arr[index]] = [arr[index], arr[target]];
      index = target;
      target = ((index - 1) / 2) >> 0;
    } else {
      break;
    }
  }
  return arr;
}

/**
 * 描述 最小堆删除元素
 * @date 2020-02-13
 * @param {Array} arr
 * @returns {Array}
 */
function minHeapPop(arr) {
  let result = arr[0];
  arr[0] = arr.pop();
  adjustMinHeap(arr, 0, arr.length);
  return result;
}

let arr = [7, 6, 5, 4, 3, 1];
console.log(createMinHeap(arr));
console.log(minHeapAdd(arr, 2));
console.log(minHeapPop(arr), arr);

setTimeout(console.log, 3600 * 60);
