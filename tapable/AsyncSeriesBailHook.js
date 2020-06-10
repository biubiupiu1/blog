class AsyncSeriesBailHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    const param = args.slice(0, this.limit.length);
    const [first, ...others] = this.tasks;
    return new Promise((resolve, reject) => {
      others.reduce((pre, next, index, arr) => {
        return pre
          .then(() => next(...param))
          .catch((err) => {
            arr.splice(index, arr.length - index);
            reject(err);
          })
          .then(() => {
            index + 1 === arr.length && resolve();
          });
      }, first(...param));
    });
  }
}

const FrontEnd = new AsyncSeriesBailHook(['name']);
console.time('webpack');
console.time('react');
FrontEnd.tapPromise('webpack',(name,cb)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log(name+" get webpack ")
      console.timeEnd('webpack');
      reject('小王彻底放弃了');
    }, 1000);
  })
});
FrontEnd.tapPromise('react',(name,cb)=>{
  return new Promise((resolve)=>{
    setTimeout(() => {
      console.log(name+" get react ")
      console.timeEnd('react');
      resolve();
    }, 1000);
  })
});
FrontEnd.start=(...args)=>{
  FrontEnd.promise(...args).then(()=>{
    console.log("end");
  }).catch((err)=>{
    console.log("err",err)
  })
};
FrontEnd.start('小王');

setTimeout(console.log, 3600 * 60);
