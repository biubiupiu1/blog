/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 假头可以简化删除head的情况
   双指针可以避免.Next.Next的写法
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
  let dummy = { val: 0, next: head };
  let first = dummy;
  let second = dummy.next;
  while (second) {
    if (second.val === val) {
      first.next = second.next;
      break;
    } else {
      first = first.next;
      second = second.next;
    }
  }
  return dummy.next;
};
