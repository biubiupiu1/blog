/**
 * 二分查找
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  if (!matrix.length) return false;
  let lenX = matrix[0].length;
  let lenY = matrix.length;

  let left = 0;
  let right = lenY - 1;
  while (left <= right) {
    let mid = ((left + right) / 2) >> 0;
    if (matrix[mid][0] === target) {
      return true;
    } else if (matrix[mid][0] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  let temp = right;

  for (let i = temp; i >= 0; i--) {
    left = 0;
    right = lenX;
    while (left <= right) {
      let mid = ((left + right) / 2) >> 0;
      if (matrix[i][mid] === target) {
        return true;
      } else if (matrix[i][mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return false;
};

/**
 * 从左上角开始查找，当前值大于目标值左移，小于目标值下移
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray2 = function(matrix, target) {
  if (!matrix.length) return false;
  let lenX = matrix[0].length;
  let lenY = matrix.length;

  let i = lenX - 1;
  let j = 0;

  while (j < lenY && i >= 0) {
    if (matrix[j][i] === target) {
      return true;
    } else if (matrix[j][i] > target) {
      i--;
    } else {
      j++;
    }
  }

  return false;
};

console.log(
  findNumberIn2DArray2(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]
    ],
    0
  )
);

setTimeout(console.log, 3600 * 60);
