/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let maxArea = 0;
  const stack = [];
  heights = [0, ...heights, 0];
  for (let i = 0; i < heights.length; i++) {
    console.log("i:", i, heights[i]);
    console.log("stack:", stack, heights[stack[stack.length - 1]]);
    while (heights[i] < heights[stack[stack.length - 1]]) {
      // 当前bar比栈顶bar矮
      const stackTopIndex = stack.pop(); // 栈顶元素出栈，并保存栈顶bar的索引
      maxArea = Math.max(
        // 计算面积，并挑战最大面积
        maxArea, // 计算出栈的bar形成的长方形面积
        heights[stackTopIndex] * (i - stack[stack.length - 1] - 1)
      );
      console.log("maxArea:", maxArea);
    }
    stack.push(i); // 当前bar比栈顶bar高了，入栈
  }
  return maxArea;
};
largestRectangleArea([2, 1, 5, 6, 2, 3]);
