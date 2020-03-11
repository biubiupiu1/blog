let thunk = function(fn) {
  return function(...arg) {
    return function(callback) {
      return fn.call(this, ...arg, callback);
    };
  };
};

let asyncFun = function(dur, callback) {
  return new Promise(resolve => {
    setTimeout(() => {
      callback && callback(null, dur);
      resolve(dur);
    }, dur * 1000);
  });
};

let asyncChunk = thunk(asyncFun);

function* readStream() {
  let a = yield asyncChunk(1);
  let b = yield asyncChunk(2);
  let c = yield asyncChunk(3);
  console.log(a, b, c);
}

function runCallback(handle) {
  let g = handle();
  function next(err, data) {
    let res = g.next(data);
    if (res.done) return;
    res.value(next);
  }
  next();
}

function* promiseStream() {
  let a = yield asyncFun(1);
  let b = yield asyncFun(2);
  let c = yield asyncFun(3);
  console.log(a, b, c);
}

function runPromise(handle) {
  let g = handle();
  function next(nextFun) {
    return new Promise((resolve, reject) => {
      let res;
      try {
        res = nextFun();
      } catch (e) {
        reject(e);
      }
      if (res.done) {
        return resolve(res.value);
      }
      Promise.resolve(res.value)
        .then(n => {
          next(() => g.next(n));
        })
        .catch(e => {
          next(() => g.throw(e));
        });
    });
  }
  next(() => {
    return g.next(undefined);
  });
}

runPromise(promiseStream);
