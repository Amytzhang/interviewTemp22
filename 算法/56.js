var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    console.log(intervals, 'ssss')
    let result = []
    let pre = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];
        if (pre[1] < curr[0]) {
            result.push(pre)
            pre = curr
        } else {
            pre[1] = Math.max(pre[1], curr[1])
        }

    }
    result.push(pre)
    console.log('结果', result)
    return result
};
merge([
    [1, 4],
    [0, 2],
    [3, 5]
])