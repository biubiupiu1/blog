/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function(postorder) {
  let len = postorder.length;
  if (len <= 1) return true;
  let top = postorder[len - 1];
  let i = len - 2;
  while (i >= 0) {
    if (postorder[i] < top) {
      break;
    }
    i--;
  }
  let j = i;
  while (j >= 0) {
    if (postorder[j] > top) {
      return false;
    }
    j--;
  }
  let left = postorder.slice(0, i + 1);
  let right = postorder.slice(i + 1, len - 1);

  return verifyPostorder(left) && verifyPostorder(right);
};

console.log(verifyPostorder([4, 8, 6, 12, 16, 14, 10]));

setTimeout(console.log, 3600 * 60);
