function* f() {
    for (var i = 0; true; i++) {
        var reset = yield i;
        console.log("loop");
        if (reset) {
            i = -1;
        }
    }
}

var g = f();

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.next(true)) // { value: 0, done: false }


var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获', e);
    }
};

var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}


var g = function* () {
    try {
        console.log("yield 前面")
        yield;
        console.log("yield 后面")
    } catch (e) {
        console.log('内部捕获', e);
    }
};

var i = g();
i.next()
i.throw('a');
// console.log(i.next());
// console.log(i.next());

let iterTree = function* (arr) {
    if (Array.isArray(arr)) {
        for (let item of arr) {
            yield* iterTree(item);
        }
    } else {
        yield arr;
    }
}

console.log(...iterTree([1, [2, 3], [4]]))

let myClass = function () {
    return {};
}

console.log(new myClass())

function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}

function F() {
    return gen.call(gen.prototype);
}

console.log(new F())


function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())

var hw = helloWorldGenerator();

console.log(...hw)
