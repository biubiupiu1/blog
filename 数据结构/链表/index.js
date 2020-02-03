/**
 * 链表节点构造函数
 * @date 2020-01-09
 * @param {number} val
 */
function Link(val) {
  this.val = val;
  this.next = null;
}

/**
 * 数组转化成链表
 * @date 2020-01-09
 * @param {Array} arr
 * @returns {object}
 */
function array2List(arr) {
  let node = new Link();
  let cur = node;
  arr.forEach(item => {
    cur.next = new Link(item);
    cur = cur.next;
  });
  return node.next;
}

const linkList = array2List([1, 2, 3, 4, 5]);

console.log('链表', linkList);

/**
 * 反转链表
 * @date 2020-01-09
 * @param {Object} list
 * @returns {Object}
 */
function reverseList(list) {
  let pre = null;
  let cur = list;
  while (cur) {
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre;
}

console.log('反转链表', reverseList(linkList));

setTimeout(console.log, 3600 * 60);
