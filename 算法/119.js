var getRow = function(rowIndex) {
    let arrayList = new Array(rowIndex + 1).fill(0)
    console.log('arrayList', arrayList)
    arrayList[0] = 1
    for (let i = 1; i < rowIndex + 1; i++) {
        console.log('for1', i, arrayList[i])
        for (j = i; j > 0; j--) {

            arrayList[j] += arrayList[j - 1]
            console.log('for2', arrayList)
        }
    }
    return arrayList

};
getRow(3)