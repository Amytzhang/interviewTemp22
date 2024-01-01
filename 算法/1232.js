/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function(coordinates) {
  let length = coordinates.length;
  let gep =[Math.abs(coordinates[1][0])-Math.abs(coordinates[0][0]), Math.abs(coordinates[1][1])-Math.abs(coordinates[0][1])]
  for(let i=2;i<length;i++){
      let item = coordinates[i]
      let pre = coordinates[i-1]
      if(gep[0]==0 && item[0]!==pre[0]){
        return false
      } else{
        continue
      }
      if(gep[1]==0&&item[1]!==pre[1]){
          return false
      } else{
        continue
      }
      if(Math.abs(item[0])-Math.abs(pre[0])!== gep[0]||Math.abs(item[1])-Math.abs(pre[1])!== gep[1]){
        return false
      } else{
        continue
      }
  }
  return true

};
console.log(checkStraightLine([[0,0],[0,1],[0,-1]]))