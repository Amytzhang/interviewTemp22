//插入排序 时间复杂度n^2
/**
 * 
 *插入排序:思路
 *1.0  从第二个数开始往前比
 *2.0 比它大就往后排
 *3.0 以此类推进行到最后一个数
 *图解：https://blog.csdn.net/xiaonanhaijing/article/details/117450677
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        let target = arr[j]
            //如果当前的数比 target 之前的小从 target 对应的下标j往前元素排序
        while (j > 0 && arr[j - 1] > target) {
            arr[j] = arr[j - 1]
            j--
        }
        console.log(j, target)
        arr[j] = target
    }
    return arr;
}
console.log(insertSort([3, 5, 2, 6, 4, 1]))