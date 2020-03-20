/**
  算法流程：
  统计课程安排图中每个节点的入度，生成 入度表 indegrees。
  借助一个队列 queue，将所有入度为 00 的节点入队。
  当 queue 非空时，依次将队首节点出队，在课程安排图中删除此节点 pre：
  并不是真正从邻接表中删除此节点 pre，而是将此节点对应所有邻接节点 cur 的入度 -1−1，即 indegrees[cur] -= 1。
  当入度 -1−1后邻接节点 cur 的入度为 00，说明 cur 所有的前驱节点已经被 “删除”，此时将 cur 入队。
  在每次 pre 出队时，执行 numCourses--；
  若整个课程安排图是有向无环图（即可以安排），则所有节点一定都入队并出队过，即完成拓扑排序。换个角度说，若课程安排图中存在环，一定有节点的入度始终不为 00。
  因此，拓扑排序出队次数等于课程个数，返回 numCourses == 0 判断课程是否可以成功安排。
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  if (!prerequisites.length) return true;
  let hash = {};
  for (let i = 0; i < prerequisites.length; i++) {
    let [p1, p2] = prerequisites[i];
    p1Node = p1 in hash ? hash[p1] : { next: [], val: p1, pre: 0 };
    p2Node = p2 in hash ? hash[p2] : { next: [], val: p2, pre: 0 };
    hash[p1] = p1Node;
    hash[p2] = p2Node;
    p2Node.next.push(p1Node);
    p1Node.pre++;
  }
  let stack = [];
  for (let i = 0; i < numCourses; i++) {
    if (!hash[i] || hash[i].pre === 0) stack.push(i);
  }
  while (stack.length) {
    let item = stack.pop();
    numCourses--;
    item = hash[item];
    if (!item) continue;
    item.next.forEach(cur => {
      if (--cur.pre === 0) stack.push(cur.val);
    });
  }
  return !numCourses;
};


/**
 * 算法流程：
  借助一个标志列表 flags，用于判断每个节点 i （课程）的状态：
  未被 DFS 访问：i == 0；
  已被其他节点启动的 DFS 访问：i == -1；
  已被当前节点启动的 DFS 访问：i == 1。
  对 numCourses 个节点依次执行 DFS，判断每个节点起步 DFS 是否存在环，若存在环直接返回 FalseFalse。DFS 流程；
  终止条件：
  当 flag[i] == -1，说明当前访问节点已被其他节点启动的 DFS 访问，无需再重复搜索，直接返回 TrueTrue。
  当 flag[i] == 1，说明在本轮 DFS 搜索中节点 i 被第 22 次访问，即 课程安排图有环 ，直接返回 FalseFalse。
  将当前访问节点 i 对应 flag[i] 置 11，即标记其被本轮 DFS 访问过；
  递归访问当前节点 i 的所有邻接节点 j，当发现环直接返回 FalseFalse；
  当前节点所有邻接节点已被遍历，并没有发现环，则将当前节点 flag 置为 -1−1 并返回 TrueTrue。
  若整个图 DFS 结束并未发现环，返回 TrueTrue。
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let tabel = {};
  prerequisites.forEach(([p1, p2]) => {
    tabel[p1] = tabel[p1] ? tabel[p1] : [];
    tabel[p2] = tabel[p2] ? tabel[p2] : [];
    tabel[p2].push(p1);
  });
  let record = new Array(numCourses).fill(0);
  for (let i = 0; i < numCourses; i++) {
    let temp = DFS(tabel, record, i);
    if (!temp) return false;
  }
  return true;
};

var DFS = function(tabel, record, index) {
  if (record[index] === 1) return false;
  if (record[index] === -1) return true;
  record[index] = 1;
  if (tabel[index]) {
    for (let i = 0; i < tabel[index].length; i++) {
      let temp = DFS(tabel, record, tabel[index][i]);
      if (!temp) return false;
    }
  }
  record[index] = -1;
  return true;
};

console.log(
  canFinish(2, [
    [1, 0],
    [0, 1]
  ])
);

setTimeout(console.log, 3600 * 60);
