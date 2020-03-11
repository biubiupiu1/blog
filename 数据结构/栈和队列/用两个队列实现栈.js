const queue1 = [];
const queue2 = [];

function pop() {
  if (queue1.length) {
    while (queue1.length > 1) {
      queue2.push(queue1.shift());
    }
    return queue1.shift();
  } else {
    while (queue2.length > 1) {
      queue1.push(queue2.shift());
    }
    return queue2.shift();
  }
}

function push(item) {
  if (queue2.length) {
    queue2.push(item);
  } else {
    queue1.push(item);
  }
}

push(1);
push(2);
push(3);
console.log(pop());
push(4);
console.log(pop());
console.log(pop());
console.log(pop());

setTimeout(console.log, 3600 * 60);
