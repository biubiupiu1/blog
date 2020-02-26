/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!preorder.length) return null;
  let cur = preorder[0];
  let index = inorder.findIndex(item => item === cur);
  let leftInorder = inorder.slice(0, index);
  let leftPreorder = preorder.slice(1, index + 1);
  let rightInorder = inorder.slice(index + 1);
  let rightPreorder = preorder.slice(1 + index);
  let node = new TreeNode(cur);
  node.left = buildTree(leftPreorder, leftInorder);
  node.right = buildTree(rightPreorder, rightInorder);
  return node;
};

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

setTimeout(console.log, 3600 * 60);
