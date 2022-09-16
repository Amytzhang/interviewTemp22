//时间复杂度 n^2
function bubbleSort(arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
console.time()
let result = bubbleSort([3, 2, 4, 6, 5, 7])
console.log(result)
console.timeEnd()