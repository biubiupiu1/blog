let arr = [1, 2, [3, 4, [5, 6]]];

/* 
  迭代写法 
*/

function iterationFlat() {
  let stack = [arr];
  while (stack.length) {
    let temp = stack.shift();
    if (Array.isArray(temp)) {
      stack.unshift(...temp);
    } else {
      console.log(temp);
    }
  }
}

/* 
  生成器写法 
  每一个生成器只关注第一层数组 
*/

class Iterator {
  constructor(arr) {
    this.list = arr;
    this.it = null;
    this.index = 0;
  }

  next() {
    if (this.it) {
      if (this.it.hasNext()) {
        return this.it.next();
      } else {
        this.it = null;
        this.index++;
      }
    }
    let cur = this.list[this.index];
    if (Array.isArray(cur)) {
      this.it = new Iterator(cur);
      return this.next();
    } else {
      this.index++;
      return cur;
    }
  }

  hasNext() {
    if (this.it != null) {
      if (this.it.hasNext()) return true;
      this.index++;
      this.it = null;
    }
    if (this.index >= this.list.length) return false;
    let integer = this.list[this.index];
    if (!Array.isArray(integer)) {
      return true;
    } else {
      this.it = new Iterator(integer);
      return this.hasNext();
    }
  }
}

// let i = new Iterator([[1, 2, [3, [4]]], []]);
// while (i.hasNext()) console.log(i.next());

/* 
  Generator  实现
*/

let total = 0;

function* generatorFlat(arr, num = 1) {
  if (num <= 0) return arr.slice();

  for (let item of arr) {
    console.log(total++)
    if (Array.isArray(item)) {
      yield* generatorFlat(item, num - 1);
    } else {
      yield item;
    }
  }
}


Array.prototype.fakeFlat = function(num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = this.concat(); // 获得调用 fakeFlat 函数的数组
  while (num > 0) {
    if (
      arr.some(x => {
        console.log(total++)
        return Array.isArray(x);
      })
    ) {
      arr = [].concat.apply([], arr); // 数组中还有数组元素的话并且 num > 0，继续展开一层数组
    } else {
      break; // 数组中没有数组元素并且不管 num 是否依旧大于 0，停止循环。
    }
    num--;
  }
  return arr;
};

const arr1 = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
console.log(...generatorFlat(arr1, Infinity))


setTimeout(() => {}, 3600 * 60);
