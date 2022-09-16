
//防抖 如果短时间了多次触发，在最后一次触发 delay 多长时间后执行一次
function debounce(fn,delay = 300){
  let timer;
  return function(){
    const args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.call(this,args)
    },delay)
  }
}

//节流 如果短时间内多次触发，以一个固定的频率执行
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