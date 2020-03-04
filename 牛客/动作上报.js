let obj = {
  A: function(a, b) {
    return a * b;
  }
};

let montine = function(fn) {
  return function(...args) {
    return fn.apply(this, args);
  };
};

obj.A = montine(obj.A);

console.log(obj.A(2, 3));

setTimeout(console.log, 3600 * 60);
