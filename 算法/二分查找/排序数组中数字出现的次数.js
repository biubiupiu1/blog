let arr = [1, 2, 3, 3, 4, 5];

function halfFind(arr, target) {
  let start = 0;
  let end = arr.length;

  while (start <= end) {
    let mid = ((start + end) / 2) >> 0;
    if (arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  let l = start;

  start = 0;
  end = arr.length;

  while (start <= end) {
    let mid = ((start + end) / 2) >> 0;
    if (arr[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  let r = end;
  if (l <= r) {
    return r - l + 1;
  } else {
    return 0;
  }
}

console.log(halfFind(arr, 6));
