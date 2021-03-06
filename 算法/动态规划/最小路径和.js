/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  if (!grid.length) return 0;
  let lenX = grid[0].length;
  let lenY = grid.length;
  let dp = new Array(lenY).fill(1);
  dp = dp.map(() => new Array(lenX));

  dp[0][0] = grid[0][0];

  for (let i = 1; i < lenX; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i];
  }

  for (let i = 1; i < lenY; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  for (let i = 1; i < lenY; i++) {
    for (let j = 1; j < lenX; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[lenY - 1][lenX - 1];
};

console.log(
  minPathSum(
    [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1]
    ],
    7
  )
);

setTimeout(console.log, 3600 * 60);
