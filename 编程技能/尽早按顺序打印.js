
let arr = [];

for (let i = 0; i < 10; i++) {
    arr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i);
        }, Math.random() * 3000);
    }))
}


arr.reduce((acc, item) => {
    let promise = item();
    let flag = false;
    let result;

    promise.then(res => {
        if (flag) {
            console.log(res);
        } else {
            result = res;
        }
        flag = true;
    })

    return acc.then(() => {
        if (result) {
            console.log(result);
        }
        flag = true;
        return promise;
    })

}, Promise.resolve())


// const urlList = [1, 2, 3, 4, 5]


// loadData(urlList)

// function fetchData(url, succCallback) {
//     setTimeout(() => {
//         succCallback('ok: ' + url);
//     }, (Math.random() * 5 * 1000) >> 0);
// }

// function loadData(urlList) {
//     let resArr = [],
//         doneId = 0;
//     for (let i = 0; i < urlList.length; i++) {
//         fetchData(urlList[i], res => {
//             console.log(`${i + 1} has done`)
//             resArr[i] = res;
//             outPutRes(resArr);
//         });
//     }
//     function outPutRes(resArr) {
//         for (let i = doneId; i < resArr.length; i++) {
//             if (resArr[i]) {
//                 console.log(resArr[i]);
//                 doneId++;
//             } else {
//                 break;
//             }
//         }
//     }
// }
