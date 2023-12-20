/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function(low, high) {
  if(low % 2 == 1){
    --low;
  }
  if(high % 2 == 1){
    ++high;
  }
  return (high - low) / 2;

};
console.log(countOdds(800445804,979430543))