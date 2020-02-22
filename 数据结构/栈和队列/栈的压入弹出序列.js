/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
  let temp = [];
  let I = 0;
  let J = 0;
  while (I < pushed.length) {
    temp.push(pushed[I]);
    while (temp.length && temp[temp.length - 1] === popped[J]) {
      temp.pop();
      J++;
    }
    I++;
  }
  return J >= popped.length;
};

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]));

setTimeout(console.log, 3600 * 60);
