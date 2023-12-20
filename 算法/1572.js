/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function(mat) {
  if(mat.length==1) return mat[0][0]
  let leng = mat.length
  let prim=0
  let second=0
  let mid=0
  if(leng%2==0) {
      let j=leng-1;
      mid=0
      for(let i=0;i<leng;i++){
          prim +=mat[i][i]
          second +=mat[j][i]
          j--
      }
  } else {
    let midIndex = Math.floor(leng/2)+leng%2 -1;
      console.log('midIndex',midIndex,leng%2)
      mid=mat[midIndex][midIndex]
      let j=leng-1
      for(let i=0;i<leng;i++){
          prim +=mat[i][i]
          second +=mat[j][i]
          j--
      }

  }
  let redult = prim+second-mid
  return redult

};
console.log(diagonalSum([[1,2,3],
  [4,5,6],
  [7,8,9]]))