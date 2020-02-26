/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 迭代算法
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint1 = function(head) {
    let res = []
    while (head) {
        res.unshift(head.val);
        head = head.next;
    }
    return res;
};

/**
 * 递归算法
 * @param {ListNode} head
 * @returns {number[]}
 */
var reversePrint2 = function(head) {
    let res = [];

    function loop(node) {
        if (!node)
            return;
        loop(node.next);
        res.push(node.val);
    }
    loop(head);
    return res;
};