let pathToRegExp = require('path-to-regexp');
let keys = [];
//i=ignoreCase m  multi g global
let regexp = pathToRegExp('/home',keys,{end:true,strict:true});
console.log(regexp);
console.log(regexp.test('/home/'));
