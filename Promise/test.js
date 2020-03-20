function isFunction(fun) {
  return typeof fun === 'function';
}

const PENDING = 'PENDING';
const FULFULLED = 'FULFULLED';
const REJECTED = 'REJECTED';

function MyPromise(handle) {
  if (!isFunction(handle)) throw new Error();

  this.status = PENDING;
  this.value = null;
  this.onFulfulledQueue = [];
  this.onRejectedQueue = [];

  const resolved = e => {
    const run = () => {
      const runFulfilled = res => {
        let cb;
        while ((cb = this.onFulfulledQueue.shift())) {
          cb(res);
        }
      };

      const runRejected = err => {
        let cb;
        while ((cb = this.onRejectedQueue.shift())) {
          cb(err);
        }
      };

      if (e instanceof MyPromise) {
        e.then(
          val => {
            this.value = val;
            this.status = FULFULLED;
            runFulfilled(val);
          },
          err => {
            this.value = err;
            this.status = REJECTED;
            runRejected(err);
          }
        );
      } else {
        this.value = e;
        this.status = FULFULLED;
        runFulfilled(e);
      }
    };
    setTimeout(run, 0);
  };

  const rejected = e => {
    const run = () => {
      let cb;
      while ((cb = this.onRejectedQueue.shift())) {
        cb(e);
      }
    };
    setTimeout(run, 0);
  };

  try {
    handle(resolved, rejected);
  } catch (e) {
    rejected(e);
  }

  setTimeout(run, 0);
}

MyPromise.prototype.then = function(onFulfill, onReject) {
  let { status, value } = this;
  return new MyPromise((resolve, reject) => {
    const runFulfill = res => {
      if (!isFunction(onFulfill)) resolved(res);
      else {
        try {
          let res = onFulfill(res);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (e) {
          reject(e);
        }
      }
    };
    const runReject = err => {
      if (!isFunction(onReject)) reject(err);
      else {
        try {
          let res = onReject(err);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (e) {
          reject(e);
        }
      }
    };
    switch (status) {
      case PENDING:
        this.onFulfulledQueue.push(runFulfill);
        this.onFulfulledQueue.push(runReject);
        break;
      case FULFULLED:
        runFulfill(value);
        break;
      case REJECTED:
        runReject(value);
    }
  });
};
