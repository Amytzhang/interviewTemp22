// ['0.1.1','2.3.3','0.302.1','4.2','4.3.5','4.3.4.5']转换['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
var arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
arr.sort((a, b) => {
    let arr1 = a.split('.');
    let arr2 = b.split('.');
    let i = 0;
    while (true) {
        let item1 = arr1[i];
        let item2 = arr2[i];
        i++;
        if (item1 === item2) continue;
        if (item1 === undefined || item2 === undefined) {
            return arr1.length - arr2.length
        }
        return item2 - item1
    }
})
console.log(arr)