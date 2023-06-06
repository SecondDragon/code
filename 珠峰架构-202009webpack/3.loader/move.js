let base64 = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];
function getValue(char){
    //找到这个字符在base64里的索引
  let index = base64.findIndex(item=>item ==char);//8
  let str = (index).toString(2);// 1000
  str = str.padStart(6,'0');//001000
  let sign = str.slice(-1)==='0'?1:-1;
  //为什么需要倒序?
  str = str.slice(1,-1);//中间那4个bit的数才是真正的值
  return parseInt(str,2)*sign;
}
//"AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;"
//此代码不严谨,它默认一个字符对应一个数字,没有处理多个字符对应一个数字的情况
//作业: 完善decode方法,支持多字符转换一个数字
//为什么需要 reverse
//为啥一个分组是5位一组？
function decode(values){
   let parts = values.split(',');
   let positions = [];
   for(let i=0;i<parts.length;i++){
       let part = parts[i];
       let chars = part.split('');//[I,A,A,I,A]
       let position = [];
       for(let j=0;j<chars.length;j++){
        position.push(getValue(chars[j]));
       }
       positions.push(position);
   }
   return positions;
}

let positions= decode("AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE");
console.log(positions);
//[转换前行,转换前列,转换后行,转换后列]
let offsets = positions.map(item=>[item[2],item[3],0,item[0]]);
let origin = {row:0,column:0};
let target = {row:0,column:0};
let mapping = [];
for(let i=0;i<offsets.length;i++){
    let [originRowOffset,originColumnOffset,targetRowOffset,targetColumnOffset] = offsets[i];
    origin.row+=originRowOffset;
    origin.column+=originColumnOffset;
    target.row+=targetRowOffset;
    target.column+=targetColumnOffset;
    mapping.push([`[${origin.row},${origin.column}]=>[${target.row},${target.column}]`])
}
console.log(mapping);

