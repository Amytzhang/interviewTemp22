/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function(moves) {
  let newArray=new Array(3).fill(0).map(item=>new Array(3).fill(''))
 moves.map((item,index)=>{
   if(index%2==0){
       newArray[item[1]][item[0]] = 'A'
   } else {
       newArray[item[1]][item[0]]='B'
     }
 })
 console.log(newArray)
 let [a, b, c] = [newArray[0][0], newArray[1][1], newArray[2][2]]
 if(a && a == b && b == c) return a
 let [d, e, f] = [newArray[0][2], newArray[1][1], newArray[2][0]]
 if(d && d == e && e == f) return d
 
 //每行

 for(let j=0; j<newArray.length;j++) {
  let [a, b, c] = newArray[j]
  console.log(a,b,c)
  if(a && a == b && b == c)return a
   
 }
 

 //每列
 for(let i=0; i<newArray.length;i++) {
   let [a, b, c] = [newArray[0][i], newArray[1][i], newArray[2][i]]
   
   if(a && a == b && b == c) return a
 }
 
 if(moves.length==9) {
   return 'Draw'
 } else {
   return 'Pending'
 }
};
console.log(tictactoe([[0,0],[2,2],[1,0],[2,0],[0,1],[1,2],[1,1],[0,2]]))