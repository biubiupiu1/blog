/**
 * 描述 和为S的连续正整数序列
 * 
 * 滑动窗口计算和为S的序列
 * 
 * @date 2020-02-04
 * @param {Number} sum
 * @returns {Array}
 */
function FindContinuousSequence(sum) {
  let stack = [1, 2];
  let result = [];
  let start = 1;
  let end = 2;

  let curSum = 3;

  while (end < sum) {
    while (curSum < sum) {
      stack.push(++end);
      curSum += end;
    }
    while (curSum > sum && start < end) {
      start++;
      curSum -= stack.shift();
    }
    if (curSum === sum && start < end) {
      result.push(stack.slice());
      stack.push(++end);
      curSum += end;
    }
  }

  return result;
}

console.log(FindContinuousSequence(5));

setTimeout(console.log, 3600 * 60);
