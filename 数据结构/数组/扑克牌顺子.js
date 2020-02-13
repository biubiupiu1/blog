/**
 * 描述 扑克牌顺子
 * @date 2020-02-13
 * @param {Array} numbers
 * @returns {Boolean}
 */
function IsContinuous(numbers) {
  let kingNum = 0;
  let spaceNum = 0;
  numbers.sort((a, b) => a - b);
  let len = numbers.length;
  for (let i = 0; i < len - 1; i++) {
    let item = numbers[i];
    if (item === 0) {
      kingNum++;
    } else if (numbers[i] === numbers[i + 1]) {
      return false;
    } else {
      spaceNum += numbers[i + 1] - numbers[i] - 1;
    }
  }
  if (spaceNum > kingNum) {
    return false;
  } else {
    return true;
  }
}

console.log(IsContinuous([10, 11, 12, 13, 0]));

setTimeout(console.log, 3600 * 60);
