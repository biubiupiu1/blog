/**
 * 描述 数组中出现次数超过数组长度一半的数字
 * @date 2020-02-13
 * @param {Array} numbers
 * @returns {Number}
 */
function MoreThanHalfNum_Solution1(numbers) {
  let len = numbers.length;
  let hash = {};
  for (let i = 0; i < len; i++) {
    let item = numbers[i];
    hash[item] = hash[item] ? hash[item] + 1 : 1;
  }
  let max = 0;
  for (let i = 0; i < len; i++) {
    let item = numbers[i];
    if (hash[item] > len / 2) {
      max = item;
    }
  }
  return max;
}

/**
 * 描述 数组中出现次数超过数组长度一半的数字
 * 目标值的个数比其他所有值加起来的数多

  记录两个变量 1.数组中的某个值 2.次数

  1.当前遍历值和上一次遍历值相等？次数+1 ： 次数-1。

  2.次数变为0后保存新的值。

  3.遍历结束后保存的值,判断其是否复合条件

  事件复杂度O(n) 不需要开辟额外空间 , 逻辑稍微复杂。
 * @date 2020-02-13
 * @param {Array} numbers
 * @returns {Number}
 */
function MoreThanHalfNum_Solution2(numbers) {
  let len = numbers.length;
  let target = numbers[0];
  let count = 1;
  for (let i = 1; i < len; i++) {
    let item = numbers[i];
    if (item === target) {
      count++;
    } else {
      count--;
    }

    if (count === 0) {
      target = item;
      count = 1;
    }
  }
  count = 0;
  for (let i = 0; i < len; i++) {
    let item = numbers[i];
    if (item === target) {
      count++;
    }
  }

  if (count > len / 2) {
    return target;
  } else {
    return 0;
  }
}

console.log(MoreThanHalfNum_Solution2([-1, -1, -1, 2, -1, -4]));

setTimeout(console.log, 3600 * 60);
