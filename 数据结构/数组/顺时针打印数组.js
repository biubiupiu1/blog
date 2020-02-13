/**
 * 描述
 * @date 2020-02-12
 * @param {[Array]} matrix
 * @returns {Array}
 */
function printMatrix(matrix) {
  let res = [];

  if (!matrix.length) return [];

  let lenX = matrix[0].length;
  let lenY = matrix.length;

  let startX = 0;
  let startY = 0;
  let endX = lenX - 1;
  let endY = lenY - 1;

  while (startX <= endX && startY <= endY) {
    if (startX === endX) {
      for (let i = startY; i <= endY; i++) {
        res.push(matrix[i][startX]);
      }
      break;
    }

    if (startY === endY) {
      for (let i = startX; i <= endX; i++) {
        res.push(matrix[startY][i]);
      }
      break;
    }

    for (let i = startX; i < endX; i++) {
      res.push(matrix[startY][i]);
    }
    for (let i = startY; i < endY; i++) {
      res.push(matrix[i][endX]);
    }
    for (let i = endX; i > startX; i--) {
      res.push(matrix[endY][i]);
    }
    for (let i = endY; i > startY; i--) {
      res.push(matrix[i][startX]);
    }
    startX++;
    startY++;
    endX--;
    endY--;
  }

  return res;
}

console.log(
  printMatrix([
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12]
  ])
);

setTimeout(console.log, 3600 * 60);
