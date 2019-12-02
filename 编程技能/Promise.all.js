function promiseALl(promises) {
    promises = Array.isArray(promises) ? promises : [promises];

    let len = promises.length;
    let i = 0;
    let result = [];

    return new Promise((resovle, reject) => {
        promises.forEach((element, index) => {
            Promise.resolve(element).then(res => {
                result[index] = res;
                if (++i === len) {
                    resovle(result)
                }
            }, function (err) {
                reject(err)
            })
        });
    })
}

let promise1 = new Promise(resolve => setTimeout(resolve, 1000));
let promise2 = new Promise(resolve => setTimeout(resolve, 2000));

console.time("test");

let all = promiseALl([promise1, promise2]);
all.then(res => {
    console.log(res);
    console.timeEnd("test")
})