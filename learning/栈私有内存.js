var i=0;
function A(){
  var i=10;
  function x(){
    console.log(i)
  }
  return x;
}
var y=A();
y();
function B(){
  var i=20;
  y()
}
B();



