/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) return null;
  return DFS(root.left, root.right);
};

var DFS = function(A, B) {
  if (!A && !B) return true;
  if (!B || !A) return false;
  if (A.val === B.val) {
    return DFS(A.left, B.right) && DFS(A.right, B.left);
  } else {
    return false;
  }
};
