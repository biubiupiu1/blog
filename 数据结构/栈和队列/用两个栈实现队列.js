const stack1 = [];
const stack2 = [];

function pop() {
  while (stack1.length) {
    stack2.push(stack1.pop());
  }
  let res = stack2.pop();
  while (stack2.length) {
    stack1.push(stack2.pop());
  }
  return res;
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
