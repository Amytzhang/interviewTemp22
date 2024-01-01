/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  
  let len = prices.length;
  if (len < 2) {
      return 0;
  }

  let res = 0;
  for (let i = 1; i < len; i++) {
      res += Math.max(prices[i] - prices[i - 1], 0);
  }
  return res;

};
console.log(maxProfit([1,2,3,4,5]))