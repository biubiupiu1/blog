## then 

then 始终返回的是一个 promise 所以可以很灵活的形成 promise 链。

````javascript
// 3秒后输出fin
Promise.resolve()
  .then(res => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  })
  .then(res => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  })
  .then(res => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  })
  .then(res => {
    console.log('fin');
  });
````

## 何时将then传入的函数加入微任务队列

````javascript
new Promise((resolve, reject) => {
  console.log('promise1');
  resolve(1);
  new Promise((resolve, reject) => {
    console.log('promise2');
    resolve(2);
  }).then(res => {
    console.log('then2');
  });
}).then(res => {
  console.log('then1');
});
// promise1  promise2  then2  then1

new Promise((resolve, reject) => {
  console.log('promise1');
  resolve(1);
}).then(res => {
  console.log('then1');
});
new Promise((resolve, reject) => {
  console.log('promise2');
  resolve(2);
}).then(res => {
  console.log('then2');
});

// promise1  promise2  then1  then2
````

> 可以看出必须并不是 resolve 执行完成就立即加入微任务队列 , 是得同步函数执行完毕了才能加入进去


## reslove 一个 promise 的时候原来的 promise 的状态就和现在这个 promise 一致的

````javascript
// 下面 promise1 会在两秒后变味 resloved , 所以并不一定调用了 reslove promise 就会变成 resloved
let promise1 = new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    })
  );
});

// 同理下面 promise2 会在 4s 后 resloved
let promise2 = new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(
        resolve(
          new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
          })
        ),
        2000
      );
    })
  );
});
````