/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
  let origin=[0,0]
  function flaghandle(way,origin){
     switch(way){
         case 'R':
          origin[1] = origin[1]+1
          break;
         case 'L':
          origin[1] = origin[1]-1
          break;
         case 'U':
          origin[0]=origin[0]+1
          console.log(origin)
          break;
         case 'D':
          origin[0]=origin[0]-1
          break;
     }
  }
  moves.split('').forEach((item)=>{
    flaghandle(item,origin)
  })

  if(origin[0]===0&&origin[1]===0) {
      return true
  }else{
      return false
  }

};
const res = judgeCircle("UD")
console.log('res:',res)