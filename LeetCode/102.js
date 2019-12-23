/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * DFS 算法
 */
var levelOrder = function(root) {
  let levels = [];

  const loop = (node, level) => {
    if (!node) return;
    if (!levels[level]) {
      levels[level] = [node.val];
    } else {
      levels[level].push(node.val);
    }
    level++;
    loop(node.left, level);
    loop(node.right, level);
  };

  loop(root, 0);

  return levels;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 * BFS 算法
 */

var levelOrder = function(root) {
  let levels = [];

  let stack = [root];
  let level = 0;

  while (stack.length) {
    let len = stack.length;
    let arr = [];
    levels[level] = arr;
    for (let i = 0; i < len; i++) {
      let top = stack.unshift()
      arr.push(top.val);
      if (top.left) arr.push(top.left);
      if (top.right) arr.push(top.right);
    }
    level++;
  }

  return levels;
};
