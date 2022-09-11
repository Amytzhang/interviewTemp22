(function(){
  var class2Type = {};
var toString = class2Type.toString;
var hasOwn = class2Type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Objects);
var getProto = Object.getPrototypeOf;//获取当前对象得原型链
//检测是否是函数
var isFunction = function isFunction(obj) {
  // 排除IE浏览器中出现<object></object> <object/>返回的也是 function，nodeType是1
  return typeof obj === 'function' && typeof obj.nodeType !== "Number"
}
// 检测是否是window对象
var isWindow = function isWindow(obj) {
  // window.window === window
  return obj != null && obj === obj.window

}
// 检测是否为数组或者类数组
var isArrayLike = function isArrayLike(obj) {
  //length存储的是对象的length属性值或者是false
  // type存储的是检测的数据类型
  var length = !!obj && "length" in obj && obj.length,
  type = toType(obj);
  // window.length = 0 && Function.prototype.length = 0
  if(isFunction(obj) || isWindow(obj)) return false;
  // type === "array" 数组
  // length === 0 空的类数组
  // 最后一个条件判断的是非空的类数组 [有length属性并且最大索引在对象中]
  return type === 'array' || length === 0 || typeof length === "number" && length >0 && (length - 1) in obj;
};
// 检测是否为纯粹对象{}
var isPlainObject = function isPlainObject(obj){
  var proto,ctor;
  // toString 不是"[object object]"一定不是object
  if(!obj || toString.call(obj) !== "[object object]") {
    return false;
  }
  proto = getProto.call(obj)
};
// 检测是否为数字
var isNumber = function isNumber(obj) {
  var type = toType(obj);
  return (type === "number" || type === "string" && !isNaN(obj - parseFloat(obj)));
};
// jQuery.each("Boolean Number String Function Array Date RegExp Symbol Object Error".split(" "),function(_i,name) {
//   class2Type["[object"+name+"]"] = name.toLowerCase();
// });
// =>
var mapType = ["Boolean","Number","String","Function","Array","Date","RegExp","Symbol","Object","Error"]
mapType.forEach(function(name){
  class2Type["[object"+name+"]"] = name.toLowerCase();
})
// 检测数据类型
function toType(obj){
  if(obj === null) {
    return obj+"";
  }
  return typeof obj ==='object' || typeof obj === 'function'? class2Type[toString.call(obj)] || 'object': typeof obj;
}
  var utils = {
    toType: toType,
    isFunction: isFunction,
    isWindow: isWindow,
    isNumber: isNumber,
    isArrayLike: isArrayLike,
    isPlainObject: isPlainObject,
    isEmptyObject: isEmptyObject
  }
  if(typeof window !== "undefined") {
    window._ = window.utils = utils;
  }
  if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = utils;
  }
})()