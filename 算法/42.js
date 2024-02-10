var trap = function (height) {
  let ans = 0;
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);
    if (height[left] < height[right]) {
      ans += leftMax - height[left];
      ++left;
      console.log("left:", left, "ans:", ans, "leftMax:", leftMax);
    } else {
      ans += rightMax - height[right];
      --right;
      console.log("right:", right, "ans:", ans, "rightMax:", rightMax);
    }
  }
  return ans;
};
trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
