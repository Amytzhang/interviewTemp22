/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  let res = [],
    used = {};
  function dfs(path) {
    if (path.length == nums.length) {
      res.push(path.slice());
      return;
    }
    for (let item of nums) {
      if (used[item]) continue;
      path.push(item);
      used[item] = true;
      dfs(path);
      path.pop();
      used[item] = false;
    }
  }
  dfs([]);
  return res;
};
const res = permuteUnique([1, 1, 2]);
console.log(res);
