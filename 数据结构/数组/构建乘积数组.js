/**
 * 描述 构建乘积数组
 * 这里用矩阵的方式表示了乘积的计算，每一行就是1前面的乘积乘以1后面的乘积，这样围绕1
 * 就成了上面一个三角，下面一个三角，每个三角可以用累乘的方式计算
 * 
 * 对于这种需要遍历整个数组并返回除了自己之外的计算结果的题目，
 * 我们可以利用从前往后、从后往前的策略，来对整个数组实现遍历并计算乘积的功能。
 * 在从前往后遍历时，我们利用一个变量记录从开始到当前位置的累加和。从后往前也是一样，记录乘积。
 * 
 * @date 2020-02-04
 * @param {Array} arr
 * @returns {any}
 */
function multiply(arr) {
  let len = arr.length;
  let result = [];

  result[0] = 1;

  for (let i = 1; i < len; i++) {
    result[i] = result[i - 1] * arr[i - 1];
  }

  let temp = 1;

  for (let i = len - 2; i >= 0; i--) {
    temp = temp * arr[i + 1];
    result[i] = result[i] * temp;
  }

  return result;
}

const arr = [1, 2, 3, 4, 5];

console.log(multiply(arr));

setTimeout(console.log, 3600 * 60);
