//归并排序
/**
 * 归并操作，也叫归并算法，指的是将两个顺序序列合并成一个顺序序列的方法。
 *如　设有数列{6，202，100，301，38，8，1}
 *初始状态：6,202,100,301,38,8,1
 *第一次归并后：{6,202},{100,301},{8,38},{1}，比较次数：3；
 *第二次归并后：{6,100,202,301}，{1,8,38}，比较次数：4；
 *第三次归并后：{1,6,8,38,100,202,301},比较次数：4；
 *总的比较次数为：3+4+4=11；
 *逆序数为14；
 */

function merge(left, right) {
    let result = []
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }
    if (i < left.length) {
        result.push(...left.slice(i))
    } else {
        result.push(...right.slice(j))
    }
    return result
}

function mergeSort(arr) {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

console.log(mergeSort([3, 6, 2, 4, 1, 9, 8, 7]))