/**
 * @param {number[][]} grid
 * @return {number}
 */

var maxAreaOfIsland = function(grid) {
  if (!grid.length) return 0;
  let lenX = grid[0].length;
  let lenY = grid.length;
  let max = 0;
  for (let i = 0; i < lenY; i++) {
    for (let j = 0; j < lenX; j++) {
      max = Math.max(max, DFS(grid, i, j));
    }
  }
  return max;
};

var DFS = function(grid, x, y) {
  if (grid[x][y] === 0) return 0;

  grid[x][y] = 0;

  let top = 0;
  let left = 0;
  let right = 0;
  let bot = 0;

  if (isChecked(grid, x + 1, y)) {
    bot = DFS(grid, x + 1, y);
  }

  if (isChecked(grid, x - 1, y)) {
    top = DFS(grid, x - 1, y);
  }

  if (isChecked(grid, x, y + 1)) {
    right = DFS(grid, x, y + 1);
  }

  if (isChecked(grid, x, y - 1)) {
    left = DFS(grid, x, y - 1);
  }

  let temp = 1 + top + left + bot + right;
  return temp;
};

var isChecked = function(grid, x, y) {
  let lenX = grid[0].length;
  let lenY = grid.length;
  return x >= 0 && x < lenY && y >= 0 && y < lenX;
};

console.log(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
  ])
);

setTimeout(console.log, 3600 * 60);
