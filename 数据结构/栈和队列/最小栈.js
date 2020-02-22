const stack = [];
let min;

function push(item) {
  if (stack.length) {
    stack.push(item - min);
    min = Math.min(item, min);
  } else {
    min = item;
    stack.push(0);
  }
  return min;
}

function pop() {
  if (!stack.length) return null;

  let p = stack.pop();
  let res;
  if (p < 0) {
    res = min;
    min = min - p;
  } else {
    res = min + p;
  }
  return res;
}

console.log(push(3));
console.log(push(4));
console.log(push(2));
console.log(pop());
console.log(push(9));
console.log(push(7));
console.log(push(0));
console.log(pop());
console.log(pop());
console.log(pop());
console.log(pop());
console.log(pop());
console.log(pop());
console.log(pop());

setTimeout(console.log, 3600 * 60);
