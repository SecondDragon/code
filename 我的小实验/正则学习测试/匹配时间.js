let time = "00:23";
let time2 = "21:23";

let reg = /^([01][0-9])|([2][0-3]):[0-5][0-9]$/;
console.log(reg.test(time));
console.log(reg.test(time2));

// 如果也匹配 7:9 7:09
let reg2 = /^(0?[0-9]|1[0-9]|2[0-3]):([1-5][0-9]|0?[0-9])$/;

console.log(reg2.test("00:51") );


console.log( reg2.test("23:59"));