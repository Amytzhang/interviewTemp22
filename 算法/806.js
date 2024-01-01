/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  let five=0;let ten=0;
  for(let i=0; i<bills.length;i++){
      let remainder=bills[i]-5
      if(remainder==0){
          five++
      } else if(remainder==5) {
          if(five>0){
              five--
              ten++
          } else {
              return fasle
          }

      }else {
          if(five>0&&ten>0){
              ten--
              five--
          } else if(five>=3){
              five-=3
          } else {
              return false
          }
      }
  }
  return true

};
console.log(lemonadeChange([5,5,5,10,20]))