class Scheduler {
  constructor() {
    this.stack = [];
    this.num = 0;
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      let _resol = () => {
        this.num--;
        resolve();
        if (this.num < 2 && this.stack.length) {
          let { handle, hook } = this.stack.shift();
          handle().then(hook);
        }
      };
      if (this.num >= 2) {
        this.stack.push({ handle: promiseCreator, hook: _resol });
      } else {
        this.num++;
        promiseCreator().then(_resol);
      }
    });
  }
}
const timeout = time =>
  new Promise(resolve => {
    //console.log('in timeout:', time)
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

let timeStart = Date.now();

const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log(Date.now() - timeStart + 'ms');
      console.log(order);
    });
};
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
