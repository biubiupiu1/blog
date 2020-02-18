const Heap = require('./堆');

let minHeap = new Heap('min');
let maxHeap = new Heap('max');

let count = 0;

/**
 * 描述 数据流
 * @date 2020-02-15
 * @param {Number} num
 * @returns {any}
 */
function insert(num) {
  count++;
  if (count % 2) {
    maxHeap.add(num);
    minHeap.add(maxHeap.pop());
  } else {
    minHeap.add(num);
    maxHeap.add(minHeap.pop());
  }
}

/**
 * 描述 获取中位数
 * @date 2020-02-15
 * @returns {Number}
 */
function getMedian() {
  if (count % 2) {
    return minHeap.value[0];
  } else {
    return (maxHeap.value[0] + minHeap.value[0]) / 2;
  }
}

insert(1);
insert(2);
insert(10);

console.log(getMedian());

insert(8);
insert(5);
insert(9);

console.log(getMedian());
console.log(minHeap.value, maxHeap.value);

setTimeout(console.log, 3600 * 60);
