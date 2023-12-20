function update() {
  console.log('试图更新')
}
let arr = [1,2,3]
let proxy = new Proxy(arr, {
  set(target,key,value) {
    console.log(target,'key:',key,value)
   // if(key == 'length') return true
   update()
  
   return Reflect.set(target,key,value)
  },
  get(target,key) {
   return Reflect.get(target,key)
  }
})
proxy.push(10)
console.log(proxy)