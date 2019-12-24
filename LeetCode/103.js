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
 */
var zigzagLevelOrder = function(root) {
  let levels = [];
  let stack = [root];
  let level = 0;
  while (stack.length) {
    let len = stack.length;
    let arr = [];
    levels[level] = arr;
    for (let i = 0; i < len; i++) {
      let cur = stack.shift();
      if (level % 2) arr.unshift(cur.val);
      else arr.push(cur.val);
      if (cur.left) stack.push(cur.left);
      if (cur.right) stack.push(cur.right);
    }
    level++;
  }
  return levels;
};
