const stack1 = [];
const stack2 = [];

function pop() {
  if (!stack2.length) {
    while (stack1.length) {
      stack2.push(stack1.pop());
    }
  }
  return stack2.pop() || -1;
}

function push(item) {
  stack1.push(item);
  return true;
}

push(1);
push(2);
console.log(pop());
push(3);
console.log(pop());

setTimeout(console.log, 3600 * 60);
