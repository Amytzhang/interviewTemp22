/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  let result = (dividend / divisor).toString();
  if (result.includes(".")) {
    let index = result.indexOf(".");
    result = result.slice(0, index);
  }
  if (Number(result) > 2147483647) {
    return result - 1;
  }
  if (Number(result) < -2147483648) {
    return Number(result) + 1;
  }

  return result;
};
