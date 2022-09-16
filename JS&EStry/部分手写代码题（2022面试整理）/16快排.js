//快速排序  时间复杂度 nlogn - n^2之间
/**
 * 选择数组中的一个值作为基准，将数组中小于该值的数置于该数之前，
 * 大于该值的数置于该数之后，接着对该数前后的两个数组进行重复操作直至排序完成。
 */
function quickSort(arr) {
    if (arr.length < 2) return arr;
    const mid = arr[arr.length - 1];
    const left = arr.filter((item, index) => item <= mid && index !== arr.length - 1)
    const right = arr.filter((item, index) => item > mid)
        //递归排序
        //[...quickSort(left), mid, ...quickSort(right)]
    return [].concat(quickSort(left), [mid], quickSort(right))
}
console.log(quickSort([3, 6, 2, 4, 1]))