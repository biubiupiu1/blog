let Tree = function(val) {
  this.left = this.right = null;
  this.val = val;
};

let arr2tree = function(arr = [1, null, 2, 3]) {
  let stack = [];
  let first = null;
  while (arr.length) {
    let top = stack.shift();
    if (top) {
      let left = arr.shift();
      let right = arr.shift();
      if (left) {
        let cur = new Tree(left);
        top.left = cur;
        stack.push(cur);
      }
      if (right) {
        let cur = new Tree(right);
        top.right = cur;
        stack.push(cur);
      }
    } else {
      first = new Tree(arr.shift());
      stack.push(first);
    }
  }
  return first;
};

const tree = arr2tree([3, 9, 20, null, null, 15, 7]);

const preorderTraversal = function(node) {
  let stack = [];
  let cur = node;
  let res = [];
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      res.push(cur.val);
      cur = cur.left;
    }
    let pop = stack.pop();
    cur = pop.right;
  }
  return res;
};

console.log('前序遍历：', preorderTraversal(tree));

const inorderTraversal = function(node) {
  let stack = [];
  let cur = node;
  let res = [];
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    let pop = stack.pop();
    res.push(pop.val);
    cur = pop.right;
  }
  return res;
};

console.log('中序遍历：', inorderTraversal(tree));

const postorderTraversal = function(node) {
  let stack = [];
  let cur = node;
  let res = [];
  let last = null;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack[stack.length - 1];
    if (!cur.right || cur.right === last) {
      cur = stack.pop();
      res.push(cur.val);
      last = cur;
      cur = null;
    } else {
      cur = cur.right;
    }
  }
  return res;
};

console.log('后序遍历：', postorderTraversal(tree));

setTimeout(console.log, 3600 * 60);
