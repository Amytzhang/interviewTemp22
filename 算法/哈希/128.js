/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length == 1 || nums.length == 0) return nums.length;
  let mapList = [...new Set(nums)];
  mapList.sort((a, b) => a - b);
  let count = 0,
    max = 0;
  for (let i = 0; i < mapList.length; i++) {
    if (mapList[i] + 1 == mapList[i + 1]) {
      count++;
    } else {
      max = Math.max(count + 1, max);
      count = 0;
    }
  }
  return max;
};
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
