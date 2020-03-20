/**
 * 当我们找 i 左边第一个小于 heights[i] 如果 heights[i-1] >= heights[i]
 * 其实就是和 heights[i-1] 左边第一个小于 heights[i-1] 一样。依次类推，右边同理。
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  let len = heights.length;
  let max = 0;
  let left_min = [];
  let right_min = [];
  heights[-1] = -1;
  heights[len] = -1;

  for (let i = 0; i < len; i++) {
    let tmp = i - 1;
    while (heights[tmp] >= heights[i]) {
      tmp = left_min[tmp];
    }
    left_min[i] = tmp;
  }

  for (let i = len - 1; i >= 0; i--) {
    let tmp = i + 1;
    while (heights[tmp] >= heights[i]) {
      tmp = right_min[tmp];
    }
    right_min[i] = tmp;
  }

  for (let i = 0; i < len; i++) {
    max = Math.max(max, heights[i] * (right_min[i] - left_min[i] - 1));
  }

  return max;
};

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea2 = function(heights) {
  let len = heights.length;
  let max = 0;
  let stack = [];
  stack[-1] = -1;
  heights[-1] = -1;
  heights[len] = -1;

  for (let i = 0; i < len; i++) {
    let top = stack[stack.length - 1];
    while (heights[i] < heights[top]) {
      stack.pop();
      let pre = stack[stack.length - 1];
      max = Math.max(max, (i - pre - 1) * heights[top]);
      top = stack[stack.length - 1];
    }
    stack.push(i);
  }

  while (stack.length) {
    let top = stack.pop();
    let pre = stack[stack.length - 1];
    max = Math.max(max, (len - pre - 1) * heights[top]);
  }

  return max;
};

console.log(largestRectangleArea2([2, 1, 2]));

setTimeout(console.log, 3600 * 60);
