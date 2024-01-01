/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let s1=s.replace(/[^a-zA-Z0-9]/g, "")
  console.log(s1.length)
  if(s.length==1|| s1.length==1) return true;
   let first=0;
   let last=s1.length-1;
   let flag=false
   while(last>first){
    
       if(s1[first].toLowerCase()==s1[last].toLowerCase()){
           last--
           first++
           flag=true
       } else {
           flag=false
           first=last+1
       }
   }
   return flag
  };
  console.log(isPalindrome(".，"))