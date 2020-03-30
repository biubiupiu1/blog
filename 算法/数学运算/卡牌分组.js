/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
  deck = deck.sort((a, b) => a - b);
  let pre = -1;
  let count = 0;
  for (let item of deck) {
    if (pre === -1 || pre === item) {
      count++;
      pre = item;
    } else break;
  }
  let index = 1;
  if (count <= 1) return false;
  if (count === deck.length) return true;
  for (let i = count + 1; i < deck.length; i++) {
    if (deck[i] === deck[i - 1] && index < count) {
      index++;
    } else {
      if (index !== count) return false;
      else {
        index = 1;
      }
    }
  }
  return index === count;
};

console.log(hasGroupsSizeX([1, 1, 1, 1, 2, 2, 2, 2, 2, 2]));

setTimeout(console.log, 3600 * 60);
