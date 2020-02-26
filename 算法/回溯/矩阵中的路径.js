var dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

var lenX = 0;
var lenY = 0;
var hash = [];

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  if (!board.length) return false;
  lenY = board.length;
  lenX = board[0].length;

  for (let i = 0; i < lenY; i++) {
    hash[i] = [];
  }

  for (let i = 0; i < lenY; i++) {
    for (let j = 0; j < lenX; j++) {
      let index = 0;
      if (dfs(board, word, i, j, index)) return true;
    }
  }
  return false;
};

/**
 * @param {character[][]} board
 * @param {string} word
 * @param {number} i
 * @param {number} j
 * @param {number} index
 * @returns {boolean}
 */
var dfs = function(board, word, i, j, index) {
  if (index === word.length - 1) return board[i][j] === word[index];

  if (board[i][j] !== word[index]) return false;

  hash[i][j] = true;

  for (let k = 0; k < 4; k++) {
    let ti = dir[k][1] + i;
    let tj = dir[k][0] + j;
    if (
      inArea(ti, tj) &&
      !hash[ti][tj] &&
      dfs(board, word, ti, tj, index + 1)
    ) {
      return true;
    }
  }
  hash[i][j] = false;
  return false;
};

/**
 * @param {number} i
 * @param {number} j
 * @returns {any}
 */
var inArea = function(i, j) {
  return i < lenY && i >= 0 && j < lenX && j >= 0;
};

console.log(
  exist(
    [
      ['C', 'A', 'A'],
      ['A', 'A', 'A'],
      ['B', 'C', 'D']
    ],
    'AAB'
  )
);

setTimeout(console.log, 3600 * 60);
