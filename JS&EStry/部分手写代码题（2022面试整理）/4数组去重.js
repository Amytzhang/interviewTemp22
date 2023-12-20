//methods1 Set
function method (params){
  const set1 = new Set(params)
  return Array.from(set1)
}

//method2 indexOf
Array.prototype.unique = function () {
  var arr = [];
  var len = this.length;
  for (var i = 0; i < len; i++) {
    if (arr.indexOf(this[i]) === -1) arr.push(this[i]);
  }
  return arr;
};
const arr = [1, 2, 1, 1, "1"];
console.log("原型：", arr.unique());
//method3  map
function unique(arr) {
  const map = new Map();
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      // 如果已经存在了，则将其值设为 true（说明是重复元素）
      map.set(arr[i], true);
    } else {
      // 否则将其值设为false（目前没重复）
      map.set(arr[i], false);
      array.push(arr[i]);
    }
  }
  return array;
}
//method4 使用 filter简化循环+ indexof
function unique2(array) {
  var res = array.filter((item, index, array) => {
    console.log("item", item, index, array.indexOf(item));
    return array.indexOf(item) === index;
  });
  return res;
}
console.log(unique2(arr));
//function5 原生双层循环
function doubleFor(array) {
  var res = [];
  for (var i = 0, arraylen = array.length; i < arraylen; i++) {
    for (var j = 0, reslen = res.length; j < reslen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    if (j === reslen) {
      res.push(array[i]);
    }
  }
  return res;
}
console.log("ssss", doubleFor([1, 1, 1, 2]));
