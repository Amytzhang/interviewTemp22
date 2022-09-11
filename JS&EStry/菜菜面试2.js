{
    let arr1 = [{
        title: 'a',
        id: '1'
    }, {
        title: 'b',
        id: '2'
    }, {
        title: 'c',
        id: '3'
    }]
    let obj = {}
    for (let i = 0; i < arr1.length; i++) {
        for (let key in arr1[i]) {
            let item = `arr[${i}]_${key}`
            obj[item] = arr1[i][key]
        }
    }
    console.log(obj)
    return obj
}; {
    export function func(url, method = 'get', params, header) {

        return new Promise((resolve, reject) => {
            axios.default.headers = header
            axios[method](url, {
                params: params
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

}