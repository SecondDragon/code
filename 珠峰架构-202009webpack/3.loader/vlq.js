/**
如何对数值137进行VLQ编码


137的VLQ编码形式为10000001 00001001
 */
//1.将137改写成二进制形式 10001001
let binary = (137).toString(2);
console.log(binary);
//2.七位一组做分组，不足的补0 0000001 0001001
let padded = binary.padStart(Math.ceil(binary.length/7)*7,'0');
console.log(padded);//0000001 0001001
//3.最后一组开头补0，其余补1 10000001 00001001
let groups = padded.match(/[01]{7}/g);
console.log(groups);
groups = groups.map((item,index)=>(index==groups.length-1?'0':'1')+item);
console.log(groups);
let vlqCode = groups.join('');
console.log(vlqCode);// 1000000100001001
//如果第1位是1的话,说明后面的一个字节也是当前数值的一部分
//js整数


