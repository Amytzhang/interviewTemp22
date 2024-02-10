/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  let result = [];

  for (let i = 0; i < temperatures.length; i++) {
    let item = temperatures[i];
    let sum = 0;
    for (let j = i + 1; i < temperatures.length; ++j) {
      sum++;
      if (temperatures[j] > item) {
        break;
      }
    }
    result.push(sum);
  }
  console.log(result);
  return result;
};
dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
