const arr = [6, 1, 5, 2, 4, 3];

function quickSort(arr, left, right) {
  let len = arr.length;
  left = typeof left === 'number' ? left : 0;
  right = typeof right === 'number' ? right : len - 1;
  if (left < right) {
    let index = partition(arr, left, right);
    quickSort(arr, 0, index - 1);
    quickSort(arr, index + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  let povit = right;
  let index = left;
  for (let i = index; i < right; i++) {
    if (arr[i] < arr[povit]) {
      [arr[i], arr[index]] = [arr[index], arr[i]];
      index++;
    }
  }
  [arr[povit], arr[index]] = [arr[index], arr[povit]];
  return index;
}

console.log(quickSort(arr));

setTimeout(console.log, 3600 * 60);
