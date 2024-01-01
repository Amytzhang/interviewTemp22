/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if(num1=='0'||num2=='0') return '0'
  
  let length1=num1.length
  let length2=num2.length
  let result =[]
  for(let i =length2-1;i>=0;i--){
    let item= num1*num2[i]
    result.push(item)
  }
  let sum =result.reduce((pre,cur,curIndex,array)=>{
      let supply = new Array(curIndex).fill(0).join('')
      let current = cur+supply
      return (+pre)+(+current)
  })
  return sum.toString()

};
console.log(multiply("123456789","987654321"))