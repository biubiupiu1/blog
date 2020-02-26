/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  if (!obstacleGrid.length) return 0;
  let lenX = obstacleGrid[0].length;
  let lenY = obstacleGrid.length;
  let dp = new Array(lenY).fill(1);
  dp = dp.map(() => new Array(lenX));

  dp[0][0] = !obstacleGrid[0][0];

  for (let i = 1; i < lenX; i++) {
    dp[0][i] = dp[0][i - 1] && !obstacleGrid[0][i];
  }

  for (let i = 1; i < lenY; i++) {
    dp[i][0] = dp[i - 1][0] && !obstacleGrid[i][0];
  }

  for (let i = 1; i < lenY; i++) {
    for (let j = 1; j < lenX; j++) {
      dp[i][j] = obstacleGrid[i][j] ? 0 : dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[lenY - 1][lenX - 1];
};

console.log(
  uniquePathsWithObstacles([
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ])
);

setTimeout(console.log, 3600 * 60);
