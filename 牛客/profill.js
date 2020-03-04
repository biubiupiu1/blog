/**
 * @param {string} data
 * @returns {any}
 */
let readline = function(data) {
  let index = 0;
  data = data.split('\n');
  data = data.filter(item => item !== '');
  return function() {
    return data[index++] || null;
  };
};

let print = function(...arg) {
  console.log(...arg);
};

module.exports = { readline, print };
