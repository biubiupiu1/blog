/**
 * @param {number[]} arr
 * @returns {any}
 */
function solution(arr) {
  let stack = [];
  let res = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] < arr[i]) {
      stack.pop();
    }
    let top = stack[stack.length - 1];
    stack.push(arr[i]);
    res[i] = top || -1;
  }
  return res;
}

let i = 3;
while (i--) {
  let arr = Array.from(new Array(5), () => (Math.random() * 10) >> 0);
  console.log(arr, solution(arr));
}

setTimeout(console.log, 3600 * 60);
