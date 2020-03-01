/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
  if (!B || !A) return false;
  return DFS(A, B) || DFS(A.left, B) || DFS(A.right, B);
};

var DFS = function(A, B) {
  if (!B) return true;
  if (!A) return false;
  return A.val === B.val && DFS(A.left, B.left) && DFS(A.right, B.right);
};
