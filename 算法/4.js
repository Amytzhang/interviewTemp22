/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let list = nums1.concat(nums2);
  console.log(list);
  for (let i = 1; i < list.length; i++) {
    if (list[i - 1] > list[i]) {
      let temp = list[i];
      list[i] = list[i - 1];
      list[i - 1] = temp;
    }
  }
  console.log(list);
  if (list.length % 2 !== 0) {
    let mid = Math.floor(list.length / 2);
    return list[mid];
  } else {
    let mid = Math.floor(list.length / 2);
    return (list[mid - 1] + list[mid]) / 2;
  }
};
findMedianSortedArrays([2, 2, 4, 4], [2, 2, 4, 4]);
