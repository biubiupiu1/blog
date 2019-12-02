function a(arg) {
    return arg + " a"
}
function b(arg) {
    return arg + " b"
}
function c(arg) {
    return arg + " c";
}
let arr = [a, b, c];

function compose(arr) {
    return function (...args) {
        return arr.reduceRight((acc, item) => {
            return [item(acc)];
        }, args)[0]
    }
}

console.log(compose(arr)("nihao"));