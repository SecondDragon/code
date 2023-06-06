/**
 * 任意一个数字转成一个base64格式的字符串
 */
let base64 = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];
function encode(num) {
    // 1. 将137改写成二进制形式  10001001 如果是负数的话还要转成绝对值 
    let binary = (Math.abs(num)).toString(2);
    //console.log(binary);//10001001
    //2. 127是正数，末位补0 100010010 正数末位补0,如果是负数末位补1
    binary = num >= 0 ? binary + '0' : binary + '1';
    //console.log(binary);//100010010
    //3. 五位一组做分组，不足的补0 01000 10010
    let zero = 5 - (binary.length % 5);//补多少个0
    if (zero > 0) {//为啥一个分组是5位一组？
        binary = binary.padStart(Math.ceil(binary.length / 5) * 5, '0');
    }
    //将数组倒序排序 10010 01000
    let parts = binary.match(/\d{5}/g);
    parts.reverse();
    //console.log(parts);//[ '10010', '01000' ]//低位在前,高位在后 ?为什么需要倒序

    //最后一组开头补0，其余补1 110010 001000 6个位
    parts = parts.map((item, index) => (index == parts.length - 1 ? '0' : '1') + item);
    //console.log(parts);
    //转成base64
    let chars = [];
    for (let i = 0; i < parts.length; i++) {
        let base64Index = parseInt(parts[i], 2);//把二进制转10进制 6位 0-63
        chars.push(base64[base64Index]);
    }
    return chars.join('');
}
let result = encode(137);
//console.log(result);//yI
//EAAE [2,0,0,2]
console.log(encode(0));//A
console.log(encode(2));//E 100
console.log(encode(4));//I

/**
 * -15->15
 * 1. 将4改写成二进制形式  100
 * 2. 4是正数，末位补0 1000 8
 * 3. 五位一组做分组，不足的补0 01000 10010
 * 4. 将组倒序排序 10010 01000
 * 5. 最后一组开头补0，其余补1 110010 001000
 * 6. 转64进制 y和I
 */
