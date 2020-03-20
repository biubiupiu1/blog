/**
 * 广度优先算法，即构建入度表
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  let tabel = {};
  prerequisites.forEach(([p1, p2]) => {
    tabel[p1] = tabel.hasOwnProperty(p1) ? tabel[p1] : new Node({ val: p1 });
    tabel[p2] = tabel.hasOwnProperty(p2) ? tabel[p2] : new Node({ val: p2 });
    tabel[p1].pre++;
    tabel[p2].next.push(tabel[p1]);
  });
  let stack = [];
  for (let i = 0; i < numCourses; i++) {
    if (!tabel[i] || tabel[i].pre === 0) stack.push(i);
  }
  let res = [];
  while (stack.length) {
    let item = stack.pop();
    res.push(item);
    item = tabel[item];
    if (!item) continue;
    item.next.forEach(cur => {
      if (--cur.pre === 0) {
        stack.push(cur.val);
      }
    });
  }
  if (res.length !== numCourses) return [];
  return res;
};

function Node({ val, next, pre }) {
  this.val = val;
  this.next = next || [];
  this.pre = pre || 0;
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder2 = function(numCourses, prerequisites) {
  let tabel = {};
  prerequisites.forEach(([p1, p2]) => {
    tabel[p1] = tabel[p1] ? tabel[p1] : [];
    tabel[p2] = tabel[p2] ? tabel[p2] : [];
    tabel[p2].push(p1);
  });
  let record = new Array(numCourses).fill(0);
  let res = [];
  for (let i = 0; i < numCourses; i++) {
    let temp = DFS(tabel, record, i, res);
    if (!temp) return [];
  }
  return res.reverse();
};

var DFS = function(tabel, record, index, res) {
  if (record[index] === 1) return false;
  if (record[index] === -1) return true;
  record[index] = 1;
  if (tabel[index]) {
    for (let i = 0; i < tabel[index].length; i++) {
      let temp = DFS(tabel, record, tabel[index][i], res);
      if (!temp) return false;
    }
  }
  record[index] = -1;
  res.push(index);
  return true;
};

console.log(
  findOrder2(4, [
    [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2]
    ]
  ])
);

setTimeout(console.log, 3600 * 60);
