let pathToRegExp = require('path-to-regexp');
let keys = [];
let regexp = pathToRegExp('/user/:id/:name',keys,{end:true});
console.log(regexp);

let params = keys.map(item=>item.name);
console.log(params);
//^\/user\/(?:([^\/]+?))\/?$
let url = '/user/100/zhufeng';
let result = url.match(regexp);
console.log(result);
// express nest.js vue angular react-router里逻辑都是一样
let memo = params.reduce((memo,param,index)=>{
    memo[param]=result[index+1];
    return memo;
},{});
console.log(memo);//params