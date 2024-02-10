/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let statistics = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (statistics.has(nums[i])) {
      statistics.set(nums[i], statistics.get(nums[i]) + 1);
    } else {
      statistics.set(nums[i], 1);
    }
  }
  let myArray = Array.from(statistics).sort((a, b) => {
    return b[1] - a[1];
  });
  console.log(myArray);
  let result = myArray.slice(0, k).map((item) => {
    return item[0];
  });

  return result;
};

topKFrequent([1, 1, 1, 2, 2, 4, 5], 2);
