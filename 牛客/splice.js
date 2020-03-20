//line=readline()
//print(line)
function splice(arr, start, delCount, ...insetArr) {
  let insertCount = insetArr.length;
  let len = arr.length;
  if (delCount > insertCount) {
    let d = delCount - insertCount;
    for (let i = start + delCount; i < len; i++) {
      arr[i - d] = arr[i];
    }
    for (let i = 0; i < insertCount; i++) {
      arr[start + i] = insetArr[i];
    }
  } else if (delCount < insertCount) {
    let d = insertCount - delCount;
    for (let i = len - 1; i >= start + delCount; i--) {
      arr[i] = arr[i - d];
    }
    for (let i = 0; i < insertCount; i++) {
      arr[start + i] = insetArr[i];
    }
  } else {
    for (let i = 0; i < insertCount; i++) {
      arr[start + i] = insetArr[i];
    }
  }
  arr.length = len - delCount + insertCount;
}

let arr = [1, 2, 3, 4, 5, 6];

splice(arr, 0, 3, 7, 8);

console.log(arr);

setTimeout(console.log, 3600 * 60);
