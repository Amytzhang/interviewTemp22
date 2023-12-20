/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function(operations) {
  let numbers=[]
  operations.forEach((item,index)=>{
      handleCord(item,index)
  })
  function handleCord(num,index){
      switch(num){
          case 'C':
           numbers.pop()
           break;
          case 'D':
           let handle=numbers[numbers.length-1]*2
           console.log('D',handle,numbers)
           numbers.push(handle)
           break;
          case '+':
            let count= Number(numbers[numbers.length-1])+Number(numbers[numbers.length-2])
            console.log('+',count)
            numbers.push(count)
            break;
          default:
            numbers.push(num)
            break;
      }
  }
  console.log(numbers)
  let result = numbers.reduce((pre,nex)=>{
      return Number(pre)+Number(nex)
  },0)
  return result
};
const result = calPoints(["5","2","C","D","+"])
console.log(result)