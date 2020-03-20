/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function(times, N, K) {
  let graph = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity)
  );
  times.forEach(([u, v, w]) => {
    graph[u][v] = w;
  });
  let used = new Array(N + 1).fill(0);
  let dist = new Array(N + 1).fill(Infinity);
  dist[K] = 0;
  for (let i = 0; i < N; i++) {
    let curr = -1;
    for (let j = 1; j <= N; j++) {
      if (!used[j] && (curr === -1 || dist[j] < dist[curr])) {
        curr = j;
      }
    }
    used[curr] = 1;
    for (let j = 1; j <= N; j++) {
      dist[j] = Math.min(dist[j], graph[curr][j] + dist[curr]);
    }
  }
  let max = 0;
  for (let i = 1; i <= N; i++) {
    if (dist[i] === Infinity) return -1;
    max = Math.max(max, dist[i]);
  }
  return max;
};

/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime2 = function(times, N, K) {
  let graph = Array.from(new Array(N + 1), () => new Set());
  times.forEach(([u, v, w]) => {
    graph[u].add([v, w]);
  });
  let used = new Array(N + 1).fill(0);
  let dist = new Array(N + 1).fill(Infinity);
  dist[K] = 0;
  let heap = new MinHeap([], (a, b) => a[1] < b[1]);
  heap.push([K, 0]);
  while (heap.arr.length) {
    let item = heap.pop();
    let [curr] = item;
    if (used[curr]) continue;
    used[curr] = 1;
    for (let [u, w] of graph[curr]) {
      if (w + dist[curr] < dist[u]) {
        dist[u] = w + dist[curr];
        heap.push([u, dist[u]]);
      }
    }
  }
  let max = 0;
  for (let i = 1; i <= N; i++) {
    max = Math.max(max, dist[i]);
  }
  if (max === Infinity) return -1;
  return max;
};

var MinHeap = function(arr, compare) {
  this.arr = arr || [];
  this.compare = compare;
};

MinHeap.prototype.adjust = function(index) {
  let arr = this.arr;
  for (let i = index * 2 + 1; i < arr.length; ) {
    if (i + 1 < arr.length && this.compare(arr[i + 1], arr[i])) {
      i++;
    }
    if (this.compare(arr[i], arr[index])) {
      [arr[index], arr[i]] = [arr[i], arr[index]];
      index = i;
    } else {
      break;
    }
  }
};

MinHeap.prototype.pop = function(index) {
  let arr = this.arr;
  if (arr.length <= 1) return arr.pop();
  let item = arr[0];
  arr[0] = arr.pop();
  this.adjust(0);
  return item;
};

MinHeap.prototype.push = function(num) {
  let arr = this.arr;
  arr.push(num);
  let index = arr.length - 1;
  let target = (index - 1) >> 1;
  while (target >= 0) {
    if (this.compare(arr[index], arr[target])) {
      [arr[index], arr[target]] = [arr[target], arr[index]];
      index = target;
      target = (index - 1) >> 1;
    } else {
      break;
    }
  }
};

console.log(
  networkDelayTime2(
    [
      [5, 4, 11],
      [8, 11, 84],
      [5, 2, 94],
      [13, 3, 95],
      [3, 2, 37],
      [10, 1, 5],
      [10, 3, 19],
      [6, 3, 47],
      [8, 13, 80],
      [13, 10, 71],
      [2, 6, 5],
      [1, 6, 77],
      [7, 10, 94],
      [4, 15, 43],
      [6, 9, 56],
      [8, 10, 82],
      [9, 4, 39],
      [15, 1, 73],
      [2, 8, 85],
      [12, 6, 45],
      [10, 14, 67],
      [15, 6, 92],
      [5, 9, 7],
      [11, 4, 17],
      [4, 1, 64],
      [13, 5, 17],
      [4, 8, 53],
      [12, 8, 91],
      [15, 5, 88],
      [9, 3, 7],
      [9, 15, 52],
      [8, 4, 78],
      [1, 11, 8],
      [9, 11, 87],
      [13, 15, 56],
      [12, 10, 50],
      [4, 6, 66],
      [3, 7, 38],
      [2, 1, 3],
      [11, 2, 50],
      [14, 9, 56],
      [4, 5, 78],
      [12, 15, 65],
      [1, 2, 15],
      [10, 4, 80],
      [6, 14, 65],
      [12, 7, 82],
      [12, 1, 28],
      [12, 4, 3],
      [3, 15, 10],
      [3, 1, 77],
      [1, 10, 26],
      [11, 6, 94],
      [13, 2, 8],
      [10, 15, 25],
      [2, 14, 41],
      [15, 14, 13],
      [2, 10, 16],
      [15, 13, 36],
      [5, 15, 30],
      [15, 10, 52],
      [9, 10, 16],
      [6, 12, 13],
      [2, 9, 74],
      [7, 3, 56],
      [10, 6, 43],
      [15, 2, 91],
      [10, 13, 15],
      [7, 11, 47],
      [14, 8, 88],
      [8, 5, 7],
      [6, 4, 99],
      [8, 15, 76],
      [4, 2, 46],
      [15, 11, 86],
      [4, 14, 30],
      [14, 13, 53],
      [13, 11, 72],
      [2, 3, 57],
      [5, 14, 43],
      [11, 12, 28],
      [6, 1, 78],
      [13, 9, 78],
      [14, 7, 22],
      [6, 7, 10],
      [1, 15, 30],
      [13, 8, 73],
      [8, 6, 7],
      [4, 12, 62],
      [11, 10, 4],
      [11, 3, 29],
      [10, 5, 67],
      [4, 7, 40],
      [4, 13, 99],
      [9, 6, 95],
      [3, 13, 40],
      [11, 5, 93],
      [8, 3, 52],
      [1, 13, 53],
      [8, 1, 67],
      [10, 8, 63],
      [6, 10, 72],
      [9, 14, 13],
      [13, 7, 77],
      [12, 3, 27],
      [7, 13, 65],
      [14, 1, 17],
      [6, 5, 23],
      [13, 6, 90],
      [7, 5, 54],
      [8, 2, 59],
      [8, 7, 24],
      [5, 1, 2],
      [13, 14, 81],
      [6, 13, 44],
      [5, 7, 93],
      [3, 9, 1],
      [5, 8, 99],
      [9, 8, 70],
      [4, 10, 73],
      [11, 15, 84],
      [13, 1, 64],
      [5, 3, 42],
      [11, 9, 67],
      [9, 5, 76],
      [1, 14, 42],
      [7, 15, 88],
      [13, 12, 35],
      [1, 3, 29],
      [3, 6, 69],
      [6, 15, 65],
      [9, 12, 10],
      [15, 8, 5],
      [14, 10, 6],
      [6, 2, 35],
      [2, 7, 47],
      [4, 9, 87],
      [9, 2, 8],
      [9, 1, 43],
      [8, 12, 55],
      [14, 2, 86],
      [11, 14, 15],
      [2, 4, 44],
      [10, 12, 2],
      [15, 4, 44],
      [5, 12, 30],
      [3, 12, 57],
      [6, 8, 0],
      [10, 7, 66],
      [4, 3, 75],
      [14, 6, 2],
      [10, 2, 15],
      [7, 2, 89],
      [5, 13, 86],
      [5, 10, 19],
      [7, 1, 37],
      [7, 4, 12],
      [1, 8, 38],
      [3, 14, 79],
      [3, 11, 96],
      [1, 5, 23],
      [7, 14, 22],
      [12, 11, 34],
      [3, 8, 5],
      [2, 11, 10],
      [15, 3, 44],
      [7, 12, 43],
      [7, 8, 49],
      [11, 1, 73],
      [14, 12, 38],
      [14, 3, 86],
      [10, 9, 68],
      [11, 13, 39],
      [15, 7, 57],
      [15, 9, 52],
      [1, 4, 7],
      [12, 2, 73],
      [11, 8, 9],
      [13, 4, 92],
      [9, 13, 81],
      [11, 7, 89],
      [8, 9, 84],
      [6, 11, 81],
      [14, 5, 77],
      [2, 12, 21],
      [5, 6, 48],
      [7, 6, 37],
      [12, 13, 95],
      [2, 13, 76],
      [8, 14, 1],
      [3, 10, 95],
      [3, 4, 38],
      [12, 5, 69],
      [2, 15, 18],
      [12, 9, 24],
      [9, 7, 58],
      [1, 9, 9],
      [5, 11, 61],
      [4, 11, 62],
      [14, 15, 89],
      [15, 12, 56],
      [1, 7, 60],
      [14, 11, 0],
      [3, 5, 85],
      [12, 14, 63],
      [14, 4, 22],
      [7, 9, 50],
      [10, 11, 33],
      [1, 12, 27],
      [2, 5, 2]
    ],
    15,
    12
  )
);

setTimeout(console.log, 3600 * 60);
