const promise1= new Promise((resolve,reject)=>{
  console.log('1')
  setTimeout(()=>{
    resolve(2)
  },0)

})
promise1.then((res)=>{
  console.log(res)
  setTimeout(()=>{
    console.log(3)
  },0)
})
setTimeout(()=>{
  console.log(4)
},0)
console.log(5)