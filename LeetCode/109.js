/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const toListNode = arr => {
  let node = new ListNode();
  arr.reduce((acc, cur) => {
    acc.next = new ListNode(cur);
    return acc.next;
  }, node);
  return node.next;
};

var sortedListToBST = function(head) {
  let cur = head;
  let size = 0;
  while (cur) {
    cur = cur.next;
    size++;
  }
  console.log(size);

  const loop = (l, r) => {
    // Invalid case
    if (l > r) {
      return null;
    }

    let mid = (l + r) >> 1;

    // First step of simulated inorder traversal. Recursively form
    // the left half
    let left = loop(l, mid - 1);

    // Once left half is traversed, process the current node
    let node = new TreeNode(head.val);
    node.left = left;

    // Maintain the invariance mentioned in the algorithm
    head = head.next;

    // Recurse on the right hand side and form BST out of them
    node.right = loop(mid + 1, r);
    return node;
  };

  return loop(0, size - 1);
};

let res = sortedListToBST(toListNode([-10, -3, 0, 5, 9]));

console.log(res);

setTimeout(console.log, 3600 * 60);
