let a = '900007199254740991';
let b = '12345566999999999999'
console.log(Number(a) + Number(b))
let maxLength = Math.max(a.length, b.length)
    //用0补齐长度
a = a.padStart(maxLength, 0)
b = b.padStart(maxLength, 0)

let t = 0;
let f = 0; //进位
let sum = '';
for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10)
    sum = t % 10 + sum
}
if (f != 0) {
    sum = '' + f + sum
}
console.log(sum)