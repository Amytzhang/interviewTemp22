
//防抖 如果短时间了多次触发，在最后一次触发 delay 多长时间后执行一次
function debounce(fn,delay = 300){
  let timer;
  return function(){
    const args = arguments
    if(timer) {
      clearTimeout(timer)
      timer=null
    }
    timer = setTimeout(()=>{
      fn.call(this,args)
    },delay)
  }
}

//节流 一个时间内只执行一次
function throttle(fn,delay=1000){
  let lastTime=0;
  return (...args)=>{
    let now = new Date().getTime();
    if(now-lastTime>=delay){
      fn.apply(this,args)
      lastTime = now
    }
  }
}