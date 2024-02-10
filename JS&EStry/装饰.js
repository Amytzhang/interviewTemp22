function log(target) {
  const originalConstructor = target;
  function newConstructor(...args) {
    console.log(`Creating instance of ${originalConstructor.name}`);
    return new originalConstructor(...args);
  }
  return newConstructor;
}
@log
class MyClass {
  constructor(name) {
    this.name = name;
  }
}
const myObj = new MyClass("John");
