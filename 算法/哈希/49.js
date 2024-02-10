/**
 *
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    console.log(key);
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
