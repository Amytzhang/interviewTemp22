//methods1
function methods1(arr) {
  return [...arr]
}

Array.prototype.unique = function(){
  var arr = [];
  var len = this.length;
  for(var i=0; i<len;i++){
    if(arr.indexOf(this[i])===-1) arr.push(this[i])
  }
  return arr
}
function unique(arr) {
  const map = new Map();
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) { // 如果已经存在了，则将其值设为 true（说明是重复元素）
      map.set(arr[i], true);
    } else { // 否则将其值设为false（目前没重复）
      map.set(arr[i], false);
      array.push(arr[i]);
    }
  }
  return array;
}