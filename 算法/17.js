/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  let mapList = new Map();
  mapList.set("2", ["a", "b", "c"]);
  mapList.set("3", ["d", "e", "f"]);
  mapList.set("4", ["g", "h", "i"]);
  mapList.set("5", ["j", "k", "l"]);
  mapList.set("6", ["m", "n", "o"]);
  mapList.set("7", ["p", "q", "r", "s"]);
  mapList.set("8", ["t", "u", "v"]);
  mapList.set("9", ["w", "x", "y", "z"]);
  if (digits.length == 0) {
    return [];
  }
  let result = [];
  const dfs = (current, index) => {
    if (index > digits.length - 1) {
      console.log("结束", current);
      result.push(current);
      return;
    }
    const item = mapList.get(digits[index]);
    for (const key of item) {
      console.log("key:", key, index + 1);
      dfs(current + key, index + 1);
    }
  };

  dfs("", 0);
  return result;
};
letterCombinations("234");
