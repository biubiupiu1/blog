// function sleep(dur) {
//     dur = +dur;
//     return new Promise(resolve => setTimeout(resolve, dur * 1000))
// }

// async function test() {
//     await sleep(4);
//     console.log("你醒了！！")
// }

// test();

function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}

function sleep(dur) {
    dur = +dur;
    return function (callback) {
        setTimeout(callback, dur * 1000);
    }
}

function* g() {
    console.time("test");
    yield sleep(2);
    console.log("你醒了");
    yield sleep(2);
    console.timeEnd("test")
}

run(g);
