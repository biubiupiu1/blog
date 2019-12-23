/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// var inorderTraversal = function(root) {
//   let arr = [];

//   const loop = node => {
//     if (!node) return;
//     loop(node.left);
//     arr.push(node.val);
//     loop(node.right);
//   };

//   loop(root);

//   return arr;
// };

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let arr = [];
  let stack = [root];

  let node = root;

  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      let p = stack.pop();
      arr.push(p.val);
      node = p.right;
    }
  }

  return arr;
};
