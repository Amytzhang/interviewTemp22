function singleName(nums) {
    let ans = 0;
    for (let key of nums) {
        console.log(key)
        ans ^= key

    }
    return ans
}
let result = singleName([1, 2, 3, 2, 3])
console.log('result:', result)