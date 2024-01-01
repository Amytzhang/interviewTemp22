/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  if(strs.length==1) return [strs];
  let result = []
  for(let i=0;i<strs.length;i++){
      let itemList = []
      let item = strs[i]
      for(let j=i+1; j<strs.length;j++){
          let flag = false
         console.log(item.split())
          item.split('').forEach((str)=>{
             if(strs[j].includes(str)){
                 flag=true
                 console.log('panduan')
             } else {
                 flag=false
             }
          })
          if(item.length == strs[j].length && flag){
            console.log(1)
              itemList.push(item)
          }
      }
      result.push(itemList)
  }
  return result
};
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))