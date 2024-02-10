var MedianFinder = function () {
  this.result = [];
  this.stack = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.stack.push(num);
  this.result.push(null);
  console.log("this.stack:", this.stack);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  let mind = null;
  let num = Math.floor(this.stack.length / 2);
  console.log("num:", num);
  if (this.stack.length % 2 === 0) {
    mind = (this.stack[num] + this.stack[num - 1]) / 2;
    console.log("mid---1:", mind);
  } else {
    mind = this.stack[num];
    console.log("mid---2:", mind);
  }
  console.log("mid:", mind);
  this.result.push(mind);
};
let MedianFinder1 = new MedianFinder();
["addNum", "addNum", "findMedian", "addNum", "findMedian"].map(
  (item, index) => {
    let list = [[1], [2], [], [3], []];
    if (item == "addNum") {
      console.log("add----:", list[index]);
      MedianFinder1.addNum(list[index][0]);
    }
    if (item == "findMedian") {
      MedianFinder1.findMedian();
    }
  }
);
console.log(MedianFinder.result);
/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
