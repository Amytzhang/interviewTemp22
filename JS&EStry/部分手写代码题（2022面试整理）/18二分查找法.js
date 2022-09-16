//有序数组中进行
function binarySearch(arr, target) {
    let max = arr.length - 1;
    let min = 0
    while (min <= max) {
        let mid = Math.floor((max + min) / 2)

        if (target < arr[mid]) {
            max = min - 1
        } else if (target > arr[mid]) {
            min = mid + 1
            console.log(min)
        } else {
            console.log(mid)
            return mid
        }
    }
    return -1

}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const search = binarySearch(data, 6)
console.log(search)