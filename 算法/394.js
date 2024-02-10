/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let Original = s.replace(/\[/g, "&").replace(/\]/g, "-").split("-");
  let result = Original.reduce((pre, curr) => {
    if (curr) {
      let temp = curr.split("&");
      let tempString = temp[1].repeat(Number(temp[0]));
      return pre + tempString;
    } else {
      return pre;
    }
  }, "");

  return result;
};

var decodeString = function (s) {
  let numStack = [],
    strStack = [],
    result = "",
    num = 0;
  for (let item of s) {
    if (!isNaN(item)) {
      num = num * 10 + Number(item);
    } else if (item == "[") {
      strStack.push(result);
      result = "";
      numStack.push(num);
      num = 0;
    } else if (item == "]") {
      let numer = numStack.pop();
      result = strStack.pop() + result.repeat(numer);
    } else {
      //应对"2[abc]3[cd]ef"--“ef”
      result += item;
    }
    console.log("numStack,strStack", numStack, strStack);
  }
  return result;
};

decodeString("2[abc]3[cd]ef");
