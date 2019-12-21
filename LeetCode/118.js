[
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
  [1, 6, 15, 20, 15, 6, 1]
];
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if (numRows === 0) return [];
  let arr = [[1]];
  for (let i = 1; i < numRows; i++) {
    let row = [];
    arr.push(row);
    for (let j = 0; j <= i; j++) {
      row.push((arr[i - 1][j - 1] || 0) + (arr[i - 1][j] || 0));
    }
  }
  return arr;
};
