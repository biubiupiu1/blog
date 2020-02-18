/**
 * 描述 获取数组的最小的k个数
 * @date 2020-02-15
 * @param {Array} input
 * @param {Number} k
 * @returns {Array}
 */
function GetLeastNumbers_Solution(input, k) {
  let len = input.length;
  if (len < k) {
    return input;
  }

  createHeap(input, k);

  for (let i = k; i < len; i++) {
    if (input[0] > input[i]) {
      [input[0], input[i]] = [input[i], input[0]];
      ajustHeap(input, 0, k);
    }
  }

  return input.slice(0, k);
}

/**
 * 描述 构建大顶堆
 * @date 2020-02-15
 * @param {Array} arr
 * @param {Number} length
 * @returns {any}
 */
function createHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    ajustHeap(arr, i, length);
  }
}

function ajustHeap(arr, index, length) {
  for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
    if (i + 1 < length && arr[i + 1] > arr[i]) {
      i++;
    }
    if (arr[index] < arr[i]) {
      [arr[index], arr[i]] = [arr[i], arr[index]];
      index = i;
    } else {
      break;
    }
  }
}

console.log(GetLeastNumbers_Solution([9, 7, 32, 4, 6, 6, 2, 62, 3], 5));

setTimeout(console.log, 3600 * 60);
