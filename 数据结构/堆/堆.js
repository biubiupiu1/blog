/**
 * 描述
 * @date 2020-02-13
 * @param {String} type
 * @param {Array} value
 * @returns {any}
 */
function Heap(type = 'min', value) {
  this.type = type;
  this.value = value || [];
  this.create();
}

/**
 * 描述 生成堆
 * @date 2020-02-13
 * @returns {Array}
 */
Heap.prototype.create = function() {
  let len = this.value.length;
  for (let i = (len / 2) >> 0; i >= 0; i--) {
    this.adjust(i, len);
  }
  return this.value;
};

/**
 * 描述
 * @date 2020-02-13
 * @param {Number} index
 * @param {Number} length
 * @returns {Array}
 */
Heap.prototype.adjust = function(index, length) {
  let array = this.value;

  for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
    if (
      i + 1 < length &&
      ((array[i + 1] < array[i] && this.type === 'min') ||
        (array[i + 1] > array[i] && this.type === 'max'))
    ) {
      i++;
    }
    if (
      (array[i] < array[index] && this.type === 'min') ||
      (array[i] > array[index] && this.type === 'max')
    ) {
      [array[i], array[index]] = [array[index], array[i]];
      index = i;
    } else {
      break;
    }
  }
  return array;
};

/**
 * 描述
 * @date 2020-02-13
 * @param {Number} num
 * @returns {Array}
 */
Heap.prototype.add = function(num) {
  let arr = this.value;
  arr.push(num);
  let index = arr.length - 1;
  let target = ((index - 1) / 2) >> 0;
  while (target >= 0) {
    if (
      (arr[target] > arr[index] && this.type === 'min') ||
      (arr[target] < arr[index] && this.type === 'max')
    ) {
      [arr[target], arr[index]] = [arr[index], arr[target]];
      index = target;
      target = ((index - 1) / 2) >> 0;
    } else {
      break;
    }
  }
  return arr;
};

/**
 * 描述 删除堆顶元素
 * @date 2020-02-13
 * @returns {number}
 */
Heap.prototype.pop = function() {
  let arr = this.value;
  let result = null;
  if (arr.length > 1) {
    result = this.value[0];
    this.value[0] = this.value.pop();
    this.adjust(0, this.value.length);
  } else {
    return arr.pop();
  }
  return result;
};

module.exports = Heap;

// let vheap = new Heap('max', [1, 3, 4]);

// console.log(vheap.value);

// console.log(vheap.pop());

// console.log(vheap.value);

// console.log(vheap.add(7));

// setTimeout(console.log, 3600 * 60);
