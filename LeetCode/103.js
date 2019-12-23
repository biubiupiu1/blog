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
  let index = 0;
  let stack = [root];
  let res = [];
  while (stack.length) {
    let top = stack.pop();
    let {left, right, val} = top;

  }
};
