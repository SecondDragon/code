
//编写一个babel插件,把var a=1这一行干掉
const code = `
var a = 1;
var b = 2;
var c= 3;
console.log(b);
function getC(){
    console.log(c);
}
getC();
`;