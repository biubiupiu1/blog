/**
 * 二叉树节点
 * @param {number} val
 */
let Tree = function(val) {
  this.left = this.right = null;
  this.val = val;
};

/**
 * 根据层序遍历数组生成二叉树
 * @param {Array} arr 层序遍历数组
 */
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

/**
 * 二叉树前序遍历非递归版本
 * @param {object} node
 */
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

/**
 * 二叉树中序遍历非递归版本
 * @param {object} node
 */
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

/**
 * 二叉树后序遍历非递归版本
 * @param {object} node
 */
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

/**
 * 检测该数组是否为二叉搜索树后续遍历结果
 * @param {Array} sequence
 * @returns {Boolean}
 */
function VerifySquenceOfBST(sequence) {
  if (sequence.length <= 2) return true;
  let len = sequence.length;
  let root = sequence[len - 1];
  let flag = false;
  let index = 0;
  for (let i = 0; i < len - 1; i++) {
    if (flag) {
      if (sequence[i] < root) return false;
    } else {
      if (sequence[i] > root) {
        index = i;
        flag = true;
      }
    }
  }
  return (
    VerifySquenceOfBST(sequence.slice(0, index)) &&
    VerifySquenceOfBST(sequence.slice(index, len - 1))
  );
}

/**
 * 求二叉树中和为指定值得路径，路径必须是从根节点一直到叶子节点
 * @param {Object} root
 * @param {number} expectNumber
 * @returns {Array}
 */
function FindPath(root, expectNumber) {
  const result = [];
  if (root) {
    FindPathCore(root, expectNumber, [], 0, result);
  }

  function FindPathCore(root, expectNumber, stack, num, result) {
    stack.push(root);
    num += root.val;
    if (!root.left && !root.right && num === expectNumber) {
      result.push(stack.slice(0));
    }
    if (root.left) {
      FindPathCore(root.left, expectNumber, stack, num, result);
    }
    if (root.right) {
      FindPathCore(root.right, expectNumber, stack, num, result);
    }
    stack.pop();
  }

  return result;
}

console.log('查找路径', FindPath(tree, 38));

/**
 * 利用中序遍历将二叉搜索树转为双向链表，二叉搜索树的中序遍历是有序的，在中序遍历的基础上我们要将相邻节点连接起来，
 * 所以我们要记录前一个节点，将前一个节点的 right 指向 node , node 的 left 执行前一个节点，这样就串联起来了
 *
 * 最后需要迭代将最开始节点返回
 * @param {Object} pRootOfTree
 */
function Convert(pRootOfTree) {
  if (!pRootOfTree) {
    return null;
  }
  function ConvertCore(node, pre) {
    if (node.left) {
      pre = ConvertCore(node.left, pre);
    }
    node.left = pre;
    if (pre) {
      pre.right = node;
    }
    pre = node;
    if (node.right) {
      pre = ConvertCore(node.left, pre);
    }
    return pre;
  }

  ConvertCore(pRootOfTree);
  while (pRootOfTree.left) {
    pRootOfTree = pRootOfTree.left;
  }
  return pRootOfTree;
}

setTimeout(console.log, 3600 * 60);
